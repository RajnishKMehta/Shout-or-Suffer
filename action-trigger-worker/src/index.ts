export interface Env {
	GITHUB_TOKEN: string;
	API_KEY: string;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {

		// Method check
		if (request.method !== 'POST') {
			return new Response(null,
				{
					status: 405,
					headers: {
						'Allow': 'POST'
					}
				}
			);
		}

		// node -e "console.log(require('crypto').randomBytes(12).toString('hex'))"
		// API key auth
		const apiKey = request.headers.get('x-api-key');
		if (!apiKey || apiKey !== env.API_KEY) {
			return new Response(
				JSON.stringify({ error: 'Unauthorized' }),
				{ status: 401, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Parse body
		let body: unknown;
		try {
			body = await request.json();
		} catch {
			return new Response(
				JSON.stringify({ error: 'Invalid JSON body' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// validate GitHub dispatch payload
		const payload = body as {
			event_type?: string;
			client_payload?: unknown;
		};

		if (!payload?.event_type) {
			return new Response(
				JSON.stringify({ error: 'event_type required' }),
				{ status: 400, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// Send to GitHub
		const githubResponse = await fetch(
			'https://api.github.com/repos/RajnishKMehta/Scream2Wish-wishes/dispatches',
			{
				method: 'POST',
				headers: {
					'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
					'Accept': 'application/vnd.github.v3+json',
					'Content-Type': 'application/json',
					'User-Agent': 'cfworker',
				},
				body: JSON.stringify({
					event_type: payload.event_type,
					client_payload: payload.client_payload || {}
				}),
			}
		);

		// GitHub error handling
		if (!githubResponse.ok) {
			const errorText = await githubResponse.text();
			return new Response(
				JSON.stringify({
					error: 'GitHub Action failed',
					github_status: githubResponse.status,
					github_response: errorText,
				}),
				{ status: 502, headers: { 'Content-Type': 'application/json' } }
			);
		}

		// ✅ Success
		return new Response(
			JSON.stringify({
				success: true,
				message: 'Triggered successfully'
			}),
			{ status: 200, headers: { 'Content-Type': 'application/json' } }
		);
	},
} satisfies ExportedHandler<Env>;

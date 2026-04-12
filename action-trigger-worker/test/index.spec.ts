import { env, createExecutionContext, waitOnExecutionContext, SELF } from 'cloudflare:test';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import worker from '../src/index';

describe('GitHub Action Trigger Worker Tests', () => {

	// Mocking Global Fetch to prevent actual GitHub API calls during tests
	beforeAll(() => {
		global.fetch = vi.fn();
	});

	it('should return 405 if method is not POST', async () => {
		const request = new Request('http://localhost', { method: 'GET' });
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(405);
		const body = await response.json();
		expect(body).toHaveProperty('error', 'Method not allowed. Use POST.');
	});

	it('should return 401 if x-api-key is missing or invalid', async () => {
		const request = new Request('http://localhost', {
			method: 'POST',
			headers: { 'x-api-key': 'wrong-key' },
			body: JSON.stringify({ event_type: 'test' }),
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(401);
		const body = await response.json();
		expect(body).toHaveProperty('error', 'Unauthorized. Invalid or missing x-api-key.');
	});

	it('should return 400 if JSON body is invalid', async () => {
		const request = new Request('http://localhost', {
			method: 'POST',
			headers: { 'x-api-key': env.API_KEY },
			body: 'invalid-json',
		});
		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(400);
		const body = await response.json();
		expect(body).toHaveProperty('error', 'Invalid JSON body.');
	});

	it('should return 200 and trigger GitHub Action when everything is correct', async () => {
		// Mocking a successful GitHub response
		(global.fetch as any).mockResolvedValueOnce(new Response(JSON.stringify({}), { status: 204 }));

		const payload = {
			event_type: 'add-wish',
			client_payload: {
				wish: 'Happy Birthday!',
				from: 'Ali'
			}
		};

		const request = new Request('http://localhost', {
			method: 'POST',
			headers: { 
				'x-api-key': env.API_KEY,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(payload),
		});

		const ctx = createExecutionContext();
		const response = await worker.fetch(request, env, ctx);
		await waitOnExecutionContext(ctx);

		expect(response.status).toBe(200);
		const body = await response.json();
		expect(body).toHaveProperty('success', true);
		expect(body).toHaveProperty('message', 'GitHub Action triggered successfully.');
	});
});

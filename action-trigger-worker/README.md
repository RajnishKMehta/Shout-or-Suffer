# action-trigger-worker

A Cloudflare Worker that acts as a secure proxy between the Scream2Wish Android app and GitHub Actions.

## Why It Exists

The app cannot safely hold a GitHub token it is packaged inside an APK and can be extracted. This worker keeps the token server-side as a Cloudflare secret. The app only needs a lightweight API key to talk to this worker.

## What It Does

1. Receives a `POST` request from the app with an `x-api-key` header and a JSON body.
2. Validates the API key.
3. Fires a `repository_dispatch` event to the `Scream2Wish-wishes` GitHub repo with the payload from the app.
4. GitHub Actions picks it up and stores the wish.

## Secrets

Set these in the Cloudflare dashboard under **Worker → Settings → Variables → Secrets**:

| Secret | Description |
|--------|-------------|
| `GITHUB_TOKEN` | Fine-grained token with `contents: write` access to `Scream2Wish-wishes` |
| `API_KEY` | The key the app sends in the `x-api-key` header |

To generate a new API key:
```bash
node -e "console.log(require('crypto').randomBytes(12).toString('hex'))"
```

## Endpoints

`POST /`

Request headers:
```
x-api-key: <your API key>
Content-Type: application/json
```

Request body:
```json
{
  "event_type": "add-wish",
  "client_payload": {
    "wish": "...",
    "note": "...",
    "from": "..."
  }
}
```

Responses:

| Status | Meaning |
|--------|---------|
| `200` | Dispatched successfully |
| `400` | Bad JSON or missing `event_type` |
| `401` | Missing or wrong API key |
| `405` | Non-POST request |
| `502` | GitHub API rejected the dispatch |

## Deploy

```bash
pnpm install
pnpm dlx wrangler deploy
```

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) and a Cloudflare account with Workers enabled.

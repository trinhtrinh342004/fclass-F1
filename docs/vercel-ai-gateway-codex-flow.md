# Vercel AI Gateway Codex Flow

Last verified: 2026-05-19

## Sources

- Vercel Codex setup: https://vercel.com/docs/ai-gateway/coding-agents/codex
- Vercel agent quickstart: https://vercel.com/docs/ai-gateway/agent-quickstart
- Vercel authentication: https://vercel.com/docs/ai-gateway/authentication

## Goal

Use a named Codex profile to route Codex through Vercel AI Gateway while keeping API keys out of the repository.

## Current Local Setup

The machine-level Codex config lives at `~/.codex/config.toml`, not in this repo. The project setup uses a named profile so the default Codex model can remain unchanged:

```toml
[model_providers.vercel]
name = "Vercel AI Gateway"
base_url = "https://ai-gateway.vercel.sh/v1"
env_key = "AI_GATEWAY_API_KEY"
wire_api = "responses"

[profiles.vercel-gateway]
model_provider = "vercel"
model = "openai/gpt-5.2-codex"
model_reasoning_effort = "medium"
```

The Vercel Codex page currently documents `wire_api = "chat"`, but the installed Codex CLI on this machine rejects `chat` and instructs using `responses`. Keep `responses` unless a future Codex CLI validation accepts a different value.

## Environment

Create the AI Gateway key in the Vercel dashboard and store it as `AI_GATEWAY_API_KEY`.

PowerShell user-level example:

```powershell
[Environment]::SetEnvironmentVariable("AI_GATEWAY_API_KEY", "your-ai-gateway-api-key", "User")
```

Open a new terminal after setting the variable. Do not commit `.env`, `.env.local`, tokens, or copied API keys.

## Verification Plan

1. Confirm the secret exists without printing it:

   ```powershell
   if ($env:AI_GATEWAY_API_KEY) { 'AI_GATEWAY_API_KEY_PRESENT' } else { 'AI_GATEWAY_API_KEY_MISSING' }
   ```

2. Confirm Codex can parse the Gateway profile:

   ```powershell
   codex --profile vercel-gateway debug models
   ```

3. Launch Codex for this repo through the Gateway profile:

   ```powershell
   codex --profile vercel-gateway -C d:\github_desktop\Fclass
   ```

4. For an optional live Gateway request, follow Vercel's agent quickstart and POST to `https://ai-gateway.vercel.sh/v1/responses` with `Authorization: Bearer $AI_GATEWAY_API_KEY`. Do not print or store the key.

## Maintenance Flow

- Re-check official Vercel docs before changing Gateway endpoints, model names, or agent setup.
- Re-run `codex --profile vercel-gateway debug models` after Codex CLI updates.
- If docs and local CLI disagree, prefer the installed CLI behavior and record the discrepancy here.
- Keep repo changes on a feature branch, run `npm run build` when project files change, push, create a PR, and merge when checks pass.

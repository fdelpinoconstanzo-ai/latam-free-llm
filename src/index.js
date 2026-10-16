import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import dotenv from 'dotenv';

dotenv.config();

const app = new Hono();

const PROVIDERS = [
  {
    name: 'groq',
    baseUrl: 'https://api.groq.com/openai/v1',
    apiKey: process.env.GROQ_API_KEY,
    modelMap: {
      'gpt-4o-mini': 'llama-3.1-8b-instant',
      'gpt-4o': 'llama-3.3-70b-versatile',
      default: 'llama-3.1-8b-instant'
    }
  },
  {
    name: 'gemini',
    baseUrl: 'https://generativelanguage.googleapis.com/v1beta/openai',
    apiKey: process.env.GEMINI_API_KEY,
    modelMap: {
      'gpt-4o-mini': 'gemini-2.0-flash',
      'gpt-4o': 'gemini-2.0-flash',
      default: 'gemini-2.0-flash'
    }
  },
  {
    name: 'openrouter',
    baseUrl: 'https://openrouter.ai/api/v1',
    apiKey: process.env.OPENROUTER_API_KEY,
    modelMap: {
      'gpt-4o-mini': 'google/gemini-flash-1.5:free',
      'gpt-4o': 'meta-llama/llama-3.1-8b-instruct:free',
      default: 'google/gemini-flash-1.5:free'
    }
  }
].filter(p => p.apiKey);

async function tryProvider(provider, body) {
  const model = provider.modelMap[body.model] || provider.modelMap.default;
  const payload = { ...body, model };

  const res = await fetch(`${provider.baseUrl}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json',
      ...(provider.name === 'openrouter' ? { 'HTTP-Referer': 'https://legendarybroker.cl', 'X-Title': 'LATAM Free LLM' } : {})
    },
    body: JSON.stringify(payload)
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${provider.name} ${res.status}: ${text.slice(0, 200)}`);
  }

  return res;
}

app.post('/v1/chat/completions', async (c) => {
  const body = await c.req.json();
  console.log(`[${new Date().toISOString()}] Request model=${body.model}`);

  for (const provider of PROVIDERS) {
    try {
      console.log(`  → Trying ${provider.name}`);
      const res = await tryProvider(provider, body);
      const data = await res.json();
      console.log(`  ✓ ${provider.name} ok`);
      return c.json(data);
    } catch (err) {
      console.log(`  ✗ ${provider.name} failed: ${err.message}`);
    }
  }

  return c.json({ error: { message: 'All free providers failed or rate-limited', type: 'server_error' } }, 503);
});

app.get('/health', (c) => c.json({ status: 'ok', providers: PROVIDERS.map(p => p.name) }));

app.get('/', (c) => c.text('LATAM Free LLM — POST /v1/chat/completions\nGET /health'));

const port = Number(process.env.PORT) || 3000;
console.log(`LATAM Free LLM listening on :${port}`);
console.log(`Providers loaded: ${PROVIDERS.map(p => p.name).join(', ') || 'none (set keys in .env)'}`);

serve({ fetch: app.fetch, port });

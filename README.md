# LATAM Free LLM

**Un endpoint. Varios free tiers. Para Latinoamérica.**

Proxy OpenAI-compatible que rota entre proveedores free reales con failover automático.

Ayuda real y gratuita. Igual que Empleos Chile: no cobra, no es demo, funciona.

## Quick start

```bash
cp .env.example .env
# pon tus keys free (Groq, Gemini, OpenRouter)
npm install
npm start
```

```bash
curl http://localhost:3000/v1/chat/completions \
  -H "Content-Type: application/json" \
  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"Hola desde LATAM"}]}'
```

## Proveedores

- Groq (llama-3.1-8b-instant / 70b)
- Gemini Flash
- OpenRouter free models

Si uno da 429 o error, pasa al siguiente.

## Estado

Fase 1: proxy básico implementado. Listo para probar con keys.

MIT

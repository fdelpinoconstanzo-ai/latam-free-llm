# Plan de construcción

## Fase 1 — Proxy funcional (hoy)

- [ ] Endpoint `/v1/chat/completions` compatible con OpenAI SDK
- [ ] Soporte inicial: Groq + Gemini + OpenRouter free
- [ ] Failover simple (si 429 o error, siguiente)
- [ ] Config por `.env` (GROQ_API_KEY, GEMINI_API_KEY, OPENROUTER_API_KEY)
- [ ] Logs básicos de a qué proveedor fue cada request

## Fase 2 — Robusto

- [ ] Más proveedores (NVIDIA NIM, Cloudflare, Mistral)
- [ ] Contadores de rate limit por proveedor (RPM/RPD)
- [ ] Preferencia de modelos "no train on data"
- [ ] Health checks

## Fase 3 — Usable

- [ ] Dashboard simple (ver estado, agregar/quitar keys)
- [ ] Docs en español para poner keys free
- [ ] Docker compose listo
- [ ] Ejemplo de uso con Cursor / Continue / cualquier cliente OpenAI

## Proveedores prioritarios LATAM

| Proveedor     | Por qué                          | Límite aprox.          |
|---------------|-----------------------------------|-------------------------|
| Groq          | Rápido, sin tarjeta, bueno       | 30 RPM / 1k RPD        |
| Gemini Flash  | Contexto largo, multimodal        | Free tier generoso     |
| OpenRouter    | Muchos `:free` en un key          | 50 RPD (1k con $10)    |
| NVIDIA NIM    | Modelos grandes                   | ~40 RPM                |

## Hosting

En lo que tengas (VPS, CEPAN, máquina local). Docker preferred.

Nada de servicios que cobren o limiten de forma rara.

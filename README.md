# LATAM Free LLM

**Un endpoint. Varios free tiers. Para Latinoamérica.**

Ayuda real y gratuita para que cualquiera en LATAM pueda usar modelos de lenguaje potentes sin pagar, sin tarjeta de crédito y sin pelear con rate limits de cada proveedor.

Igual que Empleos Chile: no cobra, no es demo para levantar fondos, no inventa nada. Es una herramienta que funciona.

## Idiomas

- Español (principal)
- Portugués
- Inglés (técnico / fallback)

Docs, dashboard y mensajes en los tres. Prioridad a ES y PT.

## Qué hace

- Un solo endpoint OpenAI-compatible (`/v1/chat/completions`)
- Rotea automáticamente entre proveedores free reales: Groq, Gemini Flash, OpenRouter `:free`, NVIDIA NIM, Mistral, etc.
- Failover cuando uno se queda sin cuota o da 429
- Tracking básico de uso por proveedor
- Preferencia por modelos que no entrenan con tus datos cuando es posible
- Interfaz y docs en español y portugués

## Por qué

En LATAM el acceso a APIs de pago es una barrera. Los free tiers existen pero son dispersos, con límites distintos y a veces opacos. Esto los junta en uno solo, mantenible, open source.

## Stack (propuesta)

- Backend: Node.js / TypeScript (Express o Hono) — simple, rápido de iterar
- Keys: variables de entorno o archivo local encriptado (nada de Supabase ni servicios de pago)
- Deploy: Docker en tu VPS / CEPAN / panel que tengas
- Frontend opcional: dashboard simple para ver estado de proveedores y agregar keys

Sin Cloudflare Workers, sin Supabase, sin dependencias de pago. Self-hosted o en lo que tengas listo.

## Estado

Reconstruyendo después del formateo. Base lista para partir.

## Cómo seguir

1. Definir proveedores prioritarios para LATAM (Groq + Gemini + OpenRouter como core).
2. Implementar el proxy con failover.
3. Agregar dashboard mínimo (ES/PT).
4. Documentar cómo poner tus propias keys free.
5. Probar de verdad y levantar en el servidor que tengas.

## Licencia

MIT. Úsalo, modifícalo, despliega.

---

Hecho para que funcione, no para impresionar.

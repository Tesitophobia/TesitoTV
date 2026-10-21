# TesitoTV Web v20 — comprobaciones estáticas

- `node --check js/app.js`: correcto.
- `node --check js/player.js`: correcto.
- `node --check js/playlist-parser.js`: correcto.
- Prueba funcional del parser M3U: pendiente de ejecutar en navegador.
- Integridad del ZIP: se comprueba al empaquetar.

## Optimizaciones de v20

- La búsqueda del editor reutiliza un índice de texto por fila y solo lo recalcula cuando cambia un campo del canal.
- La comprobación de señales deduplica URLs y prueba cada URL única una sola vez, aplicando el resultado a todos los canales que la usan.
- Los timeouts de comprobación se limpian siempre; un timeout se clasifica como «sin confirmar» y no como fallo concluyente.
- Las URL con formato inválido se marcan como fallidas antes de intentar una solicitud.
- Se mantiene la concurrencia limitada a cuatro comprobaciones simultáneas para reducir carga de red.

## Limitaciones

- Una respuesta `no-cors` no permite leer el estado HTTP ni confirmar que el vídeo se reproduce.
- Un error de red puede confundirse con una restricción del navegador o CORS; los resultados rojos deben revisarse antes de eliminar canales.
- No se ha realizado una prueba interactiva completa en Chrome/Firefox durante esta entrega.

# TesitoTV Web v20

Reproductor web estático y editor de listas M3U para publicar en GitHub Pages.

## Publicación en GitHub Pages

1. Extrae el ZIP.
2. Sube **el contenido** de esta carpeta a la raíz del repositorio (debe quedar `index.html` en la raíz, no dentro de otra subcarpeta).
3. En GitHub, abre **Settings → Pages**.
4. En **Build and deployment**, selecciona **Deploy from a branch**, rama `main` y carpeta `/ (root)`.
5. Guarda y espera a que GitHub publique el sitio.

No requiere backend ni compilación. `.nojekyll` evita que GitHub Pages procese la carpeta como un sitio Jekyll.

## Privacidad y datos

- Las listas y preferencias se guardan en `localStorage` del navegador y no se sincronizan automáticamente entre dispositivos.
- Exporta regularmente una copia JSON desde las herramientas de copia de seguridad.
- No subas listas privadas, credenciales ni URLs con tokens a un repositorio público.
- La importación por URL requiere que el servidor de origen permita CORS.

## Funciones

- Importar/exportar listas M3U/M3U8, incluyendo archivos locales, texto pegado y URLs compatibles con CORS.
- Editar canales, categorías, logos y señales alternativas.
- Favoritos, historial, búsqueda, filtros, temas claro/oscuro y accesos rápidos.
- Reproductor HTML5/HLS.js, modo cine, imagen en imagen y atajos.
- Duplicados, edición múltiple, limpieza, historial temporal de deshacer/rehacer, diagnóstico y comparación de listas.
- Guía EPG cuando se importa una fuente XMLTV compatible.
- Verificación de señales en segundo plano, comprobando cada URL única una sola vez.

## Límites conocidos

GitHub Pages solo aloja archivos estáticos. No puede actuar como proxy, sortear CORS, transcodificar formatos ni garantizar compatibilidad con todos los streams. La verificación desde el navegador es orientativa: un error puede deberse a CORS o conectividad, y una solicitud enviada no confirma que el vídeo se reproduzca.

## Pruebas

Consulta `TESTS.md` para las comprobaciones estáticas y las limitaciones que quedan por verificar en un navegador real.

Usa únicamente listas y señales que estés autorizado a reproducir o distribuir.

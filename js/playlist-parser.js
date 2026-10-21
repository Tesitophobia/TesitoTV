/* TesitoTV M3U parser and serializer. No list data is sent to a server. */
(function(global){'use strict';
function parse(text, fallbackName='Lista importada'){
 const lines=String(text||'').replace(/^\uFEFF/,'').split(/\r?\n/); const channels=[]; let pending=null;
 for(let raw of lines){const line=raw.trim();if(!line)continue;
  if(line.startsWith('#EXTINF')){const comma=line.indexOf(',');const attrs=comma>=0?line.slice(0,comma):line;const name=comma>=0?line.slice(comma+1).trim():'Canal sin nombre';const get=(key)=>{const m=attrs.match(new RegExp('(?:^|\\s)'+key+'="([^"]*)"','i'));return m?m[1]:''};pending={id:uid(),name:name||'Canal sin nombre',url:'',logo:get('tvg-logo'),group:get('group-title')||'Sin categoría',tvgId:get('tvg-id'),tvgName:get('tvg-name'),signals:[],headers:{}};
  } else if(line.startsWith('#EXTVLCOPT:')&&pending){const m=line.match(/http-user-agent=(.*)/i);if(m)pending.headers.userAgent=m[1].trim();}
  else if(line.startsWith('#EXTGRP:')&&pending){pending.group=line.slice(8).trim()||pending.group;}
  else if(line.startsWith('#')){continue;}else if(pending){pending.url=line;pending.signals=[{id:uid(),name:'Señal principal',url:line}];channels.push(pending);pending=null;}
 }
 return {name:fallbackName,channels};
}
function serialize(playlist){const lines=['#EXTM3U'];for(const c of playlist.channels||[]){const name=clean(c.name||'Canal sin nombre'),logo=clean(c.logo||''),group=clean(c.group||'Sin categoría'),id=clean(c.tvgId||'');const signals=(c.signals||[]).filter(s=>s.url);if(!signals.length&&c.url)signals.push({name:'Señal principal',url:c.url});if(!signals.length){lines.push(`#EXTINF:-1 tvg-id="${id}" tvg-name="${name}" tvg-logo="${logo}" group-title="${group}",${name}`,'');continue;}signals.forEach((s,i)=>{const label=i===0?name:`${name} (${clean(s.name||'Señal '+(i+1))})`;lines.push(`#EXTINF:-1 tvg-id="${id}" tvg-name="${name}" tvg-logo="${logo}" group-title="${group}",${label}`,String(s.url).trim())})}return lines.join('\n')+'\n';}
function clean(v){return String(v).replace(/[\r\n"]/g,' ').trim();}function uid(){return 'ch_'+Math.random().toString(36).slice(2,10)+'_'+Date.now().toString(36)}
global.TesitoPlaylist={parse,serialize,uid};
})(window);

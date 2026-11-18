const V='sptspd-v5',CORE=['./','index.html','manifest.webmanifest','icon-192.png','icon-512.png'],LIBS=['https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js','https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.4.0/exceljs.min.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(CORE);for(const u of LIBS){try{await c.add(u)}catch(x){}}}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(rq,r)=>{if(r.ok&&(r.type==='basic'||rq.url.includes('cdnjs.cloudflare.com'))){const cp=r.clone();caches.open(V).then(c=>c.put(rq,cp))}return r};
self.addEventListener('fetch',e=>{const rq=e.request;if(rq.method!=='GET')return;const u=new URL(rq.url),own=u.origin===location.origin,page=rq.mode==='navigate'||(own&&/(\/|\.html|\.webmanifest|sw\.js)$/.test(u.pathname));
 if(page){e.respondWith(fetch(rq).then(r=>put(rq,r)).catch(()=>caches.match(rq).then(h=>h||caches.match('index.html'))));return}
 e.respondWith(caches.match(rq).then(h=>h||fetch(rq).then(r=>put(rq,r))))});

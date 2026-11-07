'use strict';
const CACHE='inspeciona-civil-ui-0.1.1';
const SCOPE=self.registration.scope;
const PATHS=['./','./index.html','./mobile.js','./manifest.webmanifest','./icon.svg','./ajuda.html'];
const ASSETS=PATHS.map(path=>new URL(path,SCOPE).href);
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS))));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k.startsWith('inspeciona-civil-ui-')&&k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})()));
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting();});
self.addEventListener('fetch',event=>{const r=event.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==self.location.origin||!u.href.startsWith(SCOPE))return;if(r.mode!=='navigate'&&!ASSETS.includes(u.href))return;event.respondWith((async()=>{const cache=await caches.open(CACHE),cached=await cache.match(r,{ignoreSearch:true});if(cached)return cached;try{return await fetch(r);}catch(err){if(r.mode==='navigate')return await cache.match(new URL('./index.html',SCOPE).href);throw err;}})());});

(()=>{'use strict';
const state=document.getElementById('offlineState'),install=document.getElementById('installApp'),hint=document.getElementById('installHint'),persistText=document.getElementById('persistState');
let promptEvent=null,registration=null;
function status(text,ok){if(state){state.textContent=text;state.className='pill '+(ok?'green':'yellow');}}
function installed(){return window.matchMedia('(display-mode: standalone)').matches;}
async function checkOffline(){
 if(!('serviceWorker' in navigator)||!window.isSecureContext){status('Requer HTTPS para uso offline',false);return;}
 try{
 const reg=await navigator.serviceWorker.getRegistration();if(reg)registration=reg;
 const c=await caches.open('inspeciona-civil-ui-0.1.2');
 const paths=['./index.html','./mobile.js','./manifest.webmanifest','./icon-192.png','./icon-512.png','./ajuda.html'];
 const has=await Promise.all(paths.map(path=>c.match(new URL(path,location.href).href)));
 const ok=!!navigator.serviceWorker.controller&&has.every(Boolean);
 status(ok?(navigator.onLine?'Pronto para usar offline':'Offline · aplicativo disponível'):'Preparando uso offline…',ok);
 if(reg?.waiting){hint.textContent='Há uma atualização disponível. Faça backup e feche todas as janelas do aplicativo para ativá-la.';}
 }catch(e){status('Offline não confirmado · mantenha internet',false);}
}
async function checkPersistent(){
 try{const yes=await navigator.storage?.persisted?.();persistText.textContent=yes?'Armazenamento persistente concedido. Ainda é necessário exportar o backup após cada visita.':'Armazenamento local sujeito às regras do navegador. Não limpe os dados do Chrome; exporte backups.';}catch(e){persistText.textContent='Verifique espaço disponível e mantenha uma cópia externa dos backups.';}
}
window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();promptEvent=e;install.hidden=false;});
install?.addEventListener('click',async()=>{if(!promptEvent){hint.textContent='No Chrome: menu ⋮ → Adicionar à tela inicial → Instalar.';return;}await promptEvent.prompt();await promptEvent.userChoice;promptEvent=null;install.hidden=true;});
window.addEventListener('appinstalled',()=>{install.hidden=true;hint.textContent='Aplicativo instalado. Abra pelo ícone Inspeciona Civil.';});
document.getElementById('persistData')?.addEventListener('click',async()=>{try{await navigator.storage?.persist?.();await checkPersistent();}catch(e){persistText.textContent='O navegador não concedeu proteção persistente. Faça backup após cada unidade.';}});
window.addEventListener('ic-sw-ready',e=>{registration=e.detail;checkOffline();registration.addEventListener('updatefound',()=>{registration.installing?.addEventListener('statechange',checkOffline);});});
window.addEventListener('ic-sw-error',()=>status('Falha no cache offline · use internet e tente recarregar',false));
window.addEventListener('online',checkOffline);window.addEventListener('offline',checkOffline);
navigator.serviceWorker?.addEventListener('controllerchange',checkOffline);
if(installed())hint.textContent='Aplicativo aberto pelo ícone. Aguarde a confirmação de disponibilidade offline.';
checkPersistent();checkOffline();setTimeout(checkOffline,1500);setTimeout(checkOffline,5000);
})();
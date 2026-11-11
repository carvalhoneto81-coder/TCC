/* Compatible with v1 backups: additions stay in cases, photos and meta. */
(()=>{'use strict';
const isCount=v=>v!==''&&v!==null&&v!==undefined&&/^\d+$/.test(String(v).trim())&&Number.isSafeInteger(Number(v));
function mode(c){
 if(['exploratory','research','pilot'].includes(c?.caseMode))return c.caseMode;
 if(/explorat[oó]ri|n[aã]o integrar [àa] amostra/i.test(c?.name||'')||/^REGISTRO EXPLORAT[ÓO]RIO/i.test((c?.notes||'').trim()))return 'exploratory';
 return /piloto|teste do instrumento/i.test(c?.name||'')?'pilot':'research';
}
function normalize(c={}){
 const out={...c,caseMode:mode(c),evidenceSources:{...(c.evidenceSources||{})}};
 for(const key of ['eligibleUnits','totalUnits']){
  if(isCount(c[key]))out[key]=Number(c[key]);
  else{out[key]='';if(c[key]!==''&&c[key]!=null)out[key+'Legacy']=String(c[key]);}
 }
 return out;
}
function validateCounts(c){
 for(const key of ['totalUnits','eligibleUnits'])if(c[key]!==''&&!isCount(c[key]))return 'Informe quantidades inteiras e não negativas, ou deixe o campo em branco.';
 if(isCount(c.totalUnits)&&isCount(c.eligibleUnits)&&Number(c.eligibleUnits)>Number(c.totalUnits))return 'As unidades elegíveis não podem exceder o total do empreendimento.';
 return '';
}
function nextPhotoCode(c,photos){
 const next=Math.max(0,...photos.filter(p=>!p.occurrenceId).map(p=>Number(String(p.photoCode||'').match(/-F(\d+)$/)?.[1]||0)))+1;
 return `${c.code}-F${String(next).padStart(3,'0')}`;
}
globalThis.ICCase={isCount,mode,normalize,validateCounts,nextPhotoCode};
})();

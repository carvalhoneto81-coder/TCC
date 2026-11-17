/* Retrospective records remain in meta; backup format and existing stores are unchanged. */
(()=>{'use strict';
function parseCSV(input){
 if(typeof input!=='string'||input.length>4000000)throw new Error('CSV muito grande ou inválido. Limite de 4 MB.');
 const text=input.replace(/^\uFEFF/,'');const first=text.split(/\r?\n/,1)[0]||'';const delimiter=(first.match(/;/g)||[]).length>=(first.match(/,/g)||[]).length?';':',';
 const rows=[];let row=[],cell='',quoted=false;
 for(let i=0;i<text.length;i++){const ch=text[i];if(ch==='"'){if(quoted&&text[i+1]==='"'){cell+='"';i++;}else if(quoted||!cell)quoted=!quoted;else cell+=ch;}else if(ch===delimiter&&!quoted){row.push(cell);cell='';}else if((ch==='\n'||ch==='\r')&&!quoted){if(ch==='\r'&&text[i+1]==='\n')i++;row.push(cell);if(row.some(v=>v.trim()))rows.push(row);row=[];cell='';}else cell+=ch;}
 if(quoted)throw new Error('CSV com aspas não fechadas. Nenhum dado importado.');row.push(cell);if(row.some(v=>v.trim()))rows.push(row);
 if(rows.length<2)throw new Error('CSV precisa ter cabeçalho e ao menos um registro.');if(rows.length>10001)throw new Error('Limite de 10 mil registros por CSV.');
 const headers=rows.shift().map((h,i)=>h.trim()||'coluna_'+(i+1));if(new Set(headers).size!==headers.length)throw new Error('Há cabeçalhos repetidos no CSV.');
 return rows.map((values,i)=>{if(values.length!==headers.length)throw new Error('Quantidade de colunas inválida na linha '+(i+2)+'. Nenhum dado importado.');return Object.fromEntries(headers.map((h,k)=>[h,values[k]]));});
}
function first(row,names){for(const name of names){if(row[name]!==undefined&&String(row[name]).trim())return String(row[name]);}return '';}
function inventoryKey(row){return [first(row,['id','codigo','Código','Código da foto']),first(row,['sha256','SHA-256']),first(row,['name','arquivo_original','Arquivo original','filename'])].join('|');}
function mergeInventory(oldRows,newRows){const map=new Map();for(const row of [...oldRows,...newRows]){const key=inventoryKey(row);if(key==='||')throw new Error('CSV sem código, arquivo ou SHA-256 reconhecível.');map.set(key,row);}return [...map.values()];}
function quantitativeAllowed(c){return c?.caseMode==='research';}
function summary(records){return {files:records.inventory.length,groups:records.groups.length,evidence:records.evidence.length,unlinked:records.evidence.filter(x=>x.unitLinkStatus!=='confirmed').length};}
globalThis.ICDocumentary={parseCSV,first,inventoryKey,mergeInventory,quantitativeAllowed,summary};
})();

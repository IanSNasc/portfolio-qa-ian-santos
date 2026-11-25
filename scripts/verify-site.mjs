import {readdir,readFile,stat} from 'node:fs/promises';
import {resolve,dirname,sep} from 'node:path';
const root=resolve('docs');let checked=0;
async function walk(dir){const rows=[];for(const entry of await readdir(dir,{withFileTypes:true})){const p=resolve(dir,entry.name);if(entry.isDirectory())rows.push(...await walk(p));else rows.push(p);}return rows;}
for(const file of await walk(root)){
  if(!/\.(html|css|mjs|js)$/.test(file))continue;
  const source=await readFile(file,'utf8');
  const refs=file.endsWith('.html')?[...source.matchAll(/(?:href|src)="([^"]+)"/g)].map(x=>x[1]):file.endsWith('.css')?[...source.matchAll(/url\(['"]?([^'"\)]+)['"]?\)/g)].map(x=>x[1]):[];
  for(const ref of refs){if(/^(https?:|mailto:|data:|#)/.test(ref))continue;if(ref.startsWith('/'))throw new Error(`Caminho absoluto incompatível com GitHub Pages: ${file}: ${ref}`);const path=resolve(dirname(file),decodeURIComponent(ref.split(/[?#]/)[0]));if(!path.startsWith(root+sep)&&path!==root)throw new Error(`Destino fora do site: ${ref}`);const info=await stat(path).catch(()=>null);if(!info)throw new Error(`Destino ausente: ${file}: ${ref}`);if(info.isDirectory())await stat(resolve(path,'index.html'));checked++;}
  if(/file:\/\/|SUPABASE_SERVICE_ROLE|BEGIN PRIVATE KEY|\.env\.local/.test(source))throw new Error(`Conteúdo privado inesperado em ${file}`);
}
const pdf=await readFile(resolve(root,'cv/Ian-Santos-Desenvolvimento.pdf'));if(!pdf.subarray(0,5).equals(Buffer.from('%PDF-')))throw new Error('Currículo PDF inválido');
console.log(`Site estático validado: ${checked} referências locais; PDF presente; caminhos compatíveis com subdiretório.`);

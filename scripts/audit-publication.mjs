import {readdir,readFile} from 'node:fs/promises';
import {resolve,relative,extname} from 'node:path';
import {blockedPublicationPath,scanPublicationText} from './publication-rules.mjs';

const root = resolve('.');
const ignored = new Set(['.git','node_modules','.venv','__pycache__']);
const textExtensions = new Set(['.html','.md','.mjs','.js','.json','.css','.txt','.py','.yml','.yaml','.svg']);
const files = [];
async function walk(dir) {
  for (const entry of await readdir(dir,{withFileTypes:true})) {
    if (ignored.has(entry.name)) continue;
    const path = resolve(dir,entry.name);
    if (entry.isDirectory()) await walk(path);
    else if (entry.isFile()) files.push(path);
  }
}
await walk(root);
let checked = 0;
const issues = [];
for (const path of files) {
  const file = relative(root,path).replaceAll('\\','/');
  if (blockedPublicationPath(file)) issues.push({file,rule:'blocked_file'});
  if (!textExtensions.has(extname(path).toLowerCase())) continue;
  const source = await readFile(path,'utf8');
  checked++;
  issues.push(...scanPublicationText(source).map(issue=>({file,...issue})));
}
if (issues.length) {
  // Report only locations and rule names; matched values never enter logs.
  for (const issue of issues) console.error(`${issue.file}${issue.line?':'+issue.line:''}: ${issue.rule}`);
  console.error(`Revisão de publicação: ${issues.length} ocorrência(s); conteúdo omitido.`);
  process.exitCode = 1;
} else {
  console.log(`Revisão de publicação: ${checked} arquivos textuais; nenhum padrão bloqueado encontrado.`);
  console.log('Imagens, PDF, dados sem padrões reconhecíveis e histórico Git exigem revisão específica.');
}

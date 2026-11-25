export const localDate = (date = new Date()) => `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;
export const sampleQuestions = [
  { id:'p1', subject:'Português', prompt:'Qual palavra está corretamente acentuada?', options:['Voce','Café','Lapís','Tambem'], correct:1, explanation:'Café é uma palavra oxítona terminada em “e”, por isso recebe acento.' },
  { id:'m1', subject:'Matemática', prompt:'Uma sessão de estudo de 40 minutos foi dividida em duas partes iguais. Quanto durou cada parte?', options:['10 minutos','15 minutos','20 minutos','30 minutos'], correct:2, explanation:'40 dividido por 2 é igual a 20 minutos.' },
  { id:'m2', subject:'Matemática', prompt:'Você concluiu 3 de 4 sessões planejadas. Qual fração foi concluída?', options:['1/4','1/2','2/3','3/4'], correct:3, explanation:'São 3 sessões concluídas de um total de 4: a fração é 3/4.' }
];
export const newStudy = () => ({ app:'ian-portfolio-pmba',version:1,logs:[],answers:[] });
export function addStudy(state,subject,minutes,date=localDate()) {
  if (!['Português','Matemática','Revisão'].includes(subject) || !Number.isInteger(minutes) || minutes<1 || minutes>360) throw new Error('Informe entre 1 e 360 minutos e uma disciplina válida.');
  return {...state,logs:[...state.logs,{subject,minutes,date}].slice(-1000)};
}
export function answerQuestion(state,id,selection) {
  const q=sampleQuestions.find(q=>q.id===id);
  if (!q || !Number.isInteger(selection) || selection<0 || selection>=q.options.length) throw new Error('Selecione uma alternativa válida.');
  if(state.answers.some(a=>a.id===id)) throw new Error('Essa questão já foi respondida nesta demonstração.');
  return {...state,answers:[...state.answers,{id,selection}]};
}
export function validateStudy(input) {
  if(!input || input.app!=='ian-portfolio-pmba' || input.version!==1 || !Array.isArray(input.logs) || !Array.isArray(input.answers) || input.logs.length>1000 || input.answers.length>sampleQuestions.length) throw new Error('Backup incompatível com esta demonstração.');
  let next=newStudy();
  for(const row of input.logs) {
    if(!row || typeof row.date!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(row.date)) throw new Error('Data de estudo inválida.');
    const parsed=new Date(`${row.date}T12:00:00`);
    if(Number.isNaN(parsed.getTime()) || localDate(parsed)!==row.date) throw new Error('Data de estudo inválida.');
    next=addStudy(next,row.subject,row.minutes,row.date);
  }
  for(const a of input.answers) { if(!a) throw new Error('Respostas inválidas.'); next=answerQuestion(next,a.id,a.selection); }
  return next;
}
export const newCondo = () => ({app:'ian-portfolio-condosphere',version:1,requests:[{id:'res-1',unit:'101',area:'Salão de convivência',date:'2026-12-15',time:'15:00',status:'pendente'},{id:'res-2',unit:'202',area:'Churrasqueira',date:'2026-12-16',time:'10:00',status:'aprovada'}]});
export function createReservation(state,role,input,now=localDate()) {
  if(role!=='morador') throw new Error('Neste fluxo, somente o morador solicita reservas.');
  if(!input || !['Salão de convivência','Churrasqueira'].includes(input.area) || !['10:00','15:00','19:00'].includes(input.time) || typeof input.date!=='string' || !/^\d{4}-\d{2}-\d{2}$/.test(input.date)) throw new Error('Selecione área, data e horário válidos.');
  const parsed=new Date(`${input.date}T12:00:00`);
  if(Number.isNaN(parsed.getTime()) || localDate(parsed)!==input.date || input.date<now) throw new Error('Escolha uma data válida a partir de hoje.');
  if(state.requests.some(r=>r.area===input.area&&r.date===input.date&&r.time===input.time&&['pendente','aprovada'].includes(r.status))) throw new Error('Esse horário já tem uma solicitação ativa. Escolha outro.');
  const id=`res-${Date.now()}-${Math.random().toString(36).slice(2,8)}`;
  return {...state,requests:[...state.requests,{id,unit:'101',area:input.area,date:input.date,time:input.time,status:'pendente'}].slice(-100)};
}
export function changeReservation(state,role,id,status) {
  const row=state.requests.find(r=>r.id===id);
  if(!row) throw new Error('Reserva não encontrada.');
  const management=role==='gestao'&&row.status==='pendente'&&['aprovada','rejeitada'].includes(status);
  const resident=role==='morador'&&row.unit==='101'&&['pendente','aprovada'].includes(row.status)&&status==='cancelada';
  if(!management&&!resident) throw new Error('Essa ação não está disponível para o perfil e o estado atuais.');
  return {...state,requests:state.requests.map(r=>r.id===id?{...r,status}:r)};
}
export function validateCondo(input) {
  if(!input || input.app!=='ian-portfolio-condosphere' || input.version!==1 || !Array.isArray(input.requests) || input.requests.length>100) throw new Error('Estado local inválido.');
  const ids=new Set();
  const requests=input.requests.map(r=>{
    if(!r || typeof r.id!=='string' || r.id.length>100 || ids.has(r.id) || !['101','202'].includes(r.unit) || !['Salão de convivência','Churrasqueira'].includes(r.area) || !['10:00','15:00','19:00'].includes(r.time) || !['pendente','aprovada','rejeitada','cancelada'].includes(r.status) || !/^\d{4}-\d{2}-\d{2}$/.test(r.date)) throw new Error('Reserva local inválida.');
    const d=new Date(`${r.date}T12:00:00`);if(Number.isNaN(d.getTime())||localDate(d)!==r.date) throw new Error('Data local inválida.');
    ids.add(r.id);return {id:r.id,unit:r.unit,area:r.area,date:r.date,time:r.time,status:r.status};
  });return {app:input.app,version:1,requests};
}

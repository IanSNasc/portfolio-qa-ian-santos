import {newCondo,validateCondo,createReservation,changeReservation,localDate} from '../model.mjs';
import {localStore,announce} from '../storage.mjs';
const warning=document.querySelector('#storage-warning'), message=document.querySelector('#message');
const store=localStore('ian_portfolio_condo_v1',newCondo,validateCondo,t=>warning.textContent=t);
let role='morador';
const date=document.querySelector('#date');date.min=localDate();date.value=localDate();
const labels={pendente:'Pendente',aprovada:'Aprovada',rejeitada:'Rejeitada',cancelada:'Cancelada'};
function action(label,status,id,style=''){const button=document.createElement('button');button.textContent=label;button.className=style;button.addEventListener('click',()=>{try{store.set(changeReservation(store.get(),role,id,status));render();announce(message,`Reserva ${labels[status].toLowerCase()}.`);}catch(error){announce(message,error.message,true);}});return button;}
function render(){
  document.querySelectorAll('[data-role]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.role===role)));
  const config={morador:['Solicitar reserva','Morador fictício da unidade 101. Uma solicitação precisa ser aprovada pela gestão.','Minhas reservas'],gestao:['Avaliar solicitações','A gestão pode aprovar ou rejeitar solicitações pendentes. Use a lista ao lado para decidir.','Solicitações do condomínio'],portaria:['Consultar agenda','A portaria consulta somente reservas aprovadas. Ela não cria nem aprova reservas neste fluxo.','Agenda aprovada']}[role];
  document.querySelector('#role-title').textContent=config[0];document.querySelector('#role-description').textContent=config[1];document.querySelector('#list-title').textContent=config[2];document.querySelector('#reservation-form').hidden=role!=='morador';
  const list=document.querySelector('#requests');list.replaceChildren();
  const rows=store.get().requests.filter(r=>role==='morador'?r.unit==='101':role==='portaria'?r.status==='aprovada':true);
  for(const row of rows){const article=document.createElement('article');article.className='reservation';const badge=document.createElement('span');badge.className=`pill ${row.status}`;badge.textContent=labels[row.status];const title=document.createElement('h3');title.textContent=row.area;const info=document.createElement('p');info.textContent=`Unidade ${row.unit} · ${row.date.split('-').reverse().join('/')} · ${row.time}`;const actions=document.createElement('div');actions.className='actions';
    if(role==='gestao'&&row.status==='pendente'){actions.append(action('Aprovar','aprovada',row.id,'approve'),action('Rejeitar','rejeitada',row.id));}
    if(role==='morador'&&['pendente','aprovada'].includes(row.status)){actions.append(action('Cancelar reserva','cancelada',row.id));}
    article.append(badge,title,info,actions);list.append(article);
  }if(!rows.length){const empty=document.createElement('p');empty.className='empty-message';empty.textContent='Nenhuma reserva neste contexto. Solicite e aprove uma reserva para explorar o fluxo.';list.append(empty);}
}
document.querySelectorAll('[data-role]').forEach(button=>button.addEventListener('click',()=>{role=button.dataset.role;render();announce(message,`Perfil demonstrativo: ${button.textContent}.`);}));
document.querySelector('#reservation-form').addEventListener('submit',event=>{event.preventDefault();try{store.set(createReservation(store.get(),role,{area:document.querySelector('#area').value,date:date.value,time:document.querySelector('#time').value}));render();announce(message,'Solicitação criada. Troque para Gestão para aprovar ou rejeitar.');}catch(error){announce(message,error.message,true);}});
document.querySelector('#reset').addEventListener('click',()=>{warning.textContent='';store.reset();role='morador';render();announce(message,'Exemplo restaurado somente nesta demonstração.');});
render();

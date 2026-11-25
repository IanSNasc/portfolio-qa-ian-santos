export function localStore(key,seed,validate,onWarning) {
  let writable=true;let state;
  try { const raw=localStorage.getItem(key);state=raw?validate(JSON.parse(raw)):seed(); }
  catch {state=seed();writable=false;onWarning('Não foi possível ler os dados locais. A demonstração está em memória; use “Restaurar exemplo” para reiniciar somente esta demo.');}
  return {get:()=>state,set(next){state=next;if(writable) {try{localStorage.setItem(key,JSON.stringify(state));}catch{writable=false;onWarning('Armazenamento indisponível. Você pode continuar nesta aba e exportar seus dados quando a opção estiver disponível.');}}},reset(){state=seed();writable=true;this.set(state);return state;}};
}
export const announce=(element,text,error=false)=>{element.textContent=text;element.classList.toggle('error',error);};

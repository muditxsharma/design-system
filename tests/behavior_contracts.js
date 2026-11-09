/* Lightweight DOM doubles test state contracts; this is not browser QA. */
(()=>{
 let checks=0;
 function assert(value,message){checks++;if(!value)throw new Error(message)}
 class Node{
  constructor(){this.dataset={};this.attrs={};this.map={};this.children=[];this.style={values:{},setProperty(k,v){this.values[k]=v}};this.classList={add(){},remove(){}};this.hidden=false;this.value='';this.textContent='';this.listeners={}}
  setAttribute(k,v){this.attrs[k]=String(v)}getAttribute(k){return this.attrs[k]??null}removeAttribute(k){delete this.attrs[k]}
  querySelectorAll(selector){return this.map[selector]||[]}
  querySelector(selector){if(selector.startsWith('[data-day=')){const day=selector.match(/"(\d+)"/)[1];return this.children.find(c=>c.dataset.day===day)}return this.querySelectorAll(selector)[0]||null}
  addEventListener(event,fn){(this.listeners[event]??=[]).push(fn)}
  fire(event){(this.listeners[event]||[]).forEach(fn=>fn({target:this,preventDefault(){}}))}
  focus(){document.activeElement=this}append(...nodes){this.children.push(...nodes)}replaceChildren(...nodes){this.children=nodes}
 }
 const elements={};globalThis.document={createElement:()=>new Node(),getElementById:id=>elements[id],activeElement:null};
 const helpers=DesignComponents.helpers;
 assert(helpers.calendarDays(2024,1).count===29,'Leap February');assert(helpers.calendarDays(2025,1).count===28,'Non-leap February');assert(helpers.isoDate(2026,0,3)==='2026-01-03','ISO date padding');
 assert(helpers.pageBounds(99).page===3,'Upper page clamp');assert(helpers.pageBounds(-5).page===1,'Lower page clamp');assert(helpers.pageBounds(3).end===30,'Final page range');assert(helpers.matches('Art Direction','  DIRECTION '),'Case/space-insensitive search');
 for(const [system,theme] of Object.entries(DesignLibrary.themes))for(const mode of ['light','dark']){
  const families=DesignLibrary.accentFamilies[system]||[null];families.forEach((family,accent)=>{const node=new Node();const values=DesignLibrary.applyTheme(node,{system,mode,accent});assert(node.dataset.system===system&&node.dataset.mode===mode,'Theme scope');assert(values.length===8,'Theme values');assert(node.style.values['--accent']===(family?family[mode==='dark'?3:2][0]:theme[mode][5]),'Accent mapped correctly')})
 }
 let threw=false;try{DesignLibrary.applyTheme(new Node(),{system:'unknown'})}catch{threw=true}assert(threw,'Reject unknown system');
 threw=false;try{DesignLibrary.applyTheme(new Node(),{system:'minimal',accent:99})}catch{threw=true}assert(threw,'Reject unknown accent');
 for(const system of Object.keys(DesignLibrary.themes))for(const name of Object.keys(DesignIcons.paths)){const svg=DesignIcons.svg(name,system);assert(svg.includes('aria-hidden="true"')&&svg.includes('data-icon-system="'+system+'"'),'Decorative identity icon');assert(!svg.includes('undefined'),'Complete icon path')}
 assert(DesignIcons.svg('leaf','forma')!==DesignIcons.svg('leaf','brutalism'),'Distinct motif geometry');
 const root=new Node();const toggle=new Node();toggle.setAttribute('aria-checked','true');root.map['[role=switch]']=[toggle];
 const form=new Node(),input=new Node(),feedback=new Node();input.validity={valid:false};input.value='unfinished@';form.map.input=[input];form.map['[data-feedback]']=[feedback];root.map['[data-ds-form]']=[form];
 const tabs=new Node(),tab1=new Node(),tab2=new Node();tab1.setAttribute('aria-controls','panel-a');tab2.setAttribute('aria-controls','panel-b');elements['panel-a']=new Node();elements['panel-b']=new Node();tabs.map['[role=tab]']=[tab1,tab2];root.map['[data-ds-tabs]']=[tabs];
 const toggleButton=new Node();toggleButton.setAttribute('aria-pressed','false');root.map['[data-ds-toggle]']=[toggleButton];
 const calendar=new Node(),days=new Node(),month=new Node(),status=new Node(),prev=new Node(),next=new Node();calendar.map['[data-calendar-days]']=[days];calendar.map['[data-calendar-month]']=[month];calendar.map['[data-calendar-status]']=[status];calendar.map['[data-calendar-prev]']=[prev];calendar.map['[data-calendar-next]']=[next];root.map['[data-ds-calendar]']=[calendar];
 const opener=new Node(),dialog=new Node();opener.dataset.dsOpen='dialog';elements.dialog=dialog;dialog.showModal=()=>{dialog.open=true};root.map['[data-ds-open]']=[opener];
 DesignComponents.init(root);DesignComponents.init(root);
 assert(toggle.listeners.click.length===1,'Idempotent initialization');toggle.fire('click');assert(toggle.getAttribute('aria-checked')==='false','Switch updates state');toggleButton.fire('click');assert(toggleButton.getAttribute('aria-pressed')==='true','Toggle updates state');
 form.onsubmit({preventDefault(){}});assert(input.getAttribute('aria-invalid')==='true'&&!feedback.hidden,'Persistent invalid feedback');assert(input.value==='unfinished@','Preserve entered value');assert(document.activeElement===input,'Focus invalid input');input.validity.valid=true;form.onsubmit({preventDefault(){}});assert(input.getAttribute('aria-invalid')==='false'&&feedback.textContent.includes('accepted'),'Successful recovery');
 tab2.onclick();assert(tab2.getAttribute('aria-selected')==='true'&&elements['panel-a'].hidden&&!elements['panel-b'].hidden,'Tabs link selection and panel');tab2.onkeydown({key:'ArrowRight',preventDefault(){}});assert(tab1.tabIndex===0&&tab2.tabIndex===-1&&document.activeElement===tab1,'Roving keyboard tabs');
 const firstMonth=month.textContent;next.onclick();assert(month.textContent!==firstMonth,'Calendar next month');prev.onclick();assert(month.textContent===firstMonth,'Calendar previous month');const firstDate=days.children.find(day=>day.dataset.day==='1');firstDate.onclick();assert(status.textContent.startsWith('Selected'),'Calendar selection confirmation');assert(days.children.find(day=>day.dataset.day==='1').getAttribute('aria-pressed')==='true','Calendar selected state');days.onkeydown({target:days.children.find(day=>day.dataset.day==='1'),key:'ArrowLeft',preventDefault(){}});assert(month.textContent!==firstMonth,'Calendar keyboard crosses month boundary');
 opener.onclick();assert(dialog.open,'Dialog opens');dialog.fire('close');assert(document.activeElement===opener,'Dialog restores opener focus');
 return JSON.stringify({checks,passed:true});
})();

/* Apply an exploratory registry theme to any scoped container. */
window.DesignLibrary.applyTheme=function(root,{system='forma',mode='light',accent=0}={}){
 const theme=this.themes[system];
 if(!theme||!['light','dark'].includes(mode))throw new Error('Unknown system or expression');
 const values=[...theme[mode]],families=this.accentFamilies[system];
 if(families){if(!Number.isInteger(accent)||!families[accent])throw new Error('Unknown accent study');const mapped=families[accent][mode==='dark'?3:2];[5,6,4,7].forEach((index,i)=>values[index]=mapped[i])}
 ['bg','surface','ink','muted','line','accent','accent-ink','wash'].forEach((key,i)=>root.style.setProperty('--'+key,values[i]));
 root.style.setProperty('--mono',theme.mono||'ui-monospace, monospace');root.style.setProperty('--font',theme.font);root.style.setProperty('--display',theme.display);root.style.setProperty('--radius',theme.radius);root.classList.add('ds');root.dataset.system=system;root.dataset.mode=mode;
 return values;
};

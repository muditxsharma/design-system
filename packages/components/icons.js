/* Original, dependency-free 24px SVG drawings. Decorative by default. */
window.DesignIcons={
 paths:{
  grid:'M4 4h6v6H4z M14 4h6v6h-6z M4 14h6v6H4z M14 14h6v6h-6z',
  layers:'m3 8 9-5 9 5-9 5z M3 12l9 5 9-5 M3 16l9 5 9-5',
  leaf:'M19 4C8 3 3 8 5 15s14 6 14-11Z M5 20l10-11',
  arrow:'M5 19 19 5 M5 5h14v14',check:'m5 12 4 4L19 6',close:'m6 6 12 12 M18 6 6 18',
  plus:'M12 4v16 M4 12h16',minus:'M4 12h16',chevron:'m8 4 8 8-8 8',
  search:'M20 20l-5-5 M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0',
  settings:'M4 7h16 M4 17h16 M8 4v6 M16 14v6',
  bell:'M5 17h14l-2-4V9a5 5 0 0 0-10 0v4z M10 21h4',
  calendar:'M5 5h14v15H5z M5 10h14 M8 3v4 M16 3v4 M9 14h2 M13 17h2',
  user:'M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0 M4 21v-3c0-6 16-6 16 0v3',
  folder:'M3 7V4h7l3 3h8v13H3z',file:'M6 3h8l4 4v14H6z M14 3v5h4 M9 12h6 M9 16h6',
  download:'M12 3v12 m-5-5 5 5 5-5 M4 17v4h16v-4',
  copy:'M9 8h11v13H9z M15 8V3H4v13h5',
  info:'M12 11v6 M12 7v1 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  warning:'m12 3 10 18H2z M12 9v5 M12 17v1',
  clock:'M12 6v6l4 2 M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0',
  chart:'M4 3v18h17 M8 16v-5 M13 16V6 M18 16v-8',
  message:'M3 4h18v13H9l-6 4z M7 9h10 M7 12h6',
  eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
  heart:'M12 21 3 12C-2 4 8-1 12 6c4-7 14-2 9 6z',
  bolt:'m13 2-9 12h7l-1 8 10-13h-8z',
  code:'m8 6-6 6 6 6 M16 6l6 6-6 6 M14 3l-4 18',
  menu:'M3 5h18 M3 12h18 M3 19h18',
  play:'m8 4 12 8-12 8z',more:'M5 11v2 M12 11v2 M19 11v2'
 },
 variants:{
  forma:{grid:'M5 4h4q1 0 1 1v4q0 1-1 1H5q-1 0-1-1V5q0-1 1-1Z M15 4h4q1 0 1 1v4q0 1-1 1h-4q-1 0-1-1V5q0-1 1-1Z M5 14h4q1 0 1 1v4q0 1-1 1H5q-1 0-1-1v-4q0-1 1-1Z M15 14h4q1 0 1 1v4q0 1-1 1h-4q-1 0-1-1v-4q0-1 1-1Z'},
  minimal:{leaf:'M5 19V5h14v14z M5 19 19 5 M5 12h7v7',heart:'m3 6 5-3 4 4 4-4 5 3v7l-9 8-9-8z'},
  nocturne:{grid:'m7 2 5 5-5 5-5-5z m10 0 5 5-5 5-5-5z M7 12l5 5-5 5-5-5z m10 0 5 5-5 5-5-5z',leaf:'M4 17C2 8 10 2 20 4c2 10-4 18-13 16 M4 20 17 7 M8 16l1-6 M12 12h5',arrow:'M4 20 19 5 M8 4h12v12 M5 15v4h4'},
  brutalism:{grid:'M2 2h8v8H2z M14 2h8v8h-8z M2 14h8v8H2z M14 14h8v8h-8z',arrow:'M3 21 20 4 M3 4h17v17',leaf:'M3 3h18v18H3z M3 21 21 3',heart:'M2 3h7l3 5 3-5h7v11L12 22 2 14z',user:'M8 2h8v8H8z M3 14h18v8H3z',info:'M2 2h20v20H2z M12 10v8 M12 6v1'}
 },
 svg(name,system='forma'){
  const path=this.variants[system]?.[name]||this.paths[name]||this.paths.grid;
  return `<svg class="ds-icon" data-icon-system="${system}" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true" focusable="false"><path d="${path}"/></svg>`;
 },
 render(root=document,system){
  root.querySelectorAll('[data-icon]').forEach(el=>{const identity=system||el.closest('[data-system]')?.dataset.system||'forma';el.innerHTML=this.svg(el.dataset.icon,identity)});
 }
};

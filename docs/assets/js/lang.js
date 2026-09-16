/* Pixware Studio — lang.js : s'exécute dans <head>, avant le rendu.
   Choisit la langue (préférence mémorisée → langue du navigateur → défaut) et la pose sur <html>. */
(function(){
  var r=document.documentElement,L=(r.getAttribute("data-langs")||"fr").split(",");
  r.classList.add("js");
  if(L.length<2)return;
  var l=null;try{l=localStorage.getItem("pw_lang")}catch(e){}
  if(L.indexOf(l)<0){l=((navigator.language||"fr").slice(0,2).toLowerCase()==="fr")?"fr":"en"}
  if(L.indexOf(l)<0)l=L[0];
  r.setAttribute("data-lang",l);r.lang=l;
  var t=r.getAttribute("data-title-"+l);if(t)document.title=t;
})();

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):(e||self).SwupFormsPlugin=t()}(this,function(){const e=e=>String(e).split(".").concat(["0","0"]).slice(0,3).join(".");class t{constructor(){this.isSwupPlugin=!0,this.requires={},this.swup=void 0,this.version=void 0}mount(){}unmount(){}_beforeMount(){if(!this.name)throw new Error("You must define a name of plugin when creating a class.")}_afterUnmount(){}_checkRequirements(){return"object"!=typeof this.requires||Object.entries(this.requires).forEach(([t,r])=>{if(!function(t,r,s){const n=function(e,t){var r;if("swup"===e)return null!=(r=t.version)?r:"";{var s;const r=t.findPlugin(e);return null!=(s=null==r?void 0:r.version)?s:""}}(t,s);return!!n&&((t,r)=>r.every(r=>{const[,s,n]=r.match(/^([\D]+)?(.*)$/)||[];var i,o;return((e,t)=>{const r={"":e=>0===e,">":e=>e>0,">=":e=>e>=0,"<":e=>e<0,"<=":e=>e<=0};return(r[t]||r[""])(e)})((o=n,i=e(i=t),o=e(o),i.localeCompare(o,void 0,{numeric:!0})),s||">=")}))(n,r)}(t,r=Array.isArray(r)?r:[r],this.swup)){const e=`${t} ${r.join(", ")}`;throw new Error(`Plugin version mismatch: ${this.name} requires ${e}`)}}),!0}}class r extends URL{constructor(e,t=document.baseURI){super(e.toString(),t)}get url(){return this.pathname+this.search}static fromElement(e){const t=e.getAttribute("href")||e.getAttribute("xlink:href");return new r(t)}static fromUrl(e){return new r(e)}}return class extends t{constructor(e){super(),this.name="FormsPlugin",this.onKeyDown=e=>{this.specialKeys.hasOwnProperty(e.key)&&(this.specialKeys[e.key]=!0)},this.onKeyUp=e=>{this.specialKeys.hasOwnProperty(e.key)&&(this.specialKeys[e.key]=!1)},this.options={formSelector:"form[data-swup-form]",...e},this.specialKeys={Meta:!1,Control:!1,Shift:!1}}mount(){const e=this.swup;e._handlers.submitForm=[],e._handlers.openFormSubmitInNewTab=[],e.delegatedListeners.formSubmit=e.delegateEvent(this.options.formSelector,"submit",this.beforeFormSubmit.bind(this),{capture:!0}),document.addEventListener("keydown",this.onKeyDown),document.addEventListener("keyup",this.onKeyUp)}unmount(){this.swup.delegatedListeners.formSubmit.destroy(),document.removeEventListener("keydown",this.onKeyDown),document.removeEventListener("keyup",this.onKeyUp)}beforeFormSubmit(e){const t=this.swup;t.triggerEvent("submitForm",e);const r=e.target;if(this.isSpecialKeyPressed()){this.resetSpecialKeys(),t.triggerEvent("openFormSubmitInNewTab",e);const s=r.getAttribute("target");return r.setAttribute("target","_blank"),void r.addEventListener("submit",e=>{requestAnimationFrame(()=>{this.restorePreviousFormTarget(e.target,s)})},{once:!0})}this.submitForm(e)}restorePreviousFormTarget(e,t){t?e.setAttribute("target",t):e.removeAttribute("target")}submitForm(e){const t=this.swup;e.preventDefault();const s=e.target,n=new FormData(s),i=s.getAttribute("action")||(({hash:e}={})=>location.pathname+location.search+(e?location.hash:""))(),o=(s.getAttribute("method")||"get").toUpperCase(),a=s.getAttribute("data-swup-transition");let{url:u,hash:c}=r.fromUrl(i);c&&(t.scrollToElement=c),"GET"===o?(u=this.appendQueryParams(u,n),t.cache.remove(u),t.loadPage({url:u,customTransition:a})):(t.cache.remove(u),t.loadPage({url:u,method:o,data:n,customTransition:a}))}appendQueryParams(e,t){e=e.split("?")[0];const r=new URLSearchParams(t).toString();return r?`${e}?${r}`:e}isSpecialKeyPressed(){return Object.values(this.specialKeys).some(e=>e)}resetSpecialKeys(){for(const[e,t]of Object.entries(this.specialKeys))this.specialKeys[e]=!1}}});
//# sourceMappingURL=index.umd.js.map
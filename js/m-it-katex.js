(window.webpackJsonpFileReadmeMD=window.webpackJsonpFileReadmeMD||[]).push([[2],{32:function(r,e,n){"use strict";var t=n(27);function c(r,e){var n,t,c=r.posMax,i=!0,o=!0;return n=e>0?r.src.charCodeAt(e-1):-1,t=e+1<=c?r.src.charCodeAt(e+1):-1,(32===n||9===n||t>=48&&t<=57)&&(o=!1),32!==t&&9!==t||(i=!1),{can_open:i,can_close:o}}function i(r,e){var n,t,i,o;if("$"!==r.src[r.pos])return!1;if(!c(r,r.pos).can_open)return e||(r.pending+="$"),r.pos+=1,!0;for(t=n=r.pos+1;-1!==(t=r.src.indexOf("$",t));){for(o=t-1;"\\"===r.src[o];)o-=1;if((t-o)%2==1)break;t+=1}return-1===t?(e||(r.pending+="$"),r.pos=n,!0):t-n==0?(e||(r.pending+="$$"),r.pos=n+1,!0):c(r,t).can_close?(e||((i=r.push("math_inline","math",0)).markup="$",i.content=r.src.slice(n,t)),r.pos=t+1,!0):(e||(r.pending+="$"),r.pos=n,!0)}function o(r,e,n,t){var c,i,o,s,a,l=!1,u=r.bMarks[e]+r.tShift[e],p=r.eMarks[e];if(u+2>p)return!1;if("$$"!==r.src.slice(u,u+2))return!1;if(u+=2,c=r.src.slice(u,p),t)return!0;for("$$"===c.trim().slice(-2)&&(c=c.trim().slice(0,-2),l=!0),o=e;!l&&!(++o>=n)&&!((u=r.bMarks[o]+r.tShift[o])<(p=r.eMarks[o])&&r.tShift[o]<r.blkIndent);)"$$"===r.src.slice(u,p).trim().slice(-2)&&(s=r.src.slice(0,p).lastIndexOf("$$"),i=r.src.slice(u,s),l=!0);return r.line=o+1,(a=r.push("math_block","math",0)).block=!0,a.content=(c&&c.trim()?c+"\n":"")+r.getLines(e+1,o,r.tShift[e],!0)+(i&&i.trim()?i:""),a.map=[e,r.line],a.markup="$$",!0}r.exports=function(r,e){e=e||{};r.inline.ruler.after("escape","math_inline",i),r.block.ruler.after("blockquote","math_block",o,{alt:["paragraph","reference","blockquote","list"]}),r.renderer.rules.math_inline=function(r,n){return function(r){e.displayMode=!1;try{return t.renderToString(r,e)}catch(n){return e.throwOnError&&console.log(n),r}}(r[n].content)},r.renderer.rules.math_block=function(r,n){return function(r){e.displayMode=!0;try{return"<p>"+t.renderToString(r,e)+"</p>"}catch(n){return e.throwOnError&&console.log(n),r}}(r[n].content)+"\n"}}}}]);
//# sourceMappingURL=m-it-katex.js.map
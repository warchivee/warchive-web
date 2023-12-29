import{r as f,j as a,c as A,T as $,B as d,b as _,g as z,d as B,a as K}from"./index-39hTYAsx.js";import{M as O,T as D,u as C,D as h,w as F,b as W,W as q}from"./wata.atom-OmgfIt4O.js";import{I as R}from"./index-_ctq95tO.js";import{g as H}from"./shareUrlShroter-Lt5LT4aW.js";function G({isOpen:e,onConfirm:t=()=>{},onClose:o}){const[r,n]=f.useState("");return f.useEffect(()=>{e&&n("")},[e]),a.jsx(O,{isOpen:e,title:"컬렉션 추가하기",message:"새로 만들 컬렉션의 이름을 입력해주세요.",onConfirm:()=>t(r),onClose:o,buttons:["confirm","cancel"],children:a.jsx(R,{value:r,onChange:n,border:"underline",maxLength:D})})}function X({selectIndex:e,isEditMode:t,handleChange:o}){const{collections:r,addCollection:n,removeCollection:l}=C(),[c,i]=f.useState(!1),[u,p]=f.useState(!1);return a.jsxs("div",{className:"menu",children:[a.jsx("ul",{children:r==null?void 0:r.map((s,y)=>a.jsx("li",{className:A({active:s.title===r[e].title}),onClick:()=>o(y),"aria-hidden":"true",children:a.jsx($,{color:"white",children:s.title})},`bookmark-list-${s.title}`))}),t?null:a.jsxs("div",{className:"control",children:[a.jsx(d,{icon:"plus",iconColor:"white",labelColor:"white",border:"round",size:"small",onClick:()=>{p(!0)}}),e!==h&&a.jsx(d,{icon:"minus",iconColor:"white",labelColor:"white",border:"round",size:"small",onClick:()=>{i(!0)}})]}),a.jsx(G,{isOpen:u,onClose:()=>p(!1),onConfirm:s=>{try{n(s||""),o(r.length)}catch{}p(!1)}}),a.jsx(O,{title:"컬렉션 삭제하기",message:"컬렉션을 정말 삭제하시겠습니까? 컬렉션에 추가한 작품들까지 전부 삭제됩니다.",isOpen:c,onClose:()=>{i(!1)},onConfirm:()=>{try{l(e),o(e-1)}catch{}i(!1)},buttons:["confirm","cancel"]})]})}function Y({isEditMode:e,selectIndex:t,handleEditMode:o}){const{collections:r,renameCollection:n}=C(),[l,c]=f.useState("");return f.useEffect(()=>{e&&c(r[t].title)},[t,e]),a.jsxs("div",{className:"header",children:[e?a.jsx(R,{value:l,type:"text",border:"underline",onChange:c,size:"big",maxLength:D}):a.jsx(_,{type:"h1",children:r[t].title}),e?null:a.jsx(_,{type:"h2",color:"light-violet",children:r[t].items.length}),e&&t!==h?a.jsxs(a.Fragment,{children:[a.jsx(d,{size:"small",border:"round",background:"light-violet",labelColor:"french-lilac",onClick:()=>{n(t,l),o(!1),c("")},children:"완료"}),a.jsx(d,{size:"small",border:"round",background:"light-violet",labelColor:"french-lilac",onClick:()=>{o(!1),c("")},children:"취소"})]}):t!==h&&a.jsx("div",{className:"edit",children:a.jsx(d,{icon:"write",iconColor:"light-violet",onClick:()=>{o(!0)}})})]})}var v={},J=function(){var e=document.getSelection();if(!e.rangeCount)return function(){};for(var t=document.activeElement,o=[],r=0;r<e.rangeCount;r++)o.push(e.getRangeAt(r));switch(t.tagName.toUpperCase()){case"INPUT":case"TEXTAREA":t.blur();break;default:t=null;break}return e.removeAllRanges(),function(){e.type==="Caret"&&e.removeAllRanges(),e.rangeCount||o.forEach(function(n){e.addRange(n)}),t&&t.focus()}},Q=J,k={"text/plain":"Text","text/html":"Url",default:"Text"},V="Copy to clipboard: #{key}, Enter";function Z(e){var t=(/mac os x/i.test(navigator.userAgent)?"⌘":"Ctrl")+"+C";return e.replace(/#{\s*key\s*}/g,t)}function ee(e,t){var o,r,n,l,c,i,u=!1;t||(t={}),o=t.debug||!1;try{n=Q(),l=document.createRange(),c=document.getSelection(),i=document.createElement("span"),i.textContent=e,i.ariaHidden="true",i.style.all="unset",i.style.position="fixed",i.style.top=0,i.style.clip="rect(0, 0, 0, 0)",i.style.whiteSpace="pre",i.style.webkitUserSelect="text",i.style.MozUserSelect="text",i.style.msUserSelect="text",i.style.userSelect="text",i.addEventListener("copy",function(s){if(s.stopPropagation(),t.format)if(s.preventDefault(),typeof s.clipboardData>"u"){o&&console.warn("unable to use e.clipboardData"),o&&console.warn("trying IE specific stuff"),window.clipboardData.clearData();var y=k[t.format]||k.default;window.clipboardData.setData(y,e)}else s.clipboardData.clearData(),s.clipboardData.setData(t.format,e);t.onCopy&&(s.preventDefault(),t.onCopy(s.clipboardData))}),document.body.appendChild(i),l.selectNodeContents(i),c.addRange(l);var p=document.execCommand("copy");if(!p)throw new Error("copy command was unsuccessful");u=!0}catch(s){o&&console.error("unable to copy using execCommand: ",s),o&&console.warn("trying IE specific stuff");try{window.clipboardData.setData(t.format||"text",e),t.onCopy&&t.onCopy(window.clipboardData),u=!0}catch(y){o&&console.error("unable to copy using clipboardData: ",y),o&&console.error("falling back to prompt"),r=Z("message"in t?t.message:V),window.prompt(r,e)}}finally{c&&(typeof c.removeRange=="function"?c.removeRange(l):c.removeAllRanges()),i&&document.body.removeChild(i),n()}return u}var te=ee;function w(e){"@babel/helpers - typeof";return w=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},w(e)}Object.defineProperty(v,"__esModule",{value:!0});v.CopyToClipboard=void 0;var b=N(f),re=N(te),oe=["text","onCopy","options","children"];function N(e){return e&&e.__esModule?e:{default:e}}function T(e,t){var o=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable})),o.push.apply(o,r)}return o}function P(e){for(var t=1;t<arguments.length;t++){var o=arguments[t]!=null?arguments[t]:{};t%2?T(Object(o),!0).forEach(function(r){S(e,r,o[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(o)):T(Object(o)).forEach(function(r){Object.defineProperty(e,r,Object.getOwnPropertyDescriptor(o,r))})}return e}function ne(e,t){if(e==null)return{};var o=ae(e,t),r,n;if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],!(t.indexOf(r)>=0)&&Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}function ae(e,t){if(e==null)return{};var o={},r=Object.keys(e),n,l;for(l=0;l<r.length;l++)n=r[l],!(t.indexOf(n)>=0)&&(o[n]=e[n]);return o}function le(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function E(e,t){for(var o=0;o<t.length;o++){var r=t[o];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function ie(e,t,o){return t&&E(e.prototype,t),o&&E(e,o),Object.defineProperty(e,"prototype",{writable:!1}),e}function ce(e,t){if(typeof t!="function"&&t!==null)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),Object.defineProperty(e,"prototype",{writable:!1}),t&&x(e,t)}function x(e,t){return x=Object.setPrototypeOf||function(r,n){return r.__proto__=n,r},x(e,t)}function se(e){var t=fe();return function(){var r=g(e),n;if(t){var l=g(this).constructor;n=Reflect.construct(r,arguments,l)}else n=r.apply(this,arguments);return ue(this,n)}}function ue(e,t){if(t&&(w(t)==="object"||typeof t=="function"))return t;if(t!==void 0)throw new TypeError("Derived constructors may only return object or undefined");return I(e)}function I(e){if(e===void 0)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function fe(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch{return!1}}function g(e){return g=Object.setPrototypeOf?Object.getPrototypeOf:function(o){return o.__proto__||Object.getPrototypeOf(o)},g(e)}function S(e,t,o){return t in e?Object.defineProperty(e,t,{value:o,enumerable:!0,configurable:!0,writable:!0}):e[t]=o,e}var L=function(e){ce(o,e);var t=se(o);function o(){var r;le(this,o);for(var n=arguments.length,l=new Array(n),c=0;c<n;c++)l[c]=arguments[c];return r=t.call.apply(t,[this].concat(l)),S(I(r),"onClick",function(i){var u=r.props,p=u.text,s=u.onCopy,y=u.children,M=u.options,m=b.default.Children.only(y),U=(0,re.default)(p,M);s&&s(p,U),m&&m.props&&typeof m.props.onClick=="function"&&m.props.onClick(i)}),r}return ie(o,[{key:"render",value:function(){var n=this.props;n.text,n.onCopy,n.options;var l=n.children,c=ne(n,oe),i=b.default.Children.only(l);return b.default.cloneElement(i,P(P({},c),{},{onClick:this.onClick}))}}]),o}(b.default.PureComponent);v.CopyToClipboard=L;S(L,"defaultProps",{onCopy:void 0,options:void 0});var pe=v,j=pe.CopyToClipboard;j.CopyToClipboard=j;var de=j;const ye=z(de);function me({selectIndex:e,isOpen:t,onClose:o}){const{collections:r}=C(),n=()=>H(r[e]);return a.jsx(O,{isOpen:t,onClose:o,title:"SNS에 공유하기",message:"SNS에 내 컬렉션을 공유해보세요.",children:a.jsxs("div",{className:"buttons",children:[a.jsx(ye,{text:n(),onCopy:()=>o(),children:a.jsx(d,{icon:"link",background:"selago",iconColor:"purple",labelColor:"ebony",border:"round",children:"공유 URL 복사"})}),a.jsx(d,{icon:"twitter",background:"selago",labelColor:"ebony",border:"round",onClick:()=>{const l=n(),c=" ";window.open(`https://twitter.com/intent/tweet?text=${c}&url=${l}`)}}),a.jsx(d,{icon:"facebook",background:"selago",labelColor:"ebony",border:"round",onClick:()=>{const l=n();window.open(`http://www.facebook.com/sharer/sharer.php?u=${l}`)}})]})})}function be({isEditMode:e,selectIndex:t=0}){const[o,r]=f.useState(!1);return t!==h&&a.jsx("div",{className:"sns",children:!e&&a.jsxs(a.Fragment,{children:[a.jsx(d,{background:"selago",icon:"share",onClick:()=>r(!0),children:"SNS에 공유하기"}),a.jsx(me,{isOpen:o,onClose:()=>r(!1),selectIndex:t})]})})}function we(){const e=B(F),[t,o]=K(W),{collections:r}=C(),[n,l]=f.useState(0),[c,i]=f.useState(!1);return f.useEffect(()=>{i(!1)},[n]),f.useEffect(()=>{o({...t,category:{label:"전체",value:"category-전체"}})},[]),a.jsxs("div",{className:"page collections",children:[a.jsx(X,{isEditMode:c,selectIndex:n,handleChange:l}),a.jsxs("div",{className:"content",children:[a.jsx(Y,{isEditMode:c,selectIndex:n,handleEditMode:i}),a.jsx(be,{isEditMode:c,selectIndex:n}),a.jsx(q,{watas:e.filter(u=>r[n].items.some(p=>p===u.id))})]})]})}export{we as default};

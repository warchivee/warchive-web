const o="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";const l=n=>{let e=BigInt(`0b${n}`),t="";for(;e>0n;){const r=e%62n;t=o.charAt(Number(r))+t,e/=62n}return t},c=n=>{let e=BigInt(0);for(let t=0;t<n.length;t+=1){const r=n.charAt(t),i=BigInt(o.indexOf(r));e=e*62n+i}return e.toString(2)},a=n=>{const{title:e,items:t}=n,r=Array.from({length:1e3},()=>0);return r[0]=1,t.forEach(s=>{r[s]=1}),`https://warchivee.github.io/warchive-web/shared?${`p=${l(r.join(""))}t=${e}`}`},h=(n,e)=>{const t=e.split("t=");if(!e||t.length!==2)return{title:"",items:[]};const r=c(t[0]).split("")||[];return{title:t[1],items:n.filter(i=>r[i.id]==="1")}};export{h as a,a as g};

import{j as a,I as u,c as p}from"./index-39hTYAsx.js";function m({type:t="text",border:n="outline",value:e,placeholder:o,size:s="normal",maxLength:r=100,onChange:c=()=>{}}){return a.jsxs("div",{className:"input",children:[t==="search"&&a.jsx(u,{type:"search",size:s,color:"purple"}),a.jsx("input",{type:t,maxLength:r,className:p({[`${n}`]:n},{[`font-size-${s}`]:s}),placeholder:o,value:e,onChange:l=>{c(l.target.value)}})]})}export{m as I};
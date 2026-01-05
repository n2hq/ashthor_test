import{j as r}from"./jsx-runtime-0DLF9kdB.js";import{r as i}from"./components-CqyJs_9b.js";import{g as n,a6 as p}from"./lib-BhVPRy-q.js";const h=({tooltip:t,children:a})=>r.jsx("div",{className:"block",children:r.jsxs("a",{href:"#",className:"tooltip z-[20000] relative  ","data-tooltip":t,children:[a,r.jsx("style",{children:`
                    .tooltip{
                        position:relative;
                        display: inline-block;
                        cursor: pointer;
                        text-decoration: underline;
                    }

                    .tooltip::after{
                        content:attr(data-tooltip);
                        position: absolute;
                        bottom: 125%;
                        left: 50%;
                        transform: translateX(-20px);
                        background-color: blue;
                        color: #fff;
                        padding: 6px 8px;
                        border-radius: 4px;
                        white-space: normal;
                        max-width: 250px; 
                        min-width: 200px; 
                        word-wrap: break-word;
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.2s ease-in-out;
                        font-size: 11px;
                        z-index: 999;
                        line-height:1.4em;
                    }

                    .tooltip:hover::after{
                        opacity: 1;
                    }
                    `})]})}),u=({countries:t})=>{var c;const[a,o]=i.useState(""),s=(c=t==null?void 0:t.filter(e=>e.name.toLowerCase().includes(a.toLowerCase())))==null?void 0:c.sort((e,l)=>e.name.localeCompare(l.name));return r.jsxs("div",{className:"space-y-3",children:[r.jsx("div",{className:"px-3",children:r.jsx("input",{type:"text",placeholder:"Search country...",value:a,onChange:e=>o(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})}),r.jsxs("div",{className:"h-[150px] overflow-y-auto scrollbar-hidden",children:[s==null?void 0:s.map((e,l)=>r.jsx("div",{children:r.jsx("a",{href:`${n.searchBaseUrl}?q=&country=${e==null?void 0:e.id}`,children:r.jsxs("div",{className:"flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer",children:[r.jsx("div",{className:"w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full",children:e==null?void 0:e.id}),r.jsx("div",{className:"text-lg",children:e==null?void 0:e.name})]})})},l)),(s==null?void 0:s.length)===0&&r.jsx("div",{className:"px-5 text-gray-500",children:"No results found"})]})]})},f=()=>{var s,c;const[t,a]=i.useState(""),o=(c=(s=p)==null?void 0:s.filter(e=>e.name.toLowerCase().includes(t.toLowerCase())))==null?void 0:c.sort((e,l)=>e.name.localeCompare(l.name));return r.jsxs("div",{className:"space-y-3",children:[r.jsx("div",{className:"px-3",children:r.jsx("input",{type:"text",placeholder:"Search category...",value:t,onChange:e=>a(e.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})}),r.jsxs("div",{className:"max-h-[150px] overflow-y-auto scrollbar-hidden",children:[o==null?void 0:o.map((e,l)=>r.jsx("div",{children:r.jsx("a",{href:`/web/category/${e==null?void 0:e.id}`,children:r.jsxs("div",{className:"flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer",children:[r.jsx("div",{className:"w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full",children:e==null?void 0:e.icon}),r.jsx("div",{className:"text-lg",children:e==null?void 0:e.name})]})})},l)),(o==null?void 0:o.length)===0&&r.jsx("div",{className:"px-5 text-gray-500",children:"No results found"})]})]})};export{f as C,h as T,u as a};

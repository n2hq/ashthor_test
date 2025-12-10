import{j as s}from"./jsx-runtime-0DLF9kdB.js";import{L as n,r as l}from"./components-C1WRcSP2.js";import{l as x,aG as p,x as m,a1 as h}from"./lib-bmjlEEes.js";const i=({listing:e})=>s.jsxs("div",{children:[e==null?void 0:e.address_one,e!=null&&e.address_two?`, ${e==null?void 0:e.address_two}`:"",e!=null&&e.city_name?`, ${e==null?void 0:e.city_name}`:"",e!=null&&e.state_name?`, ${e==null?void 0:e.state_name}`:"",e!=null&&e.country_name?`, ${e==null?void 0:e.country_name}`:""]}),N=({tooltip:e,children:c})=>s.jsx("div",{className:"block",children:s.jsxs("a",{href:"#",className:"tooltip z-[20000] relative  ","data-tooltip":e,children:[c,s.jsx("style",{children:`
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
                    `})]})}),u=({feature:e})=>s.jsxs("div",{id:e.gid,className:"pb-4 pt-3",children:[s.jsx(n,{to:`/${e!=null&&e.username?e==null?void 0:e.username:e==null?void 0:e.gid}`,children:s.jsx("div",{className:`text-[15px] tracking-normal 
                text-blue-700 font-normal`,children:e.title})}),s.jsx("div",{className:`text-md font-semibold 
                tracking-tight mt-[2px]`,children:e.phone}),s.jsx("div",{className:`font-normal  
                tracking-normal mt-[2px] leading-[1.3em]
                text-black`,children:e.short_description.substring(0,80)}),s.jsx("div",{className:`text-[12px] font-normal 
                tracking-tight mt-[5px] leading-[1.4em]
                text-brown-700`,children:s.jsx(i,{listing:e})}),s.jsx("div",{className:` font-semibold  
                tracking-tight mt-[8px] text-blue-800`,children:s.jsx(n,{to:e.website?e.website:`#${e.gid}`,children:"Website"})})]}),w=()=>{const[e,c]=l.useState([]),[a,o]=l.useState(0);return l.useEffect(()=>{const t=async()=>{const r=await p();c(r)};try{t()}catch(r){x(r.message)}},[]),s.jsxs("div",{className:`border-[1px] px-4 pt-4 pb-4
        rounded-xl border-gray-200`,children:[s.jsx("div",{className:"font-bold text-lg",children:"Featured"}),s.jsx("div",{className:"divide-y divide-gray-200",children:(e==null?void 0:e.length)>0?e==null?void 0:e.map((t,r)=>r>2?null:s.jsx(u,{feature:t},r)):s.jsx("div",{className:"text-[15px] mt-4",children:"Loading..."})})]})},v=({countries:e})=>{var t;const[c,a]=l.useState(""),o=(t=e==null?void 0:e.filter(r=>r.name.toLowerCase().includes(c.toLowerCase())))==null?void 0:t.sort((r,d)=>r.name.localeCompare(d.name));return s.jsxs("div",{className:"space-y-3",children:[s.jsx("div",{className:"px-3",children:s.jsx("input",{type:"text",placeholder:"Search country...",value:c,onChange:r=>a(r.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})}),s.jsxs("div",{className:"h-[150px] overflow-y-auto scrollbar-hidden",children:[o==null?void 0:o.map((r,d)=>s.jsx("div",{children:s.jsx("a",{href:`${m.searchBaseUrl}?q=&country=${r==null?void 0:r.id}`,children:s.jsxs("div",{className:"flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer",children:[s.jsx("div",{className:"w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full",children:r==null?void 0:r.id}),s.jsx("div",{className:"text-lg",children:r==null?void 0:r.name})]})})},d)),(o==null?void 0:o.length)===0&&s.jsx("div",{className:"px-5 text-gray-500",children:"No results found"})]})]})},f=()=>{var o,t;const[e,c]=l.useState(""),a=(t=(o=h)==null?void 0:o.filter(r=>r.name.toLowerCase().includes(e.toLowerCase())))==null?void 0:t.sort((r,d)=>r.name.localeCompare(d.name));return s.jsxs("div",{className:"space-y-3",children:[s.jsx("div",{className:"px-3",children:s.jsx("input",{type:"text",placeholder:"Search category...",value:e,onChange:r=>c(r.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})}),s.jsxs("div",{className:"max-h-[150px] overflow-y-auto scrollbar-hidden",children:[a==null?void 0:a.map((r,d)=>s.jsx("div",{children:s.jsx("a",{href:`/web/category/${r==null?void 0:r.id}`,children:s.jsxs("div",{className:"flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer",children:[s.jsx("div",{className:"w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full",children:r==null?void 0:r.icon}),s.jsx("div",{className:"text-lg",children:r==null?void 0:r.name})]})})},d)),(a==null?void 0:a.length)===0&&s.jsx("div",{className:"px-5 text-gray-500",children:"No results found"})]})]})};export{i as A,f as C,w as F,N as T,v as a};

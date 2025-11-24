import{j as r}from"./jsx-runtime-0DLF9kdB.js";import{L as n,r as l}from"./components-QUucBwvO.js";import{l as x,aC as m,J as p}from"./lib-gXVz7xpy.js";const h=({listing:e})=>r.jsxs("div",{children:[e==null?void 0:e.address_one,e!=null&&e.address_two?`, ${e==null?void 0:e.address_two}`:"",e!=null&&e.city_name?`, ${e==null?void 0:e.city_name}`:"",e!=null&&e.state_name?`, ${e==null?void 0:e.state_name}`:"",e!=null&&e.country_name?`, ${e==null?void 0:e.country_name}`:""]});function y({rating:e}){return r.jsx("div",{className:"flex gap-x-[2px]",children:Array.from({length:5}).map((a,o)=>{const t=Math.max(0,Math.min(1,e-o))*100;return r.jsx("div",{className:`relative w-[17px] h-[17px] bg-white rounded-full 
                            overflow-hidden flex place-items-center border-[1px]
                            place-content-center border-gray-500`,children:r.jsx("div",{className:"absolute inset-0 bg-green-600 z-[0]",style:{width:`${t}%`}})},o)})})}const N=({tooltip:e,children:a})=>r.jsx("div",{className:"block",children:r.jsxs("a",{href:"#",className:"tooltip z-[20000] relative  ","data-tooltip":e,children:[a,r.jsx("style",{children:`
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
                    `})]})}),i=({feature:e})=>r.jsxs("div",{id:e.gid,className:"pb-4 pt-3",children:[r.jsx(n,{to:`/${e!=null&&e.username?e==null?void 0:e.username:e==null?void 0:e.gid}`,children:r.jsx("div",{className:`text-[15px] tracking-normal 
                text-blue-700 font-normal`,children:e.title})}),r.jsx("div",{className:`text-md font-semibold 
                tracking-tight mt-[2px]`,children:e.phone}),r.jsx("div",{className:`font-normal  
                tracking-normal mt-[2px] leading-[1.3em]
                text-black`,children:e.short_description.substring(0,80)}),r.jsx("div",{className:`text-[12px] font-normal 
                tracking-tight mt-[5px] leading-[1.4em]
                text-brown-700`,children:r.jsx(h,{listing:e})}),r.jsx("div",{className:` font-semibold  
                tracking-tight mt-[8px] text-blue-800`,children:r.jsx(n,{to:e.website?e.website:`#${e.gid}`,children:"Website"})})]}),w=()=>{const[e,a]=l.useState([]),[o,t]=l.useState(0);return l.useEffect(()=>{const c=async()=>{const s=await m();a(s)};try{c()}catch(s){x(s.message)}},[]),r.jsxs("div",{className:`border-[1px] px-4 pt-4 pb-4
        rounded-xl border-gray-200`,children:[r.jsx("div",{className:"font-bold text-lg",children:"Featured"}),r.jsx("div",{className:"divide-y divide-gray-200",children:(e==null?void 0:e.length)>0?e==null?void 0:e.map((c,s)=>s>2?null:r.jsx(i,{feature:c},s)):r.jsx("div",{className:"text-[15px] mt-4",children:"Loading..."})})]})},f=({countries:e})=>{var c;const[a,o]=l.useState(""),t=(c=e==null?void 0:e.filter(s=>s.name.toLowerCase().includes(a.toLowerCase())))==null?void 0:c.sort((s,d)=>s.name.localeCompare(d.name));return r.jsxs("div",{className:"space-y-3",children:[r.jsx("div",{className:"px-3",children:r.jsx("input",{type:"text",placeholder:"Search country...",value:a,onChange:s=>o(s.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})}),r.jsxs("div",{className:"h-[150px] overflow-y-auto scrollbar-hidden",children:[t==null?void 0:t.map((s,d)=>r.jsx("div",{children:r.jsx("a",{href:`/web/browse?q=&country=${s==null?void 0:s.id}`,children:r.jsxs("div",{className:"flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer",children:[r.jsx("div",{className:"w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full",children:s==null?void 0:s.id}),r.jsx("div",{className:"text-lg",children:s==null?void 0:s.name})]})})},d)),(t==null?void 0:t.length)===0&&r.jsx("div",{className:"px-5 text-gray-500",children:"No results found"})]})]})},v=()=>{var t,c;const[e,a]=l.useState(""),o=(c=(t=p)==null?void 0:t.filter(s=>s.name.toLowerCase().includes(e.toLowerCase())))==null?void 0:c.sort((s,d)=>s.name.localeCompare(d.name));return r.jsxs("div",{className:"space-y-3",children:[r.jsx("div",{className:"px-3",children:r.jsx("input",{type:"text",placeholder:"Search category...",value:e,onChange:s=>a(s.target.value),className:"w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"})}),r.jsxs("div",{className:"max-h-[150px] overflow-y-auto scrollbar-hidden",children:[o==null?void 0:o.map((s,d)=>r.jsx("div",{children:r.jsx("a",{href:`/web/browse?q=${s==null?void 0:s.id}`,children:r.jsxs("div",{className:"flex place-content-start place-items-center gap-2 w-full hover:bg-blue-100 pl-5 py-1.5 hover:cursor-pointer",children:[r.jsx("div",{className:"w-[30px] h-[30px] flex place-content-center place-items-center bg-blue-100 rounded-full",children:s==null?void 0:s.icon}),r.jsx("div",{className:"text-lg",children:s==null?void 0:s.name})]})})},d)),(o==null?void 0:o.length)===0&&r.jsx("div",{className:"px-5 text-gray-500",children:"No results found"})]})]})};export{h as A,v as C,w as F,y as R,N as T,f as a};

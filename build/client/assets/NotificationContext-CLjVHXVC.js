import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{r as l}from"./components-QUucBwvO.js";import{u as C}from"./lib-DCUw63U7.js";const u=l.createContext(null);function q(){return l.useContext(u)}const B=({children:a})=>{const[t,s]=l.useState(!1),[o,c]=l.useState(0),[i,p]=l.useState(""),[h,m]=l.useState(""),[w,b]=l.useState(""),[g,A]=l.useState(!1),[v,R]=l.useState(!1),[j,y]=l.useState(),f=()=>{s(!1)},d=()=>{s(!1),c(0),p("")};l.useEffect(()=>{d()},[]);let N={notify:async(n="Working...")=>{d(),b(n),await new Promise(r=>setTimeout(r,100)),s(!0),c(1)},cancel:d,alert:async(n,r)=>{d(),p(r||"Process Completed!"),m(n||"Alert"),await new Promise(x=>setTimeout(x,100)),s(!0),c(2)},alertReload:async(n,r)=>{d(),p(r||"Process Completed!"),m(n||"Alert"),await new Promise(x=>setTimeout(x,100)),s(!0),c(3)},confirm:async(n="Do you wish to continue?",r)=>{d(),p(n),await new Promise(x=>setTimeout(x,100)),s(!0),c(4),y(()=>r)},confirmCancel:g,confirmOk:v,alertCancel:async(n,r)=>{d(),p(r||"Completed!"),m(n||"Alert"),await new Promise(x=>setTimeout(x,100)),s(!0),c(5)}};return e.jsxs(u.Provider,{value:N,children:[t&&o===1&&e.jsx(P,{working:t,notifyMessage:w}),t&&o===2&&e.jsx(S,{handleClose:f,working:t,message:i,title:h}),t&&o===3&&e.jsx(M,{handleClose:f,working:t,title:h,message:i}),t&&o===4&&e.jsx(k,{onClose:j,working:t,message:i}),t&&o===5&&e.jsx(T,{handleClose:f,working:t,message:i,title:h}),a]})},k=({handleClose:a,working:t,message:s,handleConfirmCancel:o,setConfirmOk:c,onClose:i})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`,children:"Confirm"}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:s})}),e.jsxs("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:[e.jsx("button",{onClick:()=>i(!1),className:`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,children:"No"}),e.jsx("button",{onClick:()=>i(!0),className:`px-3 bg-gray-100 py-1 border-[1px] rounded-[5px]
                                text-[14px] hover:bg-gray-200`,children:"Yes"})]})]})}),P=({working:a,notifyMessage:t})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`,children:"Processing..."}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsxs("div",{className:` px-3 py-3 h-fit
                        flex place-items-center gap-2`,children:[e.jsx(C,{className:`text-3xl text-blue-500 ${a?"animate-spin":""}`}),t]})}),e.jsx("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:" "})]})}),S=({handleClose:a,working:t,message:s,title:o})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`,children:o}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:s})}),e.jsxs("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:[e.jsx("button",{onMouseDown:a,className:`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,children:"Close"}),e.jsx("button",{onMouseDown:()=>window.location.reload(),className:`px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,children:"Reload"})]})]})}),M=({handleClose:a,working:t,message:s,title:o})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`,children:o}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:s})}),e.jsx("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:e.jsx("button",{onMouseDown:()=>window.location.reload(),className:`px-3 bg-gray-200 text-black rounded-[5px]
                                text-[14px] py-1 hover:bg-gray-100
                                hover:shadow-md`,children:"Reload"})})]})}),T=({handleClose:a,working:t,message:s,title:o})=>e.jsx("div",{className:`z-[4000] fixed left-0 top-0 right-0 bottom-0
                bg-black/30 flex flex-col place-content-center place-items-center
                `,children:e.jsxs("div",{className:`w-[90%] sm:w-[500px] h-auto bg-white 
                        overflow-hidden rounded-md relative shadow-2xl shadow-black/50`,children:[e.jsx("div",{className:`px-4 py-3 border-b-[1px] font-bold text-[17px] bg-gray-100
                            w-full`,children:o}),e.jsx("div",{className:`w-full h-auto 
                            `,children:e.jsx("div",{className:" px-4 py-3 h-fit",children:s})}),e.jsx("div",{className:`px-4 py-[10px] border-t-[1px] w-full
                            flex place-content-end gap-2 `,children:e.jsx("button",{onMouseDown:a,className:`px-3 bg-red-500 text-white rounded-[5px]
                                text-[14px] py-1 hover:bg-red-800`,children:"Close"})})]})});export{B as N,q as u};

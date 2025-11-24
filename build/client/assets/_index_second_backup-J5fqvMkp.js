import{j as e}from"./jsx-runtime-0DLF9kdB.js";import{H as b}from"./HomeNav-BEt16bSm.js";import{L as f,r as t}from"./components-QUucBwvO.js";import{a8 as w,B as N,a as k,R as S,C as R,G as T,X as y,c as B,F as E,d as H,M as z}from"./lib-DdNSHGvE.js";import{H as _,S as C,R as M,F as q}from"./Footer-rNedZ6Xu.js";import{U as F,M as G}from"./UserMenu-BW_1sgd0.js";import{T as L}from"./TopAd-3RAqbcjV.js";import"./AccountUserImage-C0Y9nO1x.js";import"./AuthContext-vU5UQSzu.js";import"./LatestStarRating-DSxrRe2e.js";import"./css-CVxtJxAn.js";import"./index-BFdAKlrZ.js";const X=()=>e.jsx(f,{to:"/",children:e.jsx("div",{className:` text-[24px]
                cursor-pointer tracking-tight relative
                top-[-1px] font-poppins`,children:w()})}),A=()=>{const[a]=t.useState(1),[n,m]=t.useState(""),[r,l]=t.useState(!1),[i,o]=t.useState(!1),[x,j]=t.useState(!1),h=()=>o(!0),u=()=>o(!1);return t.useEffect(()=>{const p=()=>{window.scrollY>=a&&l(!0),window.scrollY<a&&l(!1)};window.onscroll=()=>p()},[a]),e.jsxs("div",{children:[e.jsx("div",{className:`z-[400] fixed w-full  h-[60px] 
      px-[15px] 
     transition-all duration-1000 ease-in-out
     flex flex-col place-content-center
     ${r&&"bg-black/90"}
     `,children:e.jsxs("div",{className:`max-w-[1100px] 
      mx-auto w-full text-white relative gap-x-8
        flex place-content-between h-full`,children:[e.jsx("div",{className:`font-bold font-sans 
          flex place-items-center text-2xl w-fit
           `,children:e.jsx(X,{})}),e.jsx("div",{className:`hidden place-items-center
                     lg:flex  w-full`,children:e.jsx(f,{to:"/web/search",children:"Search"})}),e.jsx("div",{className:"flex place-items-center ",children:e.jsxs("div",{className:"flex place-items-center gap-4",children:[e.jsx(F,{theme:"dark"}),e.jsx(_,{theme:"dark",openNav:h,navBg:x})]})})]})}),e.jsx(G,{showNav:i,closeNav:u})]})},d=[{img:"/images/hero/man_with_reading_glasses.jpg"},{img:"/images/hero/mobile_device.jpg"},{img:"/images/hero/business_man.jpg"},{img:"/images/hero/realtor_in_dark.jpg"},{img:"/images/hero/lady_eating.jpg"},{img:"/images/hero/bedroom_furniture.jpg"},{img:"/images/hero/perfume.jpg"}],D=()=>{const[a,n]=t.useState(0),m=t.useRef(0);t.useRef(0);const[r,l]=t.useState(null);let i=t.useRef(null);const o=s=>{m.current=s.touches[0].clientX},x=s=>{const c=s.changedTouches[0].clientX,v=m.current-c;v>50?n(g=>(g+1)%d.length):v<-50&&n(g=>(g-1+d.length)%d.length)};t.useEffect(()=>{l(d)},[]);const j=()=>{n(s=>s===0?r.length-1:s-1)},h=()=>{n(s=>s===r.length-1?0:s+1)},u=async()=>{i.current&&clearTimeout(i.current),h(),i.current=setTimeout(()=>{},15e3)},p=async()=>{i.current&&clearTimeout(i.current),j(),i.current=setTimeout(()=>{},15e3)};return t.useEffect(()=>{},[r]),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"relative",children:[e.jsx("div",{className:` w-full h-screen flex 
          overflow-hidden  bg-black z-[20]
          `,children:r==null?void 0:r.map((s,c)=>e.jsx("div",{className:`w-full h-full block 
                                        flex-shrink-0 flex-grow-0 
                                        transition-transform
                                        ease-in-out relative z-[20]
                                        duration-1000 cursor-pointer`,onTouchStart:o,onTouchEnd:x,style:{transform:`translateX(-${a*100}%)`},children:e.jsx("img",{src:s.img,alt:"",className:`object-cover w-full h-full 
                      block flex-shrink-0 flex-grow-0 transition-transform
                      ease-in-out duration-1000 z-[10] opacity-[70%] `},c)},c))}),e.jsxs("div",{className:"z-[300]",children:[e.jsx("button",{onMouseDown:p,className:`block absolute top-0 bottom-0 
                                                  z-[300] p-[1rem] cursor-pointer left-0 group h-full 
                                                        transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/30 rounded-full 
            place-content-center place-items-center group-hover:bg-white/30
            z-[300] transition duration-500 ease-in-out relative `,children:e.jsx(N,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})}),e.jsx("button",{onMouseDown:u,className:`block absolute top-0 bottom-0 
                                                        z-[300]    p-[1rem] cursor-pointer right-0 group 
                                                             transition duration-1000 ease-in-out`,children:e.jsx("div",{className:`w-[50px] h-[50px] bg-white/30 rounded-full 
            flex place-content-center place-items-center group-hover:bg-white/30
            z-[300]   transition duration-500 ease-in-out
            relative `,children:e.jsx(k,{className:" stroke-white fill-black w-[2rem] h-[2rem]"})})})]}),e.jsx("div",{className:` absolute top-0 w-full h-full
          flex place-content-center place-items-center px-[15px]`,children:e.jsxs("div",{className:` 
          max-w-[800px] mx-auto w-full z-[100]`,children:[e.jsx("div",{className:`text-center text-5xl text-white
                            font-extralight mb-[0px] tracking-wide font-poppins`,children:"Find The Best Businesses"}),e.jsx("div",{className:`text-center text-lg text-white
                            font-extralight mb-[20px]`,children:"Across Different Industries Around the World"}),e.jsx(C,{})]})})]})})},I=[{title:"Restaurants",link:"/web/search?q=restaurant",icon:e.jsx(S,{})},{title:"Shopping",link:"/web/search?q=shopping",icon:e.jsx(R,{})},{title:"Nightlife",link:"/web/search?q=nightlife",icon:e.jsx(T,{})},{title:"Entertainment",link:"/web/search?q=entertainment",icon:e.jsx(y,{})},{title:"Beauty & Spa",link:"/web/search?q=beauty and spa",icon:e.jsx(B,{})},{title:"Automotive",link:"/web/search?q=automotive",icon:e.jsx(E,{})},{title:"Home Services",link:"/web/search?q=home service",icon:e.jsx(H,{})},{title:"Real Estate",link:"/web/search?q=real estate",icon:e.jsx(z,{})}],$=()=>e.jsx("div",{className:"w-full relative mt-[50px] px-[15px]",children:e.jsxs("div",{className:"max-w-[1100px] mx-auto w-full",children:[e.jsx("div",{className:`relative font-sans text-2xl
        text-center font-black mb-8 border-b pb-5
        tracking-tight`,children:"Categories"}),e.jsx("div",{className:`grid grid-cols-2 gap-5
          sm:grid-cols-3 sm:gap-8
          lg:grid-cols-4 lg:gap-10`,children:I.map((a,n)=>e.jsx("div",{children:e.jsx(f,{to:`${a.link}`,children:e.jsxs("div",{className:`border-[1px] h-[140px] md:h-[200px]
                rounded hover:cursor-pointer border-gray-300
                hover:shadow-none flex flex-col
               place-items-center place-content-center
               gap-y-0 shadow-lg`,children:[e.jsx("div",{className:`text-[30px] w-12 h-12 rounded-full
                  flex place-items-center place-content-center
                  bg-gray-100`,children:a.icon}),e.jsx("div",{className:`text-base font-semibold
                  text-gray-500`,children:a.title})]})})},n))})]})}),se=()=>[{title:"Garssete | Business Directory, Travel, Real Estate, Hotels & Restaurants!"},{name:"Garssete",content:"Welcome to Garssete!"}],ae=()=>e.jsxs("div",{className:" h-screen ",children:[e.jsx("div",{className:"md:hidden",children:e.jsx(b,{})}),e.jsx("div",{className:"hidden md:block",children:e.jsx(A,{})}),e.jsx("div",{className:"",children:e.jsx(D,{})}),e.jsx(M,{category:"services",limit:8,title:"Recent Listings",subtitle:"Recent businesses or entities added by date."}),e.jsx("div",{className:"mt-[48px]"}),e.jsx(L,{}),e.jsx($,{}),e.jsx(q,{})]});export{ae as default,se as meta};

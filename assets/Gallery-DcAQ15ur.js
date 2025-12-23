import{j as s,r as t,L as b}from"./index-CGaEWVZp.js";const I=({images:a})=>s.jsx("div",{className:"gallery",children:a.map(o=>s.jsx("div",{className:"imgContainer",children:s.jsx("img",{src:`http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/public/images/${o.image}`})},o._id))}),v=()=>{const[a,o]=t.useState([]),[d,h]=t.useState(!0),[w,f]=t.useState(""),[g,y]=t.useState(0),m=t.useRef(a),c=t.useRef(g);m.current=a,c.current=g;const j={rootMargin:"0px 0px 400px 0px"},x=(p,n)=>{p.forEach(async e=>{if(e.isIntersecting){y(c.current+12);const i=await(await fetch("http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`{
              getNeos(first: 12, skip: ${c.current+12}) {
                _id,
                image
              }
            }`})})).json();o(m.current.concat(i.data.getNeos)),n.unobserve(e.target);const r=document.querySelectorAll(".imgContainer"),S=r[r.length-1];n.observe(S)}})},l=new IntersectionObserver(x,j);return t.useEffect(()=>{async function p(){const u=await(await fetch("http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/api/graphql",{method:"POST",headers:{"Content-Type":"application/json",Accept:"application/json"},body:JSON.stringify({query:`{
              getNeos(first: 12, skip: ${c.current}) {
                _id,
                image
              }
            }`})})).json();h(!1),o(u.data.getNeos);const i=document.querySelectorAll(".imgContainer"),r=i[i.length-1];return l.observe(r),r}let n;return p().then(e=>n=e).catch(e=>f(String(e))),()=>{n&&l.unobserve(n)}},[]),s.jsx(s.Fragment,{children:d?s.jsx(b,{}):s.jsx(I,{images:a})})};export{v as default};
//# sourceMappingURL=Gallery-DcAQ15ur.js.map

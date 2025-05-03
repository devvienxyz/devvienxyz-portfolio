import{s as d,j as o,T as g,f as x,r as i,a as h,m as p}from"./vendor-react-DHpJmzOT.js";import{U as y}from"./vendor-misc-C0wpLiRc.js";import{g as j}from"./vendor-three-DVtzbV9o.js";const w=d({lightDirection:new j(.5,1,.8)},`
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,`
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normalColor = normalize(vNormal) * 0.5 + 0.5;
      vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
      float lighting = max(dot(vNormal, lightDir), 0.0);
      vec3 finalColor = normalColor * lighting;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `),C="assets/fonts/jersey_15/Jersey 15_Regular.json",P={fontSize:1,position:[0,0,0],color:"white",height:.5,curveSegments:12,bevelEnabled:!1,bevelThickness:.05,bevelSize:.1,scale:.2};x({NormalColorMaterial:w});function b({text:e,textOptions:r={},withGlow:s=!1}){const t={...P,...r};return o.jsxs(g,{font:C,...t,children:[e,s?o.jsx("meshStandardMaterial",{color:"yellow",emissive:"cyan",emissiveIntensity:1,metalness:.3,roughness:.1}):o.jsx("meshNormalMaterial",{})]})}function l({targetPosition:e,position:r,label:s}){const t=i.useRef(),[v,a]=i.useState(!1),{camera:u}=h(),f=()=>{y.to(u.position,{x:e[0],y:e[1],z:e[2],duration:2,ease:"power2.inOut"})},c=()=>{f()},m=i.useCallback(n=>{(n.key==="Enter"||n.key===" ")&&c()},[c]);return i.useEffect(()=>{const n=t.current;if(n)return n.tabIndex=0,n.addEventListener("keydown",m),()=>n.removeEventListener("keydown",m)},[m]),o.jsx("mesh",{ref:t,position:r,onKeyUp:n=>{},onClick:c,onPointerOver:()=>a(!0),onPointerOut:()=>a(!1),onFocus:()=>a(!0),onBlur:()=>a(!1),children:o.jsx(b,{text:s,color:v?"yellow":""})})}function T({x:e=.5,y:r=0,z:s=2.5}){const t=i.useRef();return i.useEffect(()=>{t.current&&t.current.layers.set(0)},[]),o.jsxs(p.group,{ref:t,position:[e,r,s],rotation:[0,-.7,0],renderOrder:100,children:[o.jsx(l,{targetPosition:[2,1,5],position:[e,1.2,0],label:"About"}),o.jsx(l,{targetPosition:[3,1,4],position:[e,.9,0],label:"Projects"}),o.jsx(l,{targetPosition:[4,1,3],position:[e,.6,0],label:"Experiences"}),o.jsx(l,{targetPosition:[5,1,2],position:[e,.3,0],label:"Contact"})]})}export{T as default};

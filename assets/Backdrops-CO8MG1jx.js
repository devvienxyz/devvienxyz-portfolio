import{r as e,j as a,S as o,s as n,f as i}from"./vendor-react-DHpJmzOT.js";import{x as s,e as t}from"./vendor-three-DVtzbV9o.js";import"./vendor-misc-C0wpLiRc.js";const l=n({uColor:new t(0),uOpacity:.5},`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `,`
    varying vec2 vUv;
    uniform vec3 uColor;
    uniform float uOpacity;
    void main() {
      float alpha = (1.0 - vUv.y) * uOpacity; // Control transparency
      gl_FragColor = vec4(uColor, alpha);
    }
  `);i({GradientMaterial:l});function d(){const r=e.useRef();return e.useEffect(()=>{r.current&&r.current.layers.set(1)},[]),a.jsx(o,{ref:r,renderOrder:-10,children:a.jsx("gradientMaterial",{transparent:!0,uColor:new t(16711680),depthWrite:!1,depthTest:!1,uOpacity:.3,blending:s})})}export{d as default};

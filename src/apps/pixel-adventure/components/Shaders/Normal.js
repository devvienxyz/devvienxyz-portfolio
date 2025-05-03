import { shaderMaterial } from "@react-three/drei";
import { Vector3 } from "three/webgpu";

const NormalColorMaterial = shaderMaterial(
	{
		lightDirection: new Vector3(0.5, 1.0, 0.8),
	},
	`
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vNormal = normalize(normalMatrix * normal);
      vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
      vViewPosition = -mvPosition.xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
	`
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normalColor = normalize(vNormal) * 0.5 + 0.5;
      vec3 lightDir = normalize(vec3(0.5, 1.0, 0.8));
      float lighting = max(dot(vNormal, lightDir), 0.0);
      vec3 finalColor = normalColor * lighting;
      gl_FragColor = vec4(finalColor, 1.0);
    }
  `,
);

export default NormalColorMaterial;

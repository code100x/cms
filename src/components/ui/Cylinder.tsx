import React, { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Cylinder: React.FC = () => {
  // Load texture from file
  const tex = useTexture('./newcover.png');

  // Create a reference to the mesh; it's typed as THREE.Mesh or null
  const cyl = useRef<THREE.Mesh>(null);

  // Rotate the cylinder on each frame
  useFrame((state, delta) => {
    if (cyl.current) {
      cyl.current.rotation.y += delta;
    }
  });

  return (
    <group rotation={[0, 0, 0.5]}>
      <mesh ref={cyl}>
        <cylinderGeometry args={[1, 1, 1, 60, 60, true]} />
        <meshStandardMaterial 
          map={tex} 
          transparent 
          side={THREE.DoubleSide} 
        />
      </mesh>
    </group>
  );
};

export default Cylinder;

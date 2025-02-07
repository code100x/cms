import React, { useRef } from 'react';
import { useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Cylinder: React.FC = () => {
  const tex = useTexture('./newcover.png');

  const cyl = useRef<THREE.Mesh>(null);

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

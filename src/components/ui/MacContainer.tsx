import { useGLTF, useScroll, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { FC } from 'react';
import * as THREE from 'three';

const MacContainer: FC = () => {
  // Load the GLTF model and texture.
  const model = useGLTF('./mac.glb') as any;
  const tex = useTexture('./maccover.png') as THREE.Texture;
  const mashes: Record<string, THREE.Object3D> = {};
  model.scene.traverse((e:any) => {
    if (e.name) {
      mashes[e.name] = e;
    }
  });
  if (mashes.screen) {
    mashes.screen.rotation.x = THREE.MathUtils.degToRad(180);
  }
  if (
    mashes.matte &&
    (mashes.matte as THREE.Mesh).material instanceof THREE.MeshStandardMaterial
  ) {
    const matteMesh = mashes.matte as THREE.Mesh;
    const matteMaterial = matteMesh.material as THREE.MeshStandardMaterial;
    matteMaterial.map = tex;
    matteMaterial.emissiveIntensity = 0;
    matteMaterial.metalness = 0;
    matteMaterial.roughness = 0;
    matteMaterial.needsUpdate = true;
  }

  const data = useScroll();
  useFrame(() => {
    if (mashes.screen) {
      mashes.screen.rotation.x = THREE.MathUtils.degToRad(180 - data.offset * 90);
    }
  });

  return (
    <group position={[0, -7, -5]}>
      <primitive object={model.scene} />
    </group>
  );
};

export default MacContainer;

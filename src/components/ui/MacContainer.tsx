import { useGLTF, useScroll, useTexture } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import React, { FC } from 'react';
import * as THREE from 'three';

const MacContainer: FC = () => {
  // Load the GLTF model and texture.
  const model = useGLTF('./mac.glb') as any;
  const tex = useTexture('./maccover.png') as THREE.Texture;

  // Create a record to store objects by name.
  const mashes: Record<string, THREE.Object3D> = {};

  // Traverse the scene and store each object by its name.
  model.scene.traverse((e:any) => {
    if (e.name) {
      mashes[e.name] = e;
    }
  });

  // Adjust the "screen" object's rotation if it exists.
  if (mashes.screen) {
    mashes.screen.rotation.x = THREE.MathUtils.degToRad(180);
  }

  // For the "matte" object, adjust its material properties.
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
    matteMaterial.needsUpdate = true; // Ensure the material updates
  }

  // Get the scroll data from the hook.
  const data = useScroll();

  // Update the screen rotation on each frame based on scroll offset.
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

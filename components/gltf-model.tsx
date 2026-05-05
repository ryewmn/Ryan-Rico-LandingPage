"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";

export function GLTFModel({
  src,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
}: {
  src: string;
  scale?: number | [number, number, number];
  position?: [number, number, number];
  rotation?: [number, number, number];
}) {
  const { scene } = useGLTF(src);

  // Clone once per src so multiple instances don't share mutations.
  const cloned = useMemo(() => scene.clone(true), [scene]);

  useEffect(() => {
    cloned.traverse((child) => {
      const m = child as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
  }, [cloned]);

  return (
    <primitive
      object={cloned}
      scale={scale}
      position={position}
      rotation={rotation}
    />
  );
}

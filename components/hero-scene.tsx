"use client";

import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function DistortedSphere() {
  const mesh = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const { x, y } = state.pointer;

    if (mesh.current) {
      mesh.current.rotation.y = t * 0.15 + x * 0.4;
      mesh.current.rotation.x = -y * 0.3;
    }
    if (inner.current) {
      inner.current.rotation.y = -t * 0.3;
      inner.current.rotation.x = t * 0.2;
    }
  });

  return (
    <Float speed={1.4} rotationIntensity={0.5} floatIntensity={1.2}>
      <mesh ref={mesh} scale={1.4}>
        <icosahedronGeometry args={[1, 64]} />
        <MeshDistortMaterial
          color="#0a0a0a"
          roughness={0.18}
          metalness={0.9}
          distort={0.42}
          speed={1.6}
          envMapIntensity={1.4}
        />
      </mesh>

      <mesh ref={inner} scale={0.62}>
        <icosahedronGeometry args={[1, 4]} />
        <meshStandardMaterial
          color="#EB0A1E"
          roughness={0.35}
          metalness={0.6}
          emissive="#EB0A1E"
          emissiveIntensity={0.35}
          wireframe
        />
      </mesh>
    </Float>
  );
}

function Rig() {
  useFrame((state, delta) => {
    state.camera.position.lerp(
      new THREE.Vector3(state.pointer.x * 0.4, state.pointer.y * 0.3, 4),
      Math.min(1, delta * 2)
    );
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#000000"]} />

        <ambientLight intensity={0.25} />
        <directionalLight position={[3, 4, 5]} intensity={1.1} />
        <pointLight position={[4, 2, 3]} intensity={28} color="#EB0A1E" distance={10} />
        <pointLight position={[-3, -2, -2]} intensity={18} color="#3b82f6" distance={10} />
        <pointLight position={[0, -3, 2]} intensity={10} color="#ffffff" distance={8} />

        <DistortedSphere />

        <Sparkles
          count={60}
          scale={6}
          size={2}
          speed={0.4}
          opacity={0.7}
          color="#ff5566"
        />

        <Rig />
      </Suspense>
    </Canvas>
  );
}

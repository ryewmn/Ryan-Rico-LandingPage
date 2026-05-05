"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, Float, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";

type HotspotKey = "pc" | "legos" | "gundam" | "toyota" | "phone";

const labels: Record<HotspotKey, { title: string; sub: string }> = {
  pc: { title: "PC", sub: "Projects" },
  legos: { title: "Legos", sub: "Current Work" },
  gundam: { title: "Gundam", sub: "Builds · Instagram" },
  toyota: { title: "Toyota", sub: "About" },
  phone: { title: "Phone", sub: "Contact" },
};

function Hotspot({
  position,
  scale,
  color,
  hotspotKey,
  hovered,
  setHovered,
  onSelect,
  children,
}: {
  position: [number, number, number];
  scale: [number, number, number];
  color: string;
  hotspotKey: HotspotKey;
  hovered: HotspotKey | null;
  setHovered: (k: HotspotKey | null) => void;
  onSelect?: (k: HotspotKey) => void;
  children?: React.ReactNode;
}) {
  const ref = useRef<THREE.Group>(null);
  const isActive = hovered === hotspotKey;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = isActive ? 1.06 : 1;
    ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, target, delta * 8);
    ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, target, delta * 8);
    ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, target, delta * 8);
  });

  const handleOver = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(hotspotKey);
    document.body.style.cursor = "pointer";
  };
  const handleOut = () => {
    setHovered(null);
    document.body.style.cursor = "default";
  };
  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    onSelect?.(hotspotKey);
  };

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={handleOver}
      onPointerOut={handleOut}
      onClick={handleClick}
    >
      <mesh castShadow receiveShadow scale={scale}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial
          color={color}
          roughness={0.45}
          metalness={0.25}
          emissive={isActive ? color : "#000000"}
          emissiveIntensity={isActive ? 0.35 : 0}
        />
      </mesh>
      {children}
      {isActive ? (
        <Html
          center
          distanceFactor={6}
          position={[0, scale[1] / 2 + 0.6, 0]}
          zIndexRange={[0, 10]}
          wrapperClass="pointer-events-none"
        >
          <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/20 bg-black/80 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white backdrop-blur">
            <span className="text-ember">{labels[hotspotKey].title}</span>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/70">{labels[hotspotKey].sub}</span>
          </div>
        </Html>
      ) : null}
    </group>
  );
}

function PCMonitor({ hovered, setHovered, onSelect }: ScenePropsBase) {
  return (
    <group position={[-1.6, 0, -0.8]}>
      {/* Tower */}
      <Hotspot
        hotspotKey="pc"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[0, 0.5, 0]}
        scale={[0.55, 1, 0.5]}
        color="#1a1a1a"
      >
        <mesh position={[0, 0.2, 0.255]} castShadow>
          <planeGeometry args={[0.1, 0.1]} />
          <meshStandardMaterial
            color="#FF6B1A"
            emissive="#FF6B1A"
            emissiveIntensity={2}
          />
        </mesh>
      </Hotspot>
      {/* Monitor */}
      <Hotspot
        hotspotKey="pc"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[0.8, 0.9, 0]}
        scale={[1.1, 0.7, 0.05]}
        color="#0a0a0a"
      >
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[1.05, 0.65]} />
          <meshBasicMaterial color="#FF6B1A" />
        </mesh>
        <mesh position={[0, -0.45, 0]}>
          <boxGeometry args={[0.08, 0.2, 0.06]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[0, -0.58, 0.05]}>
          <boxGeometry args={[0.5, 0.04, 0.25]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
      </Hotspot>
    </group>
  );
}

function ToyotaCar({ hovered, setHovered, onSelect }: ScenePropsBase) {
  return (
    <group position={[1.6, 0.18, 0.8]} rotation={[0, -0.3, 0]}>
      {/* Body */}
      <Hotspot
        hotspotKey="toyota"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[0, 0.18, 0]}
        scale={[1.4, 0.32, 0.7]}
        color="#EB0A1E"
      />
      {/* Cabin */}
      <Hotspot
        hotspotKey="toyota"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[-0.05, 0.5, 0]}
        scale={[0.85, 0.32, 0.6]}
        color="#C00818"
      >
        <mesh position={[0, 0, 0.31]}>
          <planeGeometry args={[0.7, 0.22]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
      </Hotspot>
      {/* Wheels */}
      {[
        [-0.5, 0, 0.36],
        [0.5, 0, 0.36],
        [-0.5, 0, -0.36],
        [0.5, 0, -0.36],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]} castShadow>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 24]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function GundamFigure({ hovered, setHovered, onSelect }: ScenePropsBase) {
  return (
    <group position={[0.4, 0, -1.2]}>
      {/* Body */}
      <Hotspot
        hotspotKey="gundam"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[0, 0.7, 0]}
        scale={[0.45, 0.55, 0.3]}
        color="#f5f5f5"
      />
      {/* Head */}
      <Hotspot
        hotspotKey="gundam"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[0, 1.13, 0]}
        scale={[0.28, 0.28, 0.28]}
        color="#ffffff"
      >
        <mesh position={[0, 0.05, 0.145]}>
          <planeGeometry args={[0.15, 0.04]} />
          <meshStandardMaterial
            color="#FF6B1A"
            emissive="#FF6B1A"
            emissiveIntensity={2}
          />
        </mesh>
        <mesh position={[0, 0.155, -0.08]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.04, 0.18, 4]} />
          <meshStandardMaterial color="#EB0A1E" />
        </mesh>
      </Hotspot>
      {/* Arms */}
      <Hotspot
        hotspotKey="gundam"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[-0.32, 0.7, 0]}
        scale={[0.18, 0.5, 0.2]}
        color="#EB0A1E"
      />
      <Hotspot
        hotspotKey="gundam"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[0.32, 0.7, 0]}
        scale={[0.18, 0.5, 0.2]}
        color="#0058a8"
      />
      {/* Legs */}
      <Hotspot
        hotspotKey="gundam"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[-0.13, 0.21, 0]}
        scale={[0.2, 0.45, 0.22]}
        color="#0058a8"
      />
      <Hotspot
        hotspotKey="gundam"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[0.13, 0.21, 0]}
        scale={[0.2, 0.45, 0.22]}
        color="#0058a8"
      />
    </group>
  );
}

function LegoPile({ hovered, setHovered, onSelect }: ScenePropsBase) {
  const colors = ["#EB0A1E", "#FFB800", "#0058a8", "#00a651", "#FF6B1A", "#ffffff"];
  const bricks = [
    { p: [-0.3, 0.05, 0], s: [0.5, 0.16, 0.32], c: 0 },
    { p: [0.05, 0.05, -0.18], s: [0.3, 0.16, 0.3], c: 1 },
    { p: [0.25, 0.21, -0.05], s: [0.34, 0.16, 0.34], c: 2 },
    { p: [-0.18, 0.21, 0.18], s: [0.3, 0.16, 0.3], c: 3 },
    { p: [0.05, 0.37, 0.05], s: [0.35, 0.16, 0.35], c: 4 },
    { p: [0.42, 0.05, 0.18], s: [0.3, 0.16, 0.3], c: 5 },
  ];
  return (
    <group position={[-1.6, 0, 1.2]}>
      {bricks.map((b, i) => (
        <group key={i}>
          <Hotspot
            hotspotKey="legos"
            hovered={hovered}
            setHovered={setHovered}
            onSelect={onSelect}
            position={b.p as [number, number, number]}
            scale={b.s as [number, number, number]}
            color={colors[b.c]}
          />
          {/* studs */}
          {[
            [-b.s[0] / 4, b.s[1] / 2 + 0.04, -b.s[2] / 4],
            [b.s[0] / 4, b.s[1] / 2 + 0.04, -b.s[2] / 4],
            [-b.s[0] / 4, b.s[1] / 2 + 0.04, b.s[2] / 4],
            [b.s[0] / 4, b.s[1] / 2 + 0.04, b.s[2] / 4],
          ].map(([x, y, z], si) => (
            <mesh
              key={si}
              position={[b.p[0] + x, b.p[1] + y, b.p[2] + z]}
              rotation={[Math.PI / 2, 0, 0]}
            >
              <cylinderGeometry args={[0.05, 0.05, 0.05, 16]} />
              <meshStandardMaterial color={colors[b.c]} roughness={0.4} />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
}

function Phone({ hovered, setHovered, onSelect }: ScenePropsBase) {
  return (
    <group position={[0.95, 0.93, 0.05]} rotation={[Math.PI / 8, -0.2, 0]}>
      <Hotspot
        hotspotKey="phone"
        hovered={hovered}
        setHovered={setHovered}
        onSelect={onSelect}
        position={[0, 0, 0]}
        scale={[0.34, 0.7, 0.04]}
        color="#1a1a1a"
      >
        <mesh position={[0, 0, 0.024]}>
          <planeGeometry args={[0.3, 0.62]} />
          <meshBasicMaterial color="#FF6B1A" />
        </mesh>
      </Hotspot>
    </group>
  );
}

function Desk() {
  return (
    <group position={[-0.4, 0, -0.4]}>
      {/* Top */}
      <mesh receiveShadow castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[3.2, 0.06, 1.4]} />
        <meshStandardMaterial color="#3b2618" roughness={0.7} />
      </mesh>
      {/* Legs */}
      {[
        [-1.5, 0, -0.6],
        [1.5, 0, -0.6],
        [-1.5, 0, 0.6],
        [1.5, 0, 0.6],
      ].map(([x, y, z], i) => (
        <mesh key={i} position={[x, 0.2, z]}>
          <boxGeometry args={[0.08, 0.4, 0.08]} />
          <meshStandardMaterial color="#2a1a10" roughness={0.7} />
        </mesh>
      ))}
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]} receiveShadow>
      <planeGeometry args={[14, 14]} />
      <meshStandardMaterial color="#0e0e10" roughness={0.95} />
    </mesh>
  );
}

function CameraRig() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(
      state.camera.position.x,
      4 + x * 0.6,
      0.04
    );
    state.camera.position.y = THREE.MathUtils.lerp(
      state.camera.position.y,
      3.4 + y * 0.3,
      0.04
    );
    state.camera.lookAt(0, 0.5, 0);
  });
  return null;
}

type ScenePropsBase = {
  hovered: HotspotKey | null;
  setHovered: (k: HotspotKey | null) => void;
  onSelect?: (k: HotspotKey) => void;
};

export default function RoomScene({
  onSelect,
}: {
  onSelect?: (k: HotspotKey) => void;
}) {
  const [hovered, setHovered] = useState<HotspotKey | null>(null);

  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [4, 3.4, 5], fov: 38 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <color attach="background" args={["#0a0a0a"]} />
        <fog attach="fog" args={["#0a0a0a", 8, 18]} />

        {/* Lights */}
        <ambientLight intensity={0.35} />
        <directionalLight
          position={[4, 6, 3]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-3, 2, 2]} intensity={20} color="#EB0A1E" distance={8} />
        <pointLight position={[3, 2, -2]} intensity={22} color="#FF6B1A" distance={9} />

        <Float speed={0.6} floatIntensity={0.15} rotationIntensity={0}>
          <group>
            <Floor />
            <Desk />
            <PCMonitor hovered={hovered} setHovered={setHovered} onSelect={onSelect} />
            <ToyotaCar hovered={hovered} setHovered={setHovered} onSelect={onSelect} />
            <GundamFigure hovered={hovered} setHovered={setHovered} onSelect={onSelect} />
            <LegoPile hovered={hovered} setHovered={setHovered} onSelect={onSelect} />
            <Phone hovered={hovered} setHovered={setHovered} onSelect={onSelect} />
          </group>
        </Float>

        <ContactShadows
          position={[0, 0.001, 0]}
          opacity={0.55}
          scale={10}
          blur={2.5}
          far={4}
        />
        <Environment preset="warehouse" />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}

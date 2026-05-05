"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { Html, Float, ContactShadows, Environment } from "@react-three/drei";
import * as THREE from "three";
import { GLTFModel } from "@/components/gltf-model";

export type HotspotKey = "pc" | "legos" | "gundam" | "toyota" | "phone";

export const HOTSPOT_LABELS: Record<HotspotKey, { title: string; sub: string }> = {
  pc: { title: "PC", sub: "Projects" },
  legos: { title: "Legos", sub: "Current Work" },
  gundam: { title: "Gundam", sub: "Builds · Instagram" },
  toyota: { title: "Toyota", sub: "About" },
  phone: { title: "Phone", sub: "Contact" },
};

const OVERVIEW_CAMERA = {
  pos: new THREE.Vector3(4, 3.4, 5),
  target: new THREE.Vector3(0, 0.5, 0),
};

const FOCUS_CAMERA: Record<HotspotKey, { pos: THREE.Vector3; target: THREE.Vector3 }> = {
  pc: {
    pos: new THREE.Vector3(-0.2, 1.4, 1.6),
    target: new THREE.Vector3(-1.1, 0.95, -0.8),
  },
  toyota: {
    pos: new THREE.Vector3(3.2, 1.1, 2.5),
    target: new THREE.Vector3(1.6, 0.4, 0.8),
  },
  gundam: {
    pos: new THREE.Vector3(1.8, 1.3, 0.6),
    target: new THREE.Vector3(0.4, 0.85, -1.2),
  },
  legos: {
    pos: new THREE.Vector3(-0.4, 1.1, 2.6),
    target: new THREE.Vector3(-1.6, 0.25, 1.2),
  },
  phone: {
    pos: new THREE.Vector3(2.2, 1.6, 1.6),
    target: new THREE.Vector3(0.95, 0.93, 0.05),
  },
};

type ScenePropsBase = {
  hovered: HotspotKey | null;
  setHovered: (k: HotspotKey | null) => void;
  onSelect?: (k: HotspotKey) => void;
};

/** Wraps a sub-tree of meshes as ONE hotspot (hover/click on any child triggers the whole). */
function HotspotGroup({
  position,
  rotation,
  hotspotKey,
  hovered,
  setHovered,
  onSelect,
  labelOffsetY = 0.6,
  children,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  hotspotKey: HotspotKey;
  labelOffsetY?: number;
  children?: React.ReactNode;
} & ScenePropsBase) {
  const ref = useRef<THREE.Group>(null);
  const isActive = hovered === hotspotKey;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = isActive ? 1.04 : 1;
    const k = Math.min(1, delta * 8);
    ref.current.scale.x = THREE.MathUtils.lerp(ref.current.scale.x, target, k);
    ref.current.scale.y = THREE.MathUtils.lerp(ref.current.scale.y, target, k);
    ref.current.scale.z = THREE.MathUtils.lerp(ref.current.scale.z, target, k);
  });

  return (
    <group
      ref={ref}
      position={position}
      rotation={rotation}
      onPointerOver={(e: ThreeEvent<PointerEvent>) => {
        e.stopPropagation();
        setHovered(hotspotKey);
        document.body.style.cursor = "pointer";
      }}
      onPointerOut={() => {
        setHovered(null);
        document.body.style.cursor = "default";
      }}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        onSelect?.(hotspotKey);
      }}
    >
      {children}
      {isActive ? (
        <Html
          center
          distanceFactor={6}
          position={[0, labelOffsetY, 0]}
          zIndexRange={[0, 10]}
          wrapperClass="pointer-events-none"
        >
          <div className="pointer-events-none whitespace-nowrap rounded-full border border-white/20 bg-black/80 px-3 py-1 text-[11px] font-mono uppercase tracking-[0.18em] text-white backdrop-blur">
            <span className="text-ember">{HOTSPOT_LABELS[hotspotKey].title}</span>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/70">
              {HOTSPOT_LABELS[hotspotKey].sub}
            </span>
          </div>
        </Html>
      ) : null}
    </group>
  );
}

/* ─────────────────────────  PC  ───────────────────────── */

function PCMonitor(props: ScenePropsBase) {
  return (
    <HotspotGroup {...props} hotspotKey="pc" position={[-1.6, 0, -0.8]} labelOffsetY={1.7}>
      {/* Tower body — under-desk */}
      <group position={[0, 0.5, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.55, 1, 0.5]} />
          <meshStandardMaterial color="#0e0e0e" roughness={0.4} metalness={0.4} />
        </mesh>
        {/* Tempered glass side panel showing internals */}
        <mesh position={[0.276, 0, 0]}>
          <planeGeometry args={[0.5, 0.95]} />
          <meshStandardMaterial
            color="#0a0a14"
            transparent
            opacity={0.6}
            roughness={0.05}
            metalness={0.9}
          />
        </mesh>
        {/* Motherboard plane */}
        <mesh position={[0.27, 0, 0]}>
          <planeGeometry args={[0.42, 0.85]} />
          <meshStandardMaterial color="#0d2818" roughness={0.6} />
        </mesh>
        {/* GPU horizontal */}
        <mesh position={[0.272, -0.05, 0]} castShadow>
          <boxGeometry args={[0.02, 0.12, 0.4]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* GPU RGB strip */}
        <mesh position={[0.283, -0.05, 0]}>
          <boxGeometry args={[0.005, 0.02, 0.36]} />
          <meshStandardMaterial color="#FF6B1A" emissive="#FF6B1A" emissiveIntensity={2.4} />
        </mesh>
        {/* Top RAM sticks */}
        {[0, 1, 2, 3].map((i) => (
          <mesh key={i} position={[0.275, 0.18, -0.12 + i * 0.06]}>
            <boxGeometry args={[0.015, 0.12, 0.02]} />
            <meshStandardMaterial color="#1a1a1a" />
          </mesh>
        ))}
        {/* Power LED on front */}
        <mesh position={[0, 0.42, 0.252]}>
          <circleGeometry args={[0.012, 16]} />
          <meshStandardMaterial color="#FF6B1A" emissive="#FF6B1A" emissiveIntensity={3} />
        </mesh>
        {/* Front intake mesh */}
        <mesh position={[0, 0.15, 0.252]}>
          <planeGeometry args={[0.4, 0.5]} />
          <meshStandardMaterial color="#050505" roughness={0.9} />
        </mesh>
      </group>

      {/* Monitor — sitting on desk */}
      <group position={[0.85, 0.9, 0]}>
        {/* Display */}
        <mesh castShadow>
          <boxGeometry args={[1.15, 0.72, 0.05]} />
          <meshStandardMaterial color="#050505" roughness={0.45} metalness={0.5} />
        </mesh>
        {/* Screen content (orange terminal vibe) */}
        <mesh position={[0, 0, 0.026]}>
          <planeGeometry args={[1.08, 0.66]} />
          <meshBasicMaterial color="#1a0d05" />
        </mesh>
        {/* Mock UI lines on screen */}
        {[0.22, 0.14, 0.06, -0.02, -0.1, -0.18].map((y, i) => (
          <mesh key={i} position={[-0.28 + (i % 2) * 0.1, y, 0.027]}>
            <planeGeometry args={[0.42 - (i * 0.04), 0.018]} />
            <meshBasicMaterial color={i === 0 ? "#FF6B1A" : "#7a4020"} />
          </mesh>
        ))}
        {/* Cursor block */}
        <mesh position={[0.18, -0.18, 0.027]}>
          <planeGeometry args={[0.022, 0.025]} />
          <meshBasicMaterial color="#FF6B1A" />
        </mesh>
        {/* Branding bezel light */}
        <mesh position={[0, -0.32, 0.027]}>
          <planeGeometry args={[0.06, 0.008]} />
          <meshStandardMaterial color="#FF6B1A" emissive="#FF6B1A" emissiveIntensity={2} />
        </mesh>

        {/* Stand neck */}
        <mesh position={[0, -0.45, 0]} castShadow>
          <boxGeometry args={[0.06, 0.22, 0.06]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
        </mesh>
        {/* Stand base */}
        <mesh position={[0, -0.58, 0.05]} castShadow>
          <cylinderGeometry args={[0.18, 0.22, 0.04, 24]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.5} />
        </mesh>
      </group>

      {/* Keyboard on desk */}
      <group position={[0.85, 0.46, 0.55]}>
        <mesh castShadow>
          <boxGeometry args={[0.95, 0.04, 0.32]} />
          <meshStandardMaterial color="#0c0c0c" roughness={0.5} />
        </mesh>
        {/* Key grid */}
        {Array.from({ length: 5 }).map((_, row) =>
          Array.from({ length: 14 }).map((__, col) => (
            <mesh
              key={`k-${row}-${col}`}
              position={[
                -0.42 + col * 0.06,
                0.024,
                -0.11 + row * 0.06,
              ]}
            >
              <boxGeometry args={[0.05, 0.012, 0.05]} />
              <meshStandardMaterial color="#1a1a1a" />
            </mesh>
          ))
        )}
        {/* Underglow */}
        <mesh position={[0, -0.005, 0]}>
          <boxGeometry args={[0.97, 0.005, 0.34]} />
          <meshStandardMaterial color="#FF6B1A" emissive="#FF6B1A" emissiveIntensity={1.4} />
        </mesh>
      </group>

      {/* Mouse */}
      <group position={[1.55, 0.45, 0.6]}>
        <mesh castShadow>
          <boxGeometry args={[0.12, 0.04, 0.18]} />
          <meshStandardMaterial color="#0c0c0c" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.024, 0]}>
          <planeGeometry args={[0.04, 0.04]} />
          <meshStandardMaterial color="#FF6B1A" emissive="#FF6B1A" emissiveIntensity={2} />
        </mesh>
      </group>
    </HotspotGroup>
  );
}

/* ─────────────────────────  TOYOTA TACOMA  ───────────────────────── */

function ToyotaCar(props: ScenePropsBase) {
  return (
    <HotspotGroup
      {...props}
      hotspotKey="toyota"
      position={[1.6, 0, 0.8]}
      rotation={[0, -0.35, 0]}
      labelOffsetY={1.1}
    >
      <group position={[0, 0.18, 0]}>
        {/* Lower body / chassis */}
        <mesh castShadow position={[0, 0.05, 0]}>
          <boxGeometry args={[1.6, 0.16, 0.78]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
        </mesh>
        {/* Main body — Tacoma red */}
        <mesh castShadow position={[0, 0.22, 0]}>
          <boxGeometry args={[1.55, 0.22, 0.74]} />
          <meshStandardMaterial color="#EB0A1E" roughness={0.45} metalness={0.35} />
        </mesh>
        {/* Hood (front lower than cab) */}
        <mesh castShadow position={[-0.55, 0.36, 0]}>
          <boxGeometry args={[0.5, 0.1, 0.7]} />
          <meshStandardMaterial color="#EB0A1E" roughness={0.45} metalness={0.35} />
        </mesh>
        {/* Cab */}
        <mesh castShadow position={[0.05, 0.5, 0]}>
          <boxGeometry args={[0.7, 0.32, 0.66]} />
          <meshStandardMaterial color="#C00818" roughness={0.45} metalness={0.35} />
        </mesh>
        {/* Cab roof — slight forward slope via two boxes */}
        <mesh castShadow position={[0.05, 0.66, 0]}>
          <boxGeometry args={[0.65, 0.04, 0.6]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.55} />
        </mesh>
        {/* Bed */}
        <mesh castShadow position={[0.55, 0.36, 0]}>
          <boxGeometry args={[0.6, 0.1, 0.7]} />
          <meshStandardMaterial color="#EB0A1E" roughness={0.45} metalness={0.35} />
        </mesh>
        {/* Bed bay (open top) — darker inset */}
        <mesh position={[0.55, 0.38, 0]}>
          <boxGeometry args={[0.55, 0.005, 0.62]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Windshield (front) */}
        <mesh position={[-0.32, 0.55, 0]} rotation={[0, 0, -0.35]}>
          <planeGeometry args={[0.18, 0.32]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
        </mesh>
        {/* Side windows */}
        <mesh position={[0.05, 0.55, 0.331]}>
          <planeGeometry args={[0.62, 0.22]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh position={[0.05, 0.55, -0.331]} rotation={[0, Math.PI, 0]}>
          <planeGeometry args={[0.62, 0.22]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Headlights */}
        <mesh position={[-0.8, 0.32, 0.22]}>
          <boxGeometry args={[0.02, 0.08, 0.18]} />
          <meshStandardMaterial color="#fff5d6" emissive="#fff5d6" emissiveIntensity={2.5} />
        </mesh>
        <mesh position={[-0.8, 0.32, -0.22]}>
          <boxGeometry args={[0.02, 0.08, 0.18]} />
          <meshStandardMaterial color="#fff5d6" emissive="#fff5d6" emissiveIntensity={2.5} />
        </mesh>
        {/* Grille slats */}
        {[-0.06, -0.02, 0.02, 0.06].map((y, i) => (
          <mesh key={i} position={[-0.79, 0.28 + y, 0]}>
            <boxGeometry args={[0.015, 0.018, 0.46]} />
            <meshStandardMaterial color="#0a0a0a" roughness={0.6} />
          </mesh>
        ))}
        {/* TOYOTA bar / oval emblem */}
        <mesh position={[-0.79, 0.28, 0]}>
          <boxGeometry args={[0.018, 0.06, 0.13]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} />
        </mesh>

        {/* Tail lights */}
        <mesh position={[0.85, 0.36, 0.27]}>
          <boxGeometry args={[0.02, 0.08, 0.12]} />
          <meshStandardMaterial color="#7a0a14" emissive="#EB0A1E" emissiveIntensity={1.5} />
        </mesh>
        <mesh position={[0.85, 0.36, -0.27]}>
          <boxGeometry args={[0.02, 0.08, 0.12]} />
          <meshStandardMaterial color="#7a0a14" emissive="#EB0A1E" emissiveIntensity={1.5} />
        </mesh>

        {/* Side mirrors */}
        <mesh position={[-0.2, 0.5, 0.36]}>
          <boxGeometry args={[0.04, 0.06, 0.04]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        <mesh position={[-0.2, 0.5, -0.36]}>
          <boxGeometry args={[0.04, 0.06, 0.04]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>

        {/* Wheel wells (dark cutouts) */}
        {[
          [-0.5, -0.04, 0.4],
          [0.55, -0.04, 0.4],
          [-0.5, -0.04, -0.4],
          [0.55, -0.04, -0.4],
        ].map(([x, y, z], i) => (
          <mesh
            key={`well-${i}`}
            position={[x, y, z]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.21, 0.21, 0.04, 24]} />
            <meshStandardMaterial color="#050505" />
          </mesh>
        ))}
        {/* Wheels (tire + rim) */}
        {[
          [-0.5, -0.05, 0.42],
          [0.55, -0.05, 0.42],
          [-0.5, -0.05, -0.42],
          [0.55, -0.05, -0.42],
        ].map(([x, y, z], i) => (
          <group key={`w-${i}`} position={[x, y, z]} rotation={[Math.PI / 2, 0, 0]}>
            <mesh castShadow>
              <cylinderGeometry args={[0.19, 0.19, 0.13, 28]} />
              <meshStandardMaterial color="#0a0a0a" roughness={0.85} />
            </mesh>
            <mesh position={[0, 0.07, 0]}>
              <cylinderGeometry args={[0.11, 0.11, 0.005, 20]} />
              <meshStandardMaterial color="#9a9a9a" roughness={0.3} metalness={0.85} />
            </mesh>
          </group>
        ))}
      </group>
    </HotspotGroup>
  );
}

/* ─────────────────────────  GUNDAM (RX-78-style)  ───────────────────────── */

function GundamFigure(props: ScenePropsBase) {
  // Gundam standard palette
  const WHITE = "#f5f5f5";
  const BLUE = "#1f3d7a";
  const RED = "#c8141d";
  const YELLOW = "#f3c01b";
  const DARK = "#1a1a1a";
  const VISOR = "#3dd17a";

  return (
    <HotspotGroup
      {...props}
      hotspotKey="gundam"
      position={[0.4, 0, -1.2]}
      rotation={[0, 0.18, 0]}
      labelOffsetY={1.85}
    >
      {/* ────── Legs (stand on floor) ────── */}
      {/* Foot armor */}
      {[-0.16, 0.16].map((x, i) => (
        <group key={`foot-${i}`} position={[x, 0.05, 0.05]}>
          <mesh castShadow>
            <boxGeometry args={[0.2, 0.08, 0.32]} />
            <meshStandardMaterial color={WHITE} roughness={0.45} metalness={0.25} />
          </mesh>
          {/* Toe accent yellow */}
          <mesh position={[0, 0, 0.16]}>
            <boxGeometry args={[0.18, 0.05, 0.02]} />
            <meshStandardMaterial color={YELLOW} roughness={0.4} />
          </mesh>
        </group>
      ))}
      {/* Shins */}
      {[-0.16, 0.16].map((x, i) => (
        <group key={`shin-${i}`} position={[x, 0.28, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.22, 0.4, 0.22]} />
            <meshStandardMaterial color={WHITE} roughness={0.45} metalness={0.25} />
          </mesh>
          {/* Knee guard */}
          <mesh position={[0, 0.18, 0.115]}>
            <boxGeometry args={[0.15, 0.08, 0.06]} />
            <meshStandardMaterial color={YELLOW} roughness={0.4} />
          </mesh>
          {/* Vent stripe */}
          <mesh position={[0, -0.08, 0.115]}>
            <boxGeometry args={[0.12, 0.04, 0.005]} />
            <meshStandardMaterial color={DARK} />
          </mesh>
          {/* Side accent */}
          <mesh position={[(x > 0 ? 0.115 : -0.115), 0, 0]}>
            <boxGeometry args={[0.005, 0.18, 0.16]} />
            <meshStandardMaterial color={BLUE} />
          </mesh>
        </group>
      ))}
      {/* Thighs */}
      {[-0.13, 0.13].map((x, i) => (
        <mesh key={`thigh-${i}`} position={[x, 0.6, 0]} castShadow>
          <boxGeometry args={[0.2, 0.32, 0.22]} />
          <meshStandardMaterial color={BLUE} roughness={0.5} metalness={0.2} />
        </mesh>
      ))}

      {/* ────── Hips / Skirt ────── */}
      <mesh position={[0, 0.78, 0]} castShadow>
        <boxGeometry args={[0.42, 0.14, 0.28]} />
        <meshStandardMaterial color={WHITE} roughness={0.45} metalness={0.25} />
      </mesh>
      {/* Center crotch v shape */}
      <mesh position={[0, 0.74, 0.144]}>
        <boxGeometry args={[0.08, 0.1, 0.005]} />
        <meshStandardMaterial color={YELLOW} />
      </mesh>
      {/* Side skirt armor */}
      {[-0.26, 0.26].map((x, i) => (
        <mesh key={`skirt-${i}`} position={[x, 0.7, 0]} castShadow>
          <boxGeometry args={[0.08, 0.18, 0.24]} />
          <meshStandardMaterial color={WHITE} roughness={0.45} />
        </mesh>
      ))}
      {/* Front skirt flaps */}
      {[-0.1, 0.1].map((x, i) => (
        <mesh key={`fs-${i}`} position={[x, 0.7, 0.13]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.16, 0.18, 0.04]} />
          <meshStandardMaterial color={WHITE} roughness={0.45} />
        </mesh>
      ))}

      {/* ────── Torso ────── */}
      {/* Lower abdomen blue */}
      <mesh position={[0, 0.92, 0]} castShadow>
        <boxGeometry args={[0.32, 0.14, 0.24]} />
        <meshStandardMaterial color={BLUE} roughness={0.5} />
      </mesh>
      {/* Chest plate (red center, white shoulders flank later) */}
      <mesh position={[0, 1.13, 0]} castShadow>
        <boxGeometry args={[0.5, 0.32, 0.28]} />
        <meshStandardMaterial color={WHITE} roughness={0.45} metalness={0.2} />
      </mesh>
      {/* Red chest center */}
      <mesh position={[0, 1.13, 0.142]}>
        <boxGeometry args={[0.18, 0.28, 0.005]} />
        <meshStandardMaterial color={RED} roughness={0.4} />
      </mesh>
      {/* Yellow chest vents (twin air intakes) */}
      {[-0.08, 0.08].map((x, i) => (
        <mesh key={`vent-${i}`} position={[x, 1.22, 0.144]}>
          <boxGeometry args={[0.05, 0.05, 0.005]} />
          <meshStandardMaterial color={YELLOW} />
        </mesh>
      ))}
      {/* Neck */}
      <mesh position={[0, 1.34, 0]}>
        <boxGeometry args={[0.1, 0.08, 0.1]} />
        <meshStandardMaterial color={DARK} />
      </mesh>

      {/* ────── Head ────── */}
      <group position={[0, 1.5, 0]}>
        {/* Helmet */}
        <mesh castShadow>
          <boxGeometry args={[0.26, 0.22, 0.24]} />
          <meshStandardMaterial color={WHITE} roughness={0.4} metalness={0.3} />
        </mesh>
        {/* Faceplate dark */}
        <mesh position={[0, -0.02, 0.121]}>
          <boxGeometry args={[0.18, 0.16, 0.005]} />
          <meshStandardMaterial color={DARK} />
        </mesh>
        {/* Visor (eye band) */}
        <mesh position={[0, 0.02, 0.124]}>
          <boxGeometry args={[0.16, 0.035, 0.005]} />
          <meshStandardMaterial color={VISOR} emissive={VISOR} emissiveIntensity={2.4} />
        </mesh>
        {/* Mouth slit */}
        <mesh position={[0, -0.05, 0.124]}>
          <boxGeometry args={[0.06, 0.012, 0.005]} />
          <meshStandardMaterial color={YELLOW} emissive={YELLOW} emissiveIntensity={1.2} />
        </mesh>
        {/* V-fin antenna (front crest) */}
        <mesh position={[0, 0.16, 0.06]}>
          <boxGeometry args={[0.16, 0.04, 0.04]} />
          <meshStandardMaterial color={YELLOW} />
        </mesh>
        <mesh position={[-0.1, 0.21, 0.05]} rotation={[0, 0, 0.45]}>
          <coneGeometry args={[0.022, 0.12, 4]} />
          <meshStandardMaterial color={RED} />
        </mesh>
        <mesh position={[0.1, 0.21, 0.05]} rotation={[0, 0, -0.45]}>
          <coneGeometry args={[0.022, 0.12, 4]} />
          <meshStandardMaterial color={RED} />
        </mesh>
        {/* Center crest dot */}
        <mesh position={[0, 0.16, 0.085]}>
          <boxGeometry args={[0.03, 0.04, 0.005]} />
          <meshStandardMaterial color={RED} />
        </mesh>
        {/* Side ear vents */}
        {[-0.135, 0.135].map((x, i) => (
          <mesh key={`ear-${i}`} position={[x, -0.02, 0]}>
            <boxGeometry args={[0.02, 0.1, 0.14]} />
            <meshStandardMaterial color={YELLOW} />
          </mesh>
        ))}
      </group>

      {/* ────── Shoulders / Arms ────── */}
      {/* Pauldrons */}
      {[
        { x: -0.34, color: WHITE, mark: RED },
        { x: 0.34, color: WHITE, mark: BLUE },
      ].map((p, i) => (
        <group key={`pauldron-${i}`} position={[p.x, 1.18, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.18, 0.22, 0.26]} />
            <meshStandardMaterial color={p.color} roughness={0.45} />
          </mesh>
          {/* Side marking */}
          <mesh position={[(p.x < 0 ? -0.091 : 0.091), 0.04, 0]}>
            <boxGeometry args={[0.005, 0.06, 0.16]} />
            <meshStandardMaterial color={p.mark} />
          </mesh>
        </group>
      ))}
      {/* Upper arms */}
      {[-0.34, 0.34].map((x, i) => (
        <mesh key={`up-arm-${i}`} position={[x, 0.96, 0]} castShadow>
          <boxGeometry args={[0.13, 0.22, 0.16]} />
          <meshStandardMaterial color={WHITE} roughness={0.45} />
        </mesh>
      ))}
      {/* Forearms (slightly larger / armored) */}
      {[-0.34, 0.34].map((x, i) => (
        <group key={`fore-${i}`} position={[x, 0.74, 0]}>
          <mesh castShadow>
            <boxGeometry args={[0.16, 0.22, 0.18]} />
            <meshStandardMaterial color={WHITE} roughness={0.45} />
          </mesh>
          {/* Wrist accent */}
          <mesh position={[0, -0.13, 0]}>
            <boxGeometry args={[0.16, 0.03, 0.18]} />
            <meshStandardMaterial color={DARK} />
          </mesh>
        </group>
      ))}
      {/* Manipulator hands */}
      {[-0.34, 0.34].map((x, i) => (
        <mesh key={`hand-${i}`} position={[x, 0.6, 0]} castShadow>
          <boxGeometry args={[0.12, 0.1, 0.14]} />
          <meshStandardMaterial color={WHITE} roughness={0.5} />
        </mesh>
      ))}

      {/* ────── Backpack thrusters ────── */}
      <mesh position={[0, 1.13, -0.18]} castShadow>
        <boxGeometry args={[0.36, 0.34, 0.12]} />
        <meshStandardMaterial color={WHITE} roughness={0.5} />
      </mesh>
      {/* Twin thruster nozzles */}
      {[-0.1, 0.1].map((x, i) => (
        <group key={`th-${i}`} position={[x, 1.26, -0.27]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
            <cylinderGeometry args={[0.05, 0.07, 0.12, 16]} />
            <meshStandardMaterial color={DARK} roughness={0.6} />
          </mesh>
          <mesh position={[0, 0, -0.06]}>
            <circleGeometry args={[0.045, 16]} />
            <meshStandardMaterial color={"#FF6B1A"} emissive="#FF6B1A" emissiveIntensity={1.4} />
          </mesh>
        </group>
      ))}

      {/* ────── Beam saber on hip ────── */}
      <mesh position={[0.22, 0.78, -0.12]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[0.018, 0.018, 0.18, 12]} />
        <meshStandardMaterial color={"#9a9a9a"} roughness={0.3} metalness={0.85} />
      </mesh>
    </HotspotGroup>
  );
}

/* ─────────────────────────  LEGO PILE  ───────────────────────── */

type Brick = {
  pos: [number, number, number];
  /** width × depth in studs (each stud = 0.1u), height in plates (each plate = 0.06u) */
  studs: [number, number];
  plates?: number; // 1 = plate, 3 = brick
  rot?: number;
  color: string;
};

const STUD = 0.1;
const PLATE = 0.06;
const STUD_DIA = 0.058;
const STUD_H = 0.024;

function LegoBrick({ brick }: { brick: Brick }) {
  const [w, d] = brick.studs;
  const plates = brick.plates ?? 3;
  const sx = w * STUD;
  const sz = d * STUD;
  const sy = plates * PLATE;

  return (
    <group position={brick.pos} rotation={[0, brick.rot ?? 0, 0]}>
      <mesh castShadow receiveShadow>
        <boxGeometry args={[sx, sy, sz]} />
        <meshStandardMaterial color={brick.color} roughness={0.35} metalness={0.05} />
      </mesh>
      {/* Studs grid */}
      {Array.from({ length: w }).flatMap((_, i) =>
        Array.from({ length: d }).map((__, j) => {
          const x = -sx / 2 + STUD / 2 + i * STUD;
          const z = -sz / 2 + STUD / 2 + j * STUD;
          return (
            <mesh
              key={`s-${i}-${j}`}
              position={[x, sy / 2 + STUD_H / 2, z]}
            >
              <cylinderGeometry args={[STUD_DIA / 2, STUD_DIA / 2, STUD_H, 16]} />
              <meshStandardMaterial color={brick.color} roughness={0.3} />
            </mesh>
          );
        })
      )}
    </group>
  );
}

function LegoPile(props: ScenePropsBase) {
  const RED = "#d01b20";
  const BLUE = "#0058a8";
  const GREEN = "#00a651";
  const YELLOW = "#f3c01b";
  const WHITE = "#f5f5f5";
  const ORANGE = "#FF6B1A";
  const BLACK = "#1a1a1a";

  // A small partially-built creation + a few scattered loose bricks.
  const built: Brick[] = [
    // Base plate (large flat plate)
    { pos: [0, PLATE / 2, 0], studs: [4, 4], plates: 1, color: GREEN, rot: 0 },
    // Brick row 1
    { pos: [-0.1, PLATE * 1 + (3 * PLATE) / 2, -0.1], studs: [2, 2], plates: 3, color: RED, rot: 0 },
    { pos: [0.1, PLATE * 1 + (3 * PLATE) / 2, 0.1], studs: [2, 2], plates: 3, color: BLUE, rot: 0 },
    // Brick row 2
    { pos: [0, PLATE * 1 + 3 * PLATE + (3 * PLATE) / 2, 0], studs: [2, 4], plates: 3, color: YELLOW, rot: 0 },
    // Top piece
    { pos: [0, PLATE * 1 + 6 * PLATE + (3 * PLATE) / 2, 0], studs: [2, 2], plates: 3, color: WHITE, rot: 0.3 },
  ];

  const scattered: Brick[] = [
    { pos: [-0.55, (3 * PLATE) / 2, 0.2], studs: [2, 4], plates: 3, color: BLUE, rot: 0.6 },
    { pos: [0.5, (3 * PLATE) / 2, -0.15], studs: [2, 2], plates: 3, color: ORANGE, rot: -0.4 },
    { pos: [-0.45, (PLATE) / 2 + (3 * PLATE), 0.45], studs: [1, 2], plates: 3, color: WHITE, rot: 0.9 },
    { pos: [0.55, (3 * PLATE) / 2, 0.4], studs: [2, 3], plates: 3, color: RED, rot: -0.2 },
    { pos: [-0.6, (PLATE) / 2, -0.15], studs: [2, 2], plates: 1, color: BLACK, rot: 0.2 },
    { pos: [0.18, (PLATE) / 2, 0.55], studs: [1, 4], plates: 1, color: YELLOW, rot: 1.1 },
    { pos: [-0.2, (3 * PLATE) / 2, 0.6], studs: [1, 1], plates: 3, color: GREEN, rot: 0 },
    { pos: [0.45, (PLATE) / 2 + (3 * PLATE), -0.4], studs: [1, 1], plates: 3, color: ORANGE, rot: 0.5 },
  ];

  return (
    <HotspotGroup
      {...props}
      hotspotKey="legos"
      position={[-1.6, 0, 1.2]}
      labelOffsetY={0.85}
    >
      {[...built, ...scattered].map((b, i) => (
        <LegoBrick key={i} brick={b} />
      ))}
    </HotspotGroup>
  );
}

/* ─────────────────────────  PHONE  ───────────────────────── */

function Phone(props: ScenePropsBase) {
  return (
    <HotspotGroup
      {...props}
      hotspotKey="phone"
      position={[0.95, 0.93, 0.05]}
      rotation={[Math.PI / 8, -0.2, 0]}
      labelOffsetY={0.55}
    >
      {/* Body */}
      <mesh castShadow>
        <boxGeometry args={[0.34, 0.7, 0.04]} />
        <meshStandardMaterial color="#0e0e0e" roughness={0.35} metalness={0.4} />
      </mesh>
      {/* Screen bezel inset */}
      <mesh position={[0, 0, 0.022]}>
        <planeGeometry args={[0.32, 0.66]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
      {/* Active screen content (orange wallpaper-ish) */}
      <mesh position={[0, 0, 0.024]}>
        <planeGeometry args={[0.3, 0.62]} />
        <meshBasicMaterial color="#FF6B1A" />
      </mesh>
      {/* Notification stack */}
      {[0.22, 0.13, 0.04].map((y, i) => (
        <mesh key={i} position={[0, y, 0.025]}>
          <planeGeometry args={[0.26, 0.06]} />
          <meshBasicMaterial color="#0a0a0a" />
        </mesh>
      ))}
      {/* Camera notch */}
      <mesh position={[0.1, 0.31, 0.025]}>
        <circleGeometry args={[0.012, 16]} />
        <meshStandardMaterial color="#050505" />
      </mesh>
    </HotspotGroup>
  );
}

/* ─────────────────────────  Floor / Desk / Camera  ───────────────────────── */

function Desk() {
  return (
    <group position={[-0.4, 0, -0.4]}>
      <mesh receiveShadow castShadow position={[0, 0.4, 0]}>
        <boxGeometry args={[3.2, 0.06, 1.4]} />
        <meshStandardMaterial color="#3b2618" roughness={0.7} />
      </mesh>
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

const _targetVec = new THREE.Vector3();
const _lookVec = new THREE.Vector3();

function CameraRig({ focused }: { focused: HotspotKey | null }) {
  useFrame((state) => {
    const { x, y } = state.pointer;
    const ease = focused ? 0.06 : 0.05;

    if (focused) {
      const cam = FOCUS_CAMERA[focused];
      _targetVec.copy(cam.pos).add(new THREE.Vector3(x * 0.18, y * 0.12, 0));
      _lookVec.copy(cam.target);
    } else {
      _targetVec
        .copy(OVERVIEW_CAMERA.pos)
        .add(new THREE.Vector3(x * 0.6, y * 0.3, 0));
      _lookVec.copy(OVERVIEW_CAMERA.target);
    }

    state.camera.position.lerp(_targetVec, ease);

    const currentLook = new THREE.Vector3();
    state.camera.getWorldDirection(currentLook);
    const targetDir = _lookVec.clone().sub(state.camera.position).normalize();
    const eased = currentLook.lerp(targetDir, ease * 1.4).normalize();
    state.camera.lookAt(state.camera.position.clone().add(eased));
  });
  return null;
}

/* ─────────────────────────  Scene  ───────────────────────── */

export default function RoomScene({
  onSelect,
  focused,
}: {
  onSelect?: (k: HotspotKey) => void;
  focused?: HotspotKey | null;
}) {
  const [hovered, setHovered] = useState<HotspotKey | null>(null);
  const activeFocus = focused ?? null;

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

        <Float speed={0.4} floatIntensity={0.08} rotationIntensity={0}>
          <group>
            <Floor />
            <Desk />
            <PCMonitor hovered={hovered} setHovered={setHovered} onSelect={onSelect} />
            <ToyotaCar hovered={hovered} setHovered={setHovered} onSelect={onSelect} />
            <GundamFigure hovered={hovered} setHovered={setHovered} onSelect={onSelect} />
            <LegoPile hovered={hovered} setHovered={setHovered} onSelect={onSelect} />
            <Phone hovered={hovered} setHovered={setHovered} onSelect={onSelect} />

            {/* Real .glb decoration: a stylized toy car on the desk.
                Source: Khronos glTF Sample Assets (CC-BY 4.0 / public). */}
            <Suspense fallback={null}>
              <group position={[-0.4, 0.43, 0.4]} rotation={[0, 0.6, 0]}>
                <GLTFModel src="/models/toycar.glb" scale={4.5} />
              </group>
            </Suspense>
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
        <CameraRig focused={activeFocus} />
      </Suspense>
    </Canvas>
  );
}

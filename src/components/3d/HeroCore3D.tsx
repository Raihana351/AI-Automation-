import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Procedural orbital particles
function ParticleField({ count = 120 }: { count?: number }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.2 + Math.random() * 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      p[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      p[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      p[i * 3 + 2] = radius * Math.cos(phi);
    }
    return p;
  }, [count]);

  const ref = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.04;
      ref.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[points, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#38BDF8"
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Multi-tier orbital rings
function OrbitalRing({
  radius,
  tubeRadius = 0.012,
  speed = 0.5,
  tiltX = 0,
  tiltZ = 0,
  color = '#06B6D4',
}: {
  radius: number;
  tubeRadius?: number;
  speed?: number;
  tiltX?: number;
  tiltZ?: number;
  color?: string;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const nodeRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * speed;
    }
    if (nodeRef.current) {
      const t = state.clock.getElapsedTime() * speed * 2;
      nodeRef.current.position.x = Math.cos(t) * radius;
      nodeRef.current.position.z = Math.sin(t) * radius;
    }
  });

  return (
    <group rotation={[tiltX, 0, tiltZ]}>
      <group ref={groupRef}>
        <mesh>
          <torusGeometry args={[radius, tubeRadius, 16, 80]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            roughness={0.2}
            metalness={0.8}
            transparent
            opacity={0.65}
          />
        </mesh>
        {/* Orbiting data beacon node */}
        <mesh ref={nodeRef}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshBasicMaterial color="#E0F2FE" />
        </mesh>
      </group>
    </group>
  );
}

// Inner glowing AI Core with physical facets
function CentralCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerGeomRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.15;
      const scale = 1 + Math.sin(t * 1.8) * 0.035;
      coreRef.current.scale.set(scale, scale, scale);
    }
    if (outerGeomRef.current) {
      outerGeomRef.current.rotation.y -= delta * 0.18;
      outerGeomRef.current.rotation.z += delta * 0.12;
    }
    if (haloRef.current) {
      const haloScale = 1.08 + Math.sin(t * 2.2) * 0.05;
      haloRef.current.scale.set(haloScale, haloScale, haloScale);
    }
  });

  return (
    <group>
      {/* Innermost high-emissive heart */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.78, 32, 32]} />
        <meshStandardMaterial
          color="#0284C7"
          emissive="#38BDF8"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Atmospheric translucent energy halo */}
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.92, 24, 24]} />
        <meshBasicMaterial
          color="#38BDF8"
          transparent
          opacity={0.16}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Geometric facet cage (Icosahedron) */}
      <mesh ref={outerGeomRef}>
        <icosahedronGeometry args={[1.22, 1]} />
        <meshStandardMaterial
          color="#67E8F9"
          emissive="#0284C7"
          emissiveIntensity={0.4}
          roughness={0.2}
          metalness={0.95}
          wireframe
          transparent
          opacity={0.45}
        />
      </mesh>
    </group>
  );
}

// Scene Root with mouse tracking & smooth camera damping
function SceneContainer({ mousePos }: { mousePos: { x: number; y: number } }) {
  const rootGroupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (rootGroupRef.current) {
      // Smooth exponential damping toward mouse target
      const targetRotY = mousePos.x * 0.45;
      const targetRotX = -mousePos.y * 0.35;
      rootGroupRef.current.rotation.y = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.y,
        targetRotY,
        4,
        delta
      );
      rootGroupRef.current.rotation.x = THREE.MathUtils.damp(
        rootGroupRef.current.rotation.x,
        targetRotX,
        4,
        delta
      );
    }
  });

  return (
    <group ref={rootGroupRef}>
      <CentralCore />
      <OrbitalRing radius={1.65} tiltX={0.4} tiltZ={0.25} speed={0.45} color="#06B6D4" />
      <OrbitalRing radius={2.1} tiltX={-0.6} tiltZ={-0.35} speed={-0.35} color="#3B82F6" />
      <OrbitalRing radius={2.55} tiltX={0.2} tiltZ={-0.7} speed={0.28} color="#818CF8" />
      <ParticleField count={110} />
    </group>
  );
}

export function HeroCore3D() {
  const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });
  const [hasWebGLError, setHasWebGLError] = React.useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect.width > 0 && rect.height > 0) {
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      if (Number.isFinite(x) && Number.isFinite(y)) {
        setMousePos({ x, y });
      }
    }
  };

  if (hasWebGLError) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8">
        <div className="relative w-64 h-64 rounded-full border border-cyan-500/30 flex items-center justify-center bg-cyan-950/20 backdrop-blur-sm">
          <div className="w-40 h-40 rounded-full border border-dashed border-cyan-400/50 animate-spin" style={{ animationDuration: '24s' }} />
          <div className="absolute w-24 h-24 rounded-full bg-cyan-500/20 blur-xl" />
          <div className="w-20 h-20 rounded-full bg-cyan-600/60 shadow-lg shadow-cyan-500/40" />
        </div>
      </div>
    );
  }

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      onPointerMove={handlePointerMove}
    >
      <Canvas
        camera={{ position: [0, 0.4, 5.2], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        onCreated={({ gl }) => {
          gl.domElement.addEventListener('webglcontextlost', (e) => {
            e.preventDefault();
            setHasWebGLError(true);
          });
        }}
      >
        <ambientLight intensity={0.45} />
        {/* Warm key light */}
        <directionalLight position={[4, 5, 4]} intensity={1.4} color="#F0F9FF" />
        {/* Cool fill light */}
        <directionalLight position={[-4, -3, -2]} intensity={0.65} color="#0284C7" />
        {/* Back rim light */}
        <pointLight position={[0, -2, -3]} intensity={1.8} color="#67E8F9" />

        <SceneContainer mousePos={mousePos} />
      </Canvas>
    </div>
  );
}
export default HeroCore3D;

import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Sliders, Eye, RefreshCw, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

type CoreMode = 'quantum' | 'neural' | 'plasma';

interface DedicatedCoreViewerProps {
  scrollProgress?: number;
}

// Particle field with depth and velocity
function SwarmParticles({
  count = 200,
  speedMultiplier = 1,
  color = '#38BDF8',
}: {
  count?: number;
  speedMultiplier?: number;
  color?: string;
}) {
  const points = useMemo(() => {
    const coords = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 2.4 + Math.random() * 3.2;
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const sinPhi = Math.sin(phi);
      coords[i * 3] = radius * sinPhi * Math.cos(theta);
      coords[i * 3 + 1] = radius * sinPhi * Math.sin(theta);
      coords[i * 3 + 2] = radius * Math.cos(phi);
    }
    return coords;
  }, [count]);

  const pRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pRef.current) {
      pRef.current.rotation.y += delta * 0.05 * speedMultiplier;
      pRef.current.rotation.x += delta * 0.02 * speedMultiplier;
    }
  });

  return (
    <points ref={pRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[points, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.04}
        color={color}
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Precision Orbital Gyroscope Rings
function GyroscopeRings({
  speed = 1,
  wireframe = false,
  coreMode,
}: {
  speed: number;
  wireframe: boolean;
  coreMode: CoreMode;
}) {
  const ring1 = useRef<THREE.Group>(null);
  const ring2 = useRef<THREE.Group>(null);
  const ring3 = useRef<THREE.Group>(null);

  const ringColors = useMemo(() => {
    if (coreMode === 'neural') return ['#06B6D4', '#3B82F6', '#6366F1'];
    if (coreMode === 'plasma') return ['#F59E0B', '#EF4444', '#EC4899'];
    return ['#38BDF8', '#818CF8', '#0EA5E9'];
  }, [coreMode]);

  useFrame((_, delta) => {
    if (ring1.current) ring1.current.rotation.z += delta * 0.4 * speed;
    if (ring2.current) ring2.current.rotation.x += delta * 0.32 * speed;
    if (ring3.current) ring3.current.rotation.y += delta * 0.28 * speed;
  });

  return (
    <group>
      {/* Outer Ring */}
      <group ref={ring1} rotation={[0.4, 0.2, 0]}>
        <mesh>
          <torusGeometry args={[2.5, 0.02, 16, 100]} />
          <meshStandardMaterial
            color={ringColors[0]}
            emissive={ringColors[0]}
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.9}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* Middle Ring */}
      <group ref={ring2} rotation={[-0.5, 0.4, 0.3]}>
        <mesh>
          <torusGeometry args={[2.0, 0.022, 16, 90]} />
          <meshStandardMaterial
            color={ringColors[1]}
            emissive={ringColors[1]}
            emissiveIntensity={0.6}
            roughness={0.15}
            metalness={0.9}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* Inner Fast Ring */}
      <group ref={ring3} rotation={[0.3, -0.6, 0.5]}>
        <mesh>
          <torusGeometry args={[1.5, 0.025, 16, 80]} />
          <meshStandardMaterial
            color={ringColors[2]}
            emissive={ringColors[2]}
            emissiveIntensity={0.7}
            roughness={0.1}
            metalness={0.9}
            wireframe={wireframe}
          />
        </mesh>
      </group>
    </group>
  );
}

// Interactive Multi-Shell Core
function MultiLayerCore({
  mode,
  pulse,
  wireframe,
  isHovered,
}: {
  mode: CoreMode;
  pulse: boolean;
  wireframe: boolean;
  isHovered: boolean;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const shellRef = useRef<THREE.Mesh>(null);
  const outerGeomRef = useRef<THREE.Mesh>(null);

  const colors = useMemo(() => {
    switch (mode) {
      case 'neural':
        return {
          core: '#0284C7',
          emissive: '#06B6D4',
          outer: '#3B82F6',
        };
      case 'plasma':
        return {
          core: '#D97706',
          emissive: '#F59E0B',
          outer: '#EF4444',
        };
      default: // quantum
        return {
          core: '#0369A1',
          emissive: '#38BDF8',
          outer: '#818CF8',
        };
    }
  }, [mode]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.2;
      coreRef.current.rotation.x += delta * 0.1;
      const pulseFactor = pulse ? Math.sin(t * 3.0) * 0.05 : 0;
      const hoverScale = isHovered ? 1.08 : 1.0;
      const finalScale = (1 + pulseFactor) * hoverScale;
      coreRef.current.scale.set(finalScale, finalScale, finalScale);
    }

    if (shellRef.current) {
      shellRef.current.rotation.y -= delta * 0.15;
      shellRef.current.rotation.z += delta * 0.1;
    }

    if (outerGeomRef.current) {
      outerGeomRef.current.rotation.x += delta * 0.08;
      outerGeomRef.current.rotation.y += delta * 0.12;
    }
  });

  return (
    <group>
      {/* Dense High-Tech Center */}
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.85, 36, 36]} />
        <meshStandardMaterial
          color={colors.core}
          emissive={colors.emissive}
          emissiveIntensity={isHovered ? 1.2 : 0.8}
          roughness={0.12}
          metalness={0.92}
          wireframe={wireframe}
        />
      </mesh>

      {/* Middle Crystalline Translucent Shell */}
      <mesh ref={shellRef}>
        <octahedronGeometry args={[1.25, 1]} />
        <meshPhysicalMaterial
          color={colors.outer}
          emissive={colors.emissive}
          emissiveIntensity={0.35}
          roughness={0.1}
          metalness={0.8}
          transmission={0.4}
          transparent
          opacity={0.4}
          wireframe={wireframe}
        />
      </mesh>

      {/* Outer Icosahedral Lattice */}
      <mesh ref={outerGeomRef}>
        <icosahedronGeometry args={[1.68, 1]} />
        <meshStandardMaterial
          color="#E0F2FE"
          emissive={colors.outer}
          emissiveIntensity={0.3}
          roughness={0.2}
          metalness={0.9}
          wireframe={true}
          transparent
          opacity={0.35}
        />
      </mesh>
    </group>
  );
}

// Scene Root with Controls
function DedicatedScene({
  mode,
  speed,
  pulse,
  wireframe,
  isHovered,
}: {
  mode: CoreMode;
  speed: number;
  pulse: boolean;
  wireframe: boolean;
  isHovered: boolean;
}) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[6, 8, 5]} intensity={1.5} color="#FFFFFF" />
      <directionalLight position={[-6, -4, -3]} intensity={0.7} color="#0284C7" />
      <pointLight position={[0, 0, -4]} intensity={2.0} color="#38BDF8" />

      <MultiLayerCore
        mode={mode}
        pulse={pulse}
        wireframe={wireframe}
        isHovered={isHovered}
      />
      <GyroscopeRings speed={speed} wireframe={wireframe} coreMode={mode} />
      <SwarmParticles count={180} speedMultiplier={speed} />

      <OrbitControls
        enableZoom={true}
        enablePan={false}
        minDistance={3.2}
        maxDistance={8}
        dampingFactor={0.05}
        rotateSpeed={0.7}
      />
    </>
  );
}

export function DedicatedCoreViewer({ scrollProgress = 0 }: DedicatedCoreViewerProps) {
  const [coreMode, setCoreMode] = useState<CoreMode>('quantum');
  const [rotationSpeed, setRotationSpeed] = useState<number>(1.0);
  const [pulseActive, setPulseActive] = useState<boolean>(true);
  const [wireframeMode, setWireframeMode] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [hudCollapsed, setHudCollapsed] = useState<boolean>(false);
  const [hasWebGLError, setHasWebGLError] = useState<boolean>(false);

  // Check user motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  return (
    <div className="relative w-full h-[580px] md:h-[680px] bg-gradient-to-b from-slate-950/70 via-[#05060A] to-slate-950/80 rounded-2xl border border-slate-800/80 overflow-hidden shadow-2xl">
      {/* Section Background Grid & Ambient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-25 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top minimal spec label per Three.js design skill */}
      <div className="absolute top-4 left-6 z-10 flex items-center gap-3 text-xs text-slate-400 pointer-events-none">
        <span className="font-semibold text-slate-200">NEXORA 3D CORE</span>
        <span aria-hidden="true" className="text-slate-600">/</span>
        <span className="font-mono text-cyan-400 capitalize">{coreMode} Architecture</span>
        <span aria-hidden="true" className="text-slate-600">/</span>
        <span className="font-mono text-slate-500">WebGL 2.0</span>
      </div>

      <div className="absolute top-4 right-6 z-10 text-xs text-slate-500 hidden sm:block pointer-events-none">
        <span>Click and drag to rotate · Scroll to zoom</span>
      </div>

      {/* 3D Canvas / Fallback */}
      {hasWebGLError || prefersReducedMotion ? (
        <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
          <div className="relative w-48 h-48 rounded-full border border-cyan-500/30 flex items-center justify-center mb-6">
            <div className="w-32 h-32 rounded-full border border-dashed border-cyan-400/50" />
            <div className="absolute w-20 h-20 rounded-full bg-cyan-500/20 blur-lg" />
            <div className="w-16 h-16 rounded-full bg-cyan-600/80 shadow-lg shadow-cyan-500/50" />
          </div>
          <h4 className="text-base font-semibold text-slate-200">Neural Core Matrix (2D View)</h4>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            {prefersReducedMotion
              ? 'Reduced motion mode active. Static representation shown.'
              : 'WebGL acceleration currently unavailable. Rendering high-fidelity isometric core.'}
          </p>
        </div>
      ) : (
        <div
          className="w-full h-full cursor-grab active:cursor-grabbing"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Canvas
            camera={{ position: [0, 0, 4.8], fov: 46 }}
            dpr={[1, 1.8]}
            gl={{ antialias: true, alpha: true }}
            onCreated={({ gl }) => {
              gl.domElement.addEventListener('webglcontextlost', (e) => {
                e.preventDefault();
                setHasWebGLError(true);
              });
            }}
          >
            <DedicatedScene
              mode={coreMode}
              speed={rotationSpeed}
              pulse={pulseActive}
              wireframe={wireframeMode}
              isHovered={isHovered}
            />
          </Canvas>
        </div>
      )}

      {/* THREEJS SKILL MANDATE: Consolidated Sleek Bottom Dock (Zero Viewport Occlusion) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-auto max-w-[94vw]">
        {/* Collapse / Expand Toggle Button */}
        <button
          onClick={() => setHudCollapsed((prev) => !prev)}
          className="mb-1 flex items-center gap-1.5 px-3 py-1 text-[11px] font-medium text-slate-400 hover:text-slate-200 bg-slate-900/80 border border-slate-800 rounded-t-md transition-colors"
          title="Toggle 3D HUD Controls"
        >
          {hudCollapsed ? <ChevronUp className="w-3 h-3 text-cyan-400" /> : <ChevronDown className="w-3 h-3 text-cyan-400" />}
          <span>{hudCollapsed ? 'Show 3D Controls' : 'Hide Controls'}</span>
        </button>

        {/* Control Dock Panel */}
        {!hudCollapsed && (
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 px-4 py-2.5 bg-slate-900/90 border border-slate-800/90 rounded-xl shadow-2xl backdrop-blur-md">
            {/* Mode selection buttons */}
            <div className="flex items-center gap-1 bg-slate-950/70 p-1 rounded-lg border border-slate-800">
              <button
                onClick={() => setCoreMode('quantum')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  coreMode === 'quantum'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Quantum
              </button>
              <button
                onClick={() => setCoreMode('neural')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  coreMode === 'neural'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Neural
              </button>
              <button
                onClick={() => setCoreMode('plasma')}
                className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                  coreMode === 'plasma'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Plasma
              </button>
            </div>

            <div className="hidden sm:block h-4 w-px bg-slate-800" />

            {/* Speed selection */}
            <div className="flex items-center gap-1.5 text-xs text-slate-400">
              <Sliders className="w-3.5 h-3.5 text-slate-500" />
              <span>Speed:</span>
              <button
                onClick={() => setRotationSpeed((s) => (s === 1.0 ? 2.0 : s === 2.0 ? 0.5 : 1.0))}
                className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono transition-colors"
              >
                {rotationSpeed}x
              </button>
            </div>

            <div className="hidden sm:block h-4 w-px bg-slate-800" />

            {/* Pulse Toggle */}
            <button
              onClick={() => setPulseActive((p) => !p)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
                pulseActive
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400'
              }`}
            >
              <Sparkles className="w-3 h-3" />
              <span>Pulse {pulseActive ? 'On' : 'Off'}</span>
            </button>

            {/* Wireframe Toggle */}
            <button
              onClick={() => setWireframeMode((w) => !w)}
              className={`flex items-center gap-1 px-2.5 py-1 text-xs font-medium rounded border transition-colors ${
                wireframeMode
                  ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-300'
                  : 'bg-slate-800/40 border-slate-700 text-slate-400'
              }`}
            >
              <Eye className="w-3 h-3" />
              <span>Wireframe</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
export default DedicatedCoreViewer;

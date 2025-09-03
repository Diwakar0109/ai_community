import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
// @ts-ignore
import * as random from 'maath/random/dist/maath-random.esm';

const Stars: React.FC = (props: any) => {
  // FIX: Initialized useRef with null to resolve "Expected 1 arguments, but got 0" error.
  const ref = useRef<any>(null);
  // FIX: Corrected array size to be a multiple of 3 for 3D coordinates to avoid NaN values.
  const sphere = useMemo(() => random.inSphere(new Float32Array(5000 * 3), { radius: 1.2 }), []);

  useFrame((state, delta) => {
    if(ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#57d5f0"
          size={0.003}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const AnimatedBackground: React.FC = () => {
  return (
    <div className="w-full h-full fixed top-0 left-0 -z-10">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default AnimatedBackground;
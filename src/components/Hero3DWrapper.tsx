import { Suspense, lazy, useState, useEffect } from "react";

// Lazy load the 3D component - it's already a default export
const Hero3D = lazy(() => import("@/components/Hero3D"));

// Fallback component with similar visual effect
function Hero3DFallback() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative">
        {/* Animated gradient sphere fallback */}
        <div className="w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 animate-pulse" />
        <div className="absolute inset-0 w-64 h-64 rounded-full bg-gradient-to-l from-primary/10 to-transparent animate-ping" />
      </div>
    </div>
  );
}

export function Hero3DWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay loading the 3D component slightly to ensure page loads first
    const timer = setTimeout(() => setShouldLoad(true), 100);
    return () => clearTimeout(timer);
  }, []);

  if (!shouldLoad) {
    return <Hero3DFallback />;
  }

  return (
    <Suspense fallback={<Hero3DFallback />}>
      <Hero3D />
    </Suspense>
  );
}

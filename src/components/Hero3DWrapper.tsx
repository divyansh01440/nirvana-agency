// Animated gradient sphere - beautiful fallback that always works
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

// Temporarily using fallback only to ensure site works
// The 3D can be re-enabled once deployment issues are resolved
export function Hero3DWrapper() {
  return <Hero3DFallback />;
}

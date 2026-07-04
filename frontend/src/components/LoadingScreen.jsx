export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB] via-[#7C3AED] to-[#06B6D4] flex items-center justify-center font-display font-bold text-white animate-pulse">
          S
        </div>
        <p className="text-xs uppercase tracking-widest text-zinc-500">Loading experience…</p>
      </div>
    </div>
  );
}

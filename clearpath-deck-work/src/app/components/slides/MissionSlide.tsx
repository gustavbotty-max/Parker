import { motion } from "motion/react";

export function MissionSlide() {
  return (
    <div className="relative w-full min-h-screen md:h-screen overflow-hidden bg-gradient-to-br from-[#0b1730] via-[#13284d] to-[#10203d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(125,211,252,0.16),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(120,240,197,0.12),transparent_30%)]" />

      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-6xl mx-auto py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-8 w-fit"
        >
          <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">02 — The Mission</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8 }}
          className="font-['Manrope'] text-4xl md:text-6xl lg:text-7xl mb-8 leading-[1.02] max-w-5xl"
        >
          Churches can help us build the
          <br />
          <span className="text-[#7dd3fc]">trust layer first.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="text-2xl text-white/75 leading-relaxed max-w-4xl mb-10"
        >
          We want to start with the most generous people, prove the system locally,
          and build the reputation needed to use this same platform for harder real-world needs later.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="rounded-3xl bg-white/6 border border-white/10 p-7"
          >
            <div className="text-[#8ed0ff] text-sm uppercase tracking-[0.18em] mb-3">What we do now</div>
            <div className="text-white text-2xl font-semibold mb-3">Connection, giving, and trust.</div>
            <p className="text-white/68 leading-relaxed">
              Better giving pages, easier ACH adoption, and a more useful Tap to Connect layer.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.62, duration: 0.8 }}
            className="rounded-3xl bg-white/6 border border-white/10 p-7"
          >
            <div className="text-[#8ed0ff] text-sm uppercase tracking-[0.18em] mb-3">What that unlocks later</div>
            <div className="text-white text-2xl font-semibold mb-3">Safer money movement to real needs.</div>
            <p className="text-white/68 leading-relaxed">
              Once people trust the platform, adoption for harder support use cases becomes much more seamless.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

import { motion } from "motion/react";

export function LocalFirstSlide() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#091426]">
      <div className="absolute inset-0">
        <img src="/assets/durham-train.jpg" alt="Durham train" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#091426]/95 via-[#091426]/82 to-[#091426]/55" />
      </div>

      <div className="relative z-10 h-full flex items-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto py-20">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-6"
          >
            <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">09 — Local First</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.8 }}
            className="font-['Manrope'] text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight"
          >
            We are building this
            <br />
            <span className="text-[#7dd3fc]">here first.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8 }}
            className="text-xl md:text-2xl text-white/75 leading-relaxed mb-8"
          >
            Raleigh and Durham are not just a launch market. They are where we build trust,
            prove the product, and earn the right to grow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="grid md:grid-cols-3 gap-4"
          >
            <div className="rounded-2xl bg-white/8 border border-white/10 p-5 backdrop-blur-sm">
              <div className="text-[#8ed0ff] text-sm uppercase tracking-[0.18em] mb-2">Why local</div>
              <div className="text-white/85">We can be hands-on, responsive, and known.</div>
            </div>
            <div className="rounded-2xl bg-white/8 border border-white/10 p-5 backdrop-blur-sm">
              <div className="text-[#8ed0ff] text-sm uppercase tracking-[0.18em] mb-2">Why now</div>
              <div className="text-white/85">Churches want better giving tools and better trust.</div>
            </div>
            <div className="rounded-2xl bg-white/8 border border-white/10 p-5 backdrop-blur-sm">
              <div className="text-[#8ed0ff] text-sm uppercase tracking-[0.18em] mb-2">Why it matters</div>
              <div className="text-white/85">Local proof makes the later mission much easier to scale.</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

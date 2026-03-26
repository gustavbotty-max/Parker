import { motion } from "motion/react";

export function CoverSlide() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#091426]">
      <motion.div
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.3, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img
          src="/assets/church-community-bg.jpg"
          alt="Church community"
          className="w-full h-full object-cover blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#091426]/95 via-[#0d1b34]/82 to-[#0f2142]/92" />
      </motion.div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center px-8 max-w-6xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-7"
        >
          <div className="inline-block px-6 py-2 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/35 backdrop-blur-sm">
            <span className="text-[#8ed0ff] tracking-[0.24em] uppercase text-sm">Clear Path</span>
          </div>

          <h1 className="font-['Manrope'] text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.96] max-w-5xl">
            Build trust first.
            <br />
            <span className="text-[#7dd3fc]">Move money better.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white/72 max-w-3xl mx-auto leading-relaxed">
            A better way for churches to connect, give, and serve — starting local,
            and building toward something much bigger.
          </p>

          <div className="pt-2 text-white/55 text-sm uppercase tracking-[0.22em]">
            Raleigh • Durham • The Triangle
          </div>
        </motion.div>
      </div>

      <div className="absolute top-20 right-24 w-72 h-72 bg-[#63b3ff] rounded-full blur-[130px] opacity-[0.10] pointer-events-none" />
      <div className="absolute bottom-16 left-20 w-72 h-72 bg-[#78f0c5] rounded-full blur-[130px] opacity-[0.08] pointer-events-none" />
    </div>
  );
}

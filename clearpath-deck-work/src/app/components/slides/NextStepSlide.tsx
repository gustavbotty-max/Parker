import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const steps = [
  "Review your current giving and connection flow",
  "Identify where ACH migration and Tap to Connect can create fast wins",
  "Launch a modern giving experience with a clear rollout plan",
];

export function NextStepSlide() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0b1730] via-[#122448] to-[#10203d]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,179,255,0.18),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(120,240,197,0.12),transparent_30%)]" />
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-6">
            <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">10 — Next Step</span>
          </div>
          <h2 className="font-['Manrope'] text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Start with one church.
            <br />
            <span className="text-[#7dd3fc]">Build the trust layer first.</span>
          </h2>
          <p className="text-xl text-white/70 leading-relaxed mb-10 max-w-3xl">
            The first goal is simple: prove that Clear Path can make connection easier, giving cleaner,
            and trust stronger for a real church in the Triangle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1fr_0.9fr] gap-10 items-start">
          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 + index * 0.1, duration: 0.7 }}
                className="rounded-2xl bg-white/6 border border-white/10 p-5"
              >
                <div className="flex gap-3 items-start">
                  <CheckCircle2 className="w-5 h-5 text-[#78f0c5] mt-0.5 flex-shrink-0" />
                  <div className="text-white/85 leading-relaxed">{step}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="rounded-3xl bg-white/6 border border-white/10 p-7 backdrop-blur-sm"
          >
            <div className="text-[#8ed0ff] uppercase tracking-[0.18em] text-sm mb-3">The ask</div>
            <h3 className="font-['Manrope'] text-3xl mb-4">Pilot with us.</h3>
            <p className="text-white/70 leading-relaxed mb-6">
              We are looking for churches that want to modernize giving, reduce friction,
              and help us build the trust layer for something bigger.
            </p>
            <div className="flex items-center gap-3 text-[#d9ebff] font-medium">
              <ArrowRight className="w-5 h-5 text-[#7dd3fc]" />
              Start with one launch conversation.
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

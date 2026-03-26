import { motion } from "motion/react";
import { ArrowRight, CheckCircle2 } from "lucide-react";

const bullets = [
  "A giving page that feels warm, modern, and easy to trust",
  "Better mobile layout for real donors, not just church admins",
  "Cleaner fund choices and clearer calls to action",
  "A stronger first impression than Realm-style generic forms",
];

export function GivingPageSlide() {
  return (
    <div className="relative w-full min-h-screen md:h-screen overflow-hidden bg-gradient-to-br from-[#0d1830] via-[#15254a] to-[#0e1b35]">
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-6">
            <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">07 — Giving Experience</span>
          </div>
          <h2 className="font-['Manrope'] text-4xl md:text-6xl lg:text-7xl mb-5 leading-tight">
            Giving pages should feel
            <br />
            <span className="text-[#7dd3fc]">clear, warm, and modern.</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Most church giving pages feel generic and dusty. We can make the first giving experience
            feel more like the church itself.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[0.95fr_1.05fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-4"
          >
            {bullets.map((bullet, index) => (
              <motion.div
                key={bullet}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-5"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#78f0c5] mt-0.5 flex-shrink-0" />
                  <p className="text-white/80 leading-relaxed">{bullet}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="flex items-center gap-3 text-[#d9e8ff] text-base pt-2"
            >
              <ArrowRight className="w-5 h-5 text-[#7dd3fc]" />
              Better design is not fluff. It increases trust.
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25, duration: 0.8 }}
            className="rounded-[2rem] bg-white border border-white/10 shadow-2xl p-5 text-[#1c2e51]"
          >
            <div className="rounded-[1.6rem] overflow-hidden bg-[#f5f9ff] border border-[#d8e5fb]">
              <div className="h-24 bg-gradient-to-r from-[#10346b] to-[#1b4f9c] flex items-end p-6">
                <div>
                  <div className="text-white/70 text-xs uppercase tracking-[0.2em] mb-2">Example Church</div>
                  <div className="text-white text-3xl font-semibold tracking-tight">Give with confidence</div>
                </div>
              </div>
              <div className="p-6 space-y-5">
                <div>
                  <div className="text-sm font-semibold mb-2 text-[#54688e]">Choose a fund</div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-2xl bg-white border border-[#dbe6f7] p-4">
                      <div className="font-semibold">General Fund</div>
                      <div className="text-sm text-[#6c7ea2] mt-1">Support the everyday work</div>
                    </div>
                    <div className="rounded-2xl bg-white border border-[#dbe6f7] p-4">
                      <div className="font-semibold">Missions</div>
                      <div className="text-sm text-[#6c7ea2] mt-1">Fuel outreach and sending</div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-sm font-semibold mb-2 text-[#54688e]">Choose an amount</div>
                  <div className="grid grid-cols-4 gap-3">
                    {['25', '50', '100', '250'].map((amt, i) => (
                      <div key={amt} className={`rounded-xl p-3 text-center font-semibold border ${i===1 ? 'bg-[#10346b] text-white border-[#10346b]' : 'bg-white border-[#dbe6f7]'}`}>
                        ${amt}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl bg-white border border-[#dbe6f7] p-4">
                  <div className="text-sm font-semibold mb-2 text-[#54688e]">Giving method</div>
                  <div className="flex gap-3 text-sm">
                    <div className="rounded-xl px-4 py-2 bg-[#eef5ff] border border-[#d6e5ff]">Bank transfer</div>
                    <div className="rounded-xl px-4 py-2 bg-white border border-[#dbe6f7]">Card</div>
                  </div>
                </div>
                <button className="w-full rounded-2xl py-4 bg-[#10346b] text-white text-lg font-semibold">Continue Giving</button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

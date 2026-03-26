import { motion } from "motion/react";
import { Smartphone, CreditCard, TrendingDown } from "lucide-react";

const features = [
  {
    title: "Tap to Connect",
    subtitle: "Physical meets digital",
    description:
      "Use one simple tap point for sermon notes, announcements, next steps, and giving — not just a money ask.",
    icon: Smartphone,
    color: "from-[#63b3ff] to-[#7dd3fc]",
  },
  {
    title: "Modern Giving Pages",
    subtitle: "Branded and trustworthy",
    description:
      "A giving experience that feels more like the church and less like a generic payment form.",
    icon: CreditCard,
    color: "from-[#4f8ff7] to-[#78f0c5]",
  },
  {
    title: "Lower Fees, Higher Impact",
    subtitle: "ACH migration",
    description:
      "Move recurring givers off expensive card rails and help more money reach the mission.",
    icon: TrendingDown,
    color: "from-[#78f0c5] to-[#7dd3fc]",
  },
];

export function ProductSlide() {
  return (
    <div className="relative w-full min-h-screen md:h-screen overflow-hidden bg-gradient-to-br from-[#091426] via-[#13264a] to-[#10203d]">
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-6">
            <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">05 — Phase 1 Offer</span>
          </div>

          <h2 className="font-['Manrope'] text-4xl md:text-6xl lg:text-7xl mb-5 leading-tight">
            What churches get
            <br />
            <span className="text-[#7dd3fc]">right away.</span>
          </h2>

          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            A cleaner front door, a better path to lower-cost giving, and a more useful in-room connection tool.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
          <div className="space-y-5">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.12, duration: 0.7 }}
                className="rounded-3xl bg-white/6 border border-white/10 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <h3 className="text-2xl font-['Manrope'] text-white">{feature.title}</h3>
                      <span className="text-xs uppercase tracking-[0.18em] text-white/40">{feature.subtitle}</span>
                    </div>
                    <p className="text-white/62 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.45, duration: 0.8 }}
            className="rounded-3xl bg-white/6 border border-white/10 p-8 backdrop-blur-sm"
          >
            <img
              src="/assets/clearpath-tap-to-connect-mockup.jpg"
              alt="Clear Path Tap to Connect"
              className="w-full max-h-[500px] object-contain rounded-2xl mx-auto"
            />
            <div className="mt-5 text-center text-white/58 text-sm uppercase tracking-[0.18em]">
              Clear Path Tap to Connect concept
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

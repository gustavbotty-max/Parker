import { motion } from "motion/react";
import { Users, Building2, TrendingUp, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    icon: Users,
    title: "Churches are already generous",
    description: "Giving and service are already part of the culture. We are not trying to invent that behavior.",
  },
  {
    icon: Building2,
    title: "Churches can help build trust fast",
    description: "If the platform becomes trusted here first, later adoption in harder support environments becomes much easier.",
  },
  {
    icon: CheckCircle2,
    title: "Churches help us prove the model",
    description: "We can show visible wins early: better giving pages, ACH migration, and more useful in-room connection tools.",
  },
  {
    icon: TrendingUp,
    title: "That trust makes the bigger mission possible",
    description: "The goal is not just better church tech. The goal is building the trust layer for something larger.",
  },
];

export function WhyChurchesSlide() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#0b1730] via-[#122448] to-[#10203d]">
      <div className="relative z-20 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-6">
            <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">04 — Why Churches First</span>
          </div>
          <h2 className="font-['Manrope'] text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight">
            Start with the people who
            <br />
            <span className="text-[#7dd3fc]">already know how to give.</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Churches are not just a market. They are the right first proving ground for a trust-first platform.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.12, duration: 0.7 }}
              className="rounded-3xl bg-white/6 border border-white/10 p-7"
            >
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#63b3ff]/25 to-[#78f0c5]/18 flex items-center justify-center flex-shrink-0">
                  <reason.icon className="w-7 h-7 text-[#8ed0ff]" />
                </div>
                <div>
                  <h3 className="text-2xl font-['Manrope'] mb-2 text-white">{reason.title}</h3>
                  <p className="text-white/62 leading-relaxed">{reason.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

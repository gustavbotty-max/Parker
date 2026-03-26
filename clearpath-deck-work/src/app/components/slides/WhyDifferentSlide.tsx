import { motion } from "motion/react";
import { Smartphone, HeartHandshake, Landmark } from "lucide-react";

const pillars = [
  {
    icon: Smartphone,
    title: "Connect",
    description:
      "Tap to Connect gives churches a warmer digital front door for notes, announcements, next steps, and giving.",
  },
  {
    icon: HeartHandshake,
    title: "Give",
    description:
      "We improve the giving experience with better design, easier ACH adoption, and less friction for generous people.",
  },
  {
    icon: Landmark,
    title: "Grow",
    description:
      "Clear Path can grow into a deeper trust layer with fund transparency, treasury features, and money deployment over time.",
  },
];

export function WhyDifferentSlide() {
  return (
    <div className="relative w-full min-h-screen md:h-screen overflow-hidden bg-gradient-to-br from-[#091426] via-[#0e1d38] to-[#13284c]">
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-6">
            <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">08 — Why Clear Path</span>
          </div>
          <h2 className="font-['Manrope'] text-4xl md:text-6xl lg:text-7xl mb-5 leading-tight">
            More than connection.
            <br />
            <span className="text-[#7dd3fc]">More than giving.</span>
          </h2>
          <p className="text-lg md:text-2xl text-white/70 max-w-3xl leading-relaxed">
            Clear Path starts with connection, but it is built to become a deeper trust and money movement layer over time.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.12, duration: 0.7 }}
              className="rounded-3xl bg-white/6 border border-white/10 p-7 backdrop-blur-sm"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#63b3ff]/25 to-[#78f0c5]/18 flex items-center justify-center mb-5">
                <pillar.icon className="w-7 h-7 text-[#8ed0ff]" />
              </div>
              <h3 className="font-['Manrope'] text-3xl mb-3 text-white">{pillar.title}</h3>
              <p className="text-white/62 leading-relaxed text-lg">{pillar.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

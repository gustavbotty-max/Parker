import { motion } from "motion/react";
import { X } from "lucide-react";

const problems = [
  {
    title: "Outdated giving pages",
    description: "They feel generic, dusty, and disconnected from the church’s actual brand and mission.",
  },
  {
    title: "Card fee drag",
    description: "A meaningful slice of every digital gift disappears into processing friction.",
  },
  {
    title: "Too many disconnected tools",
    description: "Giving, communication, connection, and admin often live in separate systems.",
  },
  {
    title: "Weak visibility into designated funds",
    description: "It is still too hard to clearly show where special-purpose money goes.",
  },
  {
    title: "No useful in-room connection layer",
    description: "Physical church spaces still lack a simple modern bridge to next steps, notes, and giving.",
  },
];

export function ProblemSlide() {
  return (
    <div className="relative w-full min-h-screen md:h-screen overflow-hidden bg-gradient-to-br from-[#091426] to-[#142a4f]">
      <div className="absolute inset-0">
        <img src="/assets/raleigh-skyline.jpg" alt="Raleigh skyline" className="w-full h-full object-cover opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#091426]/96 via-[#091426]/93 to-[#10203d]/78" />
      </div>

      <div className="relative z-10 h-full flex items-center px-6 md:px-12 lg:px-20">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 w-full max-w-7xl mx-auto">
          <div className="flex flex-col justify-center">
            <div className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-6 w-fit">
              <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">03 — The Problem</span>
            </div>
            <h2 className="font-['Manrope'] text-5xl md:text-6xl mb-6 leading-tight">
              Current tools are
              <br />
              <span className="text-[#7dd3fc]">holding churches back.</span>
            </h2>
            <p className="text-xl text-white/65 leading-relaxed mb-8 max-w-xl">
              Churches are often stuck with old-looking giving tools, expensive rails,
              and too many systems that do not talk to each other.
            </p>
            <div className="rounded-3xl bg-white/6 border border-white/10 p-7 max-w-xl">
              <div className="text-[#8ed0ff] text-sm uppercase tracking-[0.18em] mb-3">What this means</div>
              <p className="text-white/78 leading-relaxed">
                More friction for the church, less confidence for the giver, and too much money lost before it reaches the mission.
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center space-y-4">
            {problems.map((problem, index) => (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.08, duration: 0.6 }}
                className="rounded-2xl bg-white/6 backdrop-blur-sm border border-white/10 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-red-500/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <X className="w-4 h-4 text-red-300" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-['Manrope'] mb-2 text-white">{problem.title}</h3>
                    <p className="text-white/58 leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

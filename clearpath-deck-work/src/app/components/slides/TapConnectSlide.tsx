import { motion } from "motion/react";
import { Smartphone, Bell, BookOpen, HeartHandshake } from "lucide-react";

const uses = [
  {
    icon: BookOpen,
    title: "Sermon notes",
    description: "One tap can open notes, message points, or this week’s next steps.",
  },
  {
    icon: Bell,
    title: "Announcements",
    description: "Share events, signups, and updates without making people hunt for links.",
  },
  {
    icon: HeartHandshake,
    title: "Giving when ready",
    description: "Giving stays in the flow, but the first feeling is connection, not pressure.",
  },
];

export function TapConnectSlide() {
  return (
    <div className="relative w-full min-h-screen md:h-screen overflow-hidden bg-gradient-to-br from-[#091426] via-[#10203a] to-[#0f1d34]">
      <div className="relative z-10 h-full flex flex-col justify-center px-6 md:px-12 lg:px-20 max-w-7xl mx-auto py-16 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-6">
            <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">06 — Tap to Connect</span>
          </div>
          <h2 className="font-['Manrope'] text-4xl md:text-6xl lg:text-7xl mb-5 leading-tight">
            A better first feeling than
            <br />
            <span className="text-[#7dd3fc]">“give us money.”</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Tap to Connect turns a small physical tool into a warm digital front door for notes,
            announcements, next steps, and giving.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm p-8"
          >
            <img
              src="/assets/clearpath-tap-to-connect-mockup.jpg"
              alt="Clear Path Tap to Connect mockup"
              className="w-full max-h-[480px] object-contain rounded-2xl mx-auto"
            />
          </motion.div>

          <div className="space-y-5">
            {uses.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 + index * 0.12, duration: 0.7 }}
                className="rounded-2xl bg-white/5 border border-white/10 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#63b3ff]/30 to-[#78f0c5]/20 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-6 h-6 text-[#8ed0ff]" />
                  </div>
                  <div>
                    <h3 className="font-['Manrope'] text-2xl mb-2">{item.title}</h3>
                    <p className="text-white/65 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="rounded-2xl bg-gradient-to-r from-[#63b3ff]/12 to-[#78f0c5]/10 border border-[#63b3ff]/20 p-5"
            >
              <div className="flex items-center gap-3 text-[#cfe8ff] text-sm uppercase tracking-[0.18em] mb-2">
                <Smartphone className="w-4 h-4" />
                Simple by design
              </div>
              <p className="text-white/72 leading-relaxed">
                The point is not to wow people with tech. The point is to make the next step feel easy.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

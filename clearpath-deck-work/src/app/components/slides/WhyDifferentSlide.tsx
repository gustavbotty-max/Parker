import { motion } from "motion/react";

const rows = [
  {
    category: "Tap / connect layer",
    others: "Often focused on communication or generic QR/NFC actions",
    clearpath: "Built to lead into trust, giving, and a stronger financial layer",
  },
  {
    category: "Giving layer",
    others: "Often looks generic, fee-focused, or disconnected from the church brand",
    clearpath: "Cleaner giving experience with ACH migration and trust-first design",
  },
  {
    category: "Future treasury layer",
    others: "Usually absent",
    clearpath: "Balances, transparency, yield participation, and later controlled spend",
  },
];

export function WhyDifferentSlide() {
  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-[#091426] via-[#0e1d38] to-[#13284c]">
      <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-16 lg:px-24 max-w-7xl mx-auto py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-10"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-[#63b3ff]/15 border border-[#63b3ff]/30 mb-6">
            <span className="text-[#8ed0ff] tracking-wider uppercase text-xs">08 — Why Clear Path</span>
          </div>
          <h2 className="font-['Manrope'] text-5xl md:text-6xl lg:text-7xl mb-5 leading-tight">
            We are not just another
            <br />
            <span className="text-[#7dd3fc]">church tech tool.</span>
          </h2>
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            Some tools help churches message. Some help them collect. Clear Path is built to connect,
            trust, give, and eventually manage how money moves after the gift.
          </p>
        </motion.div>

        <div className="rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="grid grid-cols-[1.1fr_1fr_1fr] bg-white/5 border-b border-white/10">
            <div className="p-5 text-white/50 uppercase tracking-[0.18em] text-xs">Category</div>
            <div className="p-5 text-white/50 uppercase tracking-[0.18em] text-xs">Typical tools</div>
            <div className="p-5 text-[#8ed0ff] uppercase tracking-[0.18em] text-xs">Clear Path</div>
          </div>

          {rows.map((row, index) => (
            <motion.div
              key={row.category}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.12, duration: 0.7 }}
              className="grid grid-cols-[1.1fr_1fr_1fr] border-b border-white/10 last:border-b-0"
            >
              <div className="p-6 text-xl font-semibold text-white">{row.category}</div>
              <div className="p-6 text-white/60 leading-relaxed">{row.others}</div>
              <div className="p-6 text-white/85 leading-relaxed bg-[#63b3ff]/[0.05]">{row.clearpath}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

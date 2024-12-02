import { motion } from "framer-motion";
import { useState } from "react";

const generateRandomLines = (count: number) => {
  return Array.from({ length: count }, () => ({
    top: Math.random() * 100,
    left: Math.random() * 100,
    opacity: 0.1 + Math.random() * 0.2,
    width: 50 + Math.random() * 150,
  }));
};

export const BackgroundLines = () => {
  const [randomLines] = useState(() => generateRandomLines(8));

  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full">
        {randomLines.map((line, i) => (
          <motion.div
            key={i}
            className="absolute h-[2px] bg-primary/20"
            style={{
              width: `${line.width}px`,
              top: `${line.top}%`,
              left: `${line.left}%`,
              opacity: line.opacity,
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: line.opacity, x: 0 }}
            transition={{ 
              duration: 0.8,
              delay: i * 0.1,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
    </div>
  );
};
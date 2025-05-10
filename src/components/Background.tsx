import { motion } from "motion/react";

// Star component for the background
const Star = ({
  delay,
  size,
  x,
  y,
}: {
  delay: number;
  size: number;
  x: number;
  y: number;
}) => {
  return (
    <motion.div
      className="absolute rounded-full bg-white"
      style={{
        width: size,
        height: size,
        left: `${x}%`,
        top: `${y}%`,
      }}
      animate={{
        opacity: [0, 1, 0],
        scale: [0, 1, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
};

export const Background = () => {
  // Generate random stars
  const stars = Array.from({ length: 50 }, () => ({
    delay: Math.random() * 2,
    size: Math.random() * 2 + 1,
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute w-96 h-96 -top-48 -left-48 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute w-96 h-96 -bottom-48 -right-48 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>
        <div className="absolute w-96 h-96 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20"></div>

        {/* Twinkling Stars */}
        {stars.map((star, index) => (
          <Star key={index} {...star} />
        ))}
      </div>
    </div>
  );
};

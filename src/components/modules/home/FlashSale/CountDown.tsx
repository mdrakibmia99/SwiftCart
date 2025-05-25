'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

type TimeLeft = {
  hours: number;
  minutes: number;
  seconds: number;
};

export default function CountDown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const calculateTimeLeft = (): TimeLeft => {
    const now = new Date();
    const midnight = new Date();
    midnight.setHours(24, 0, 0, 0);

    const diff = midnight.getTime() - now.getTime();

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { hours, minutes, seconds };
  };

  useEffect(() => {
    setTimeLeft(calculateTimeLeft());
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Properly typed animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
      },
    },
  };

  const pulseAnimation = {
    scale: [1, 1.05, 1],
    transition: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: 'reverse' as const,
    },
  };

  const numberVariants: Variants = {
    initial: { scale: 1, color: 'inherit' },
    change: {
      scale: [1.2, 1],
      color: ['#ff0000', 'inherit'],
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col md:flex-row items-center justify-center gap-4 text-gray-800"
    >
      {(['hours', 'minutes', 'seconds'] as const).map((unit) => (
        <motion.div
          key={unit}
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          animate={unit === 'seconds' ? pulseAnimation : undefined}
          className={`px-3 py-1 rounded-full ${
            unit === 'seconds'
              ? 'border border-red-500 text-red-500'
              : 'bg-secondary'
          }`}
        >
          <div className="flex items-center gap-2">
            <motion.span
              key={`${unit}-${timeLeft[unit]}`}
              initial="initial"
              animate="change"
              variants={numberVariants}
              className="text-sm font-bold"
            >
              {timeLeft[unit].toString().padStart(2, '0')}
            </motion.span>
            <span className="text-sm text-primary">
              {unit.charAt(0).toUpperCase() + unit.slice(1)}
            </span>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
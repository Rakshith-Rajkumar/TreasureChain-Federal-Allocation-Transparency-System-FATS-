export const containerVariants = {
    animate: {
      transition: { staggerChildren: 0.15 },
    },
  };
  
  export const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };
  
  export const hoverEffect = { whileHover: { scale: 1.02 } };
export function appleModalAnimation() {
  return {
    from: {
      opacity: 0,
      scale: 0.92,
      y: 8,
      transition: {
        type: 'easeOut',
        duration: 0.15,
      }
    },
    to: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 380,
        damping: 26,
        mass: 0.8,
      }
    }
  };
}

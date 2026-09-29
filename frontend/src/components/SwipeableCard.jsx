import { forwardRef, useImperativeHandle } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

const SwipeableCard = forwardRef(({ children, onSwipe, isTop }, ref) => {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const forkOpacity = useTransform(x, [20, 120], [0, 1]);
  const ignoreOpacity = useTransform(x, [-120, -20], [1, 0]);

  const fly = (direction) => {
    animate(x, direction === "right" ? 600 : -600, {
      duration: 0.3,
      ease: "easeOut",
      onComplete: () =>
        onSwipe(direction === "right" ? "interested" : "ignored"),
    });
  };

  // Lets Feed.jsx trigger a swipe programmatically from the X / fork buttons
  useImperativeHandle(ref, () => ({
    swipe: (status) => fly(status === "interested" ? "right" : "left"),
  }));

  const handleDragEnd = (event, info) => {
    if (info.offset.x > 120) fly("right");
    else if (info.offset.x < -120) fly("left");
    else animate(x, 0, { type: "spring", stiffness: 300, damping: 30 });
  };

  return (
    <motion.div
      style={{ x, rotate, touchAction: "none", willChange: "transform" }}
      drag={isTop ? "x" : false}
      dragElastic={0.7}
      dragMomentum={false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className="absolute cursor-grab active:cursor-grabbing"
    >
      <motion.div
        style={{ opacity: forkOpacity }}
        className="absolute top-8 left-8 z-10 border-4 border-success text-success font-extrabold text-2xl px-3 py-1 rounded-lg -rotate-12 pointer-events-none"
      >
        INTERESTED
      </motion.div>
      <motion.div
        style={{ opacity: ignoreOpacity }}
        className="absolute top-8 right-8 z-10 border-4 border-error text-error font-extrabold text-2xl px-3 py-1 rounded-lg rotate-12 pointer-events-none"
      >
        IGNORE
      </motion.div>

      {children}
    </motion.div>
  );
});

SwipeableCard.displayName = "SwipeableCard";
export default SwipeableCard;
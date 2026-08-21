"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useEffect, useState } from "react";

export function StickyScanCta({ label }: { label: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function updateVisibility() {
      const hero = document.querySelector<HTMLElement>(".transformation-hero");
      const projectBrief = document.getElementById("projectbrief");
      const heroPassed = Boolean(hero && hero.getBoundingClientRect().bottom < 0);
      const briefRect = projectBrief?.getBoundingClientRect();
      const briefVisible = Boolean(
        briefRect && briefRect.top < window.innerHeight && briefRect.bottom > 0,
      );

      setVisible(heroPassed && !briefVisible);
    }

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility);

    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {visible && (
          <motion.a
            animate={{ opacity: 1, y: 0 }}
            className="sticky-scan-cta"
            exit={{ opacity: 0, y: 12 }}
            href="#projectbrief"
            initial={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
          >
            <i aria-hidden="true" />
            {label}
            <span aria-hidden="true">↓</span>
          </motion.a>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
}

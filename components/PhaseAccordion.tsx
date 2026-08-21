"use client";

import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import { useState } from "react";

export type Phase = {
  number: string;
  name: string;
  question: string;
  goal: string;
  activities: readonly string[];
  tools: readonly string[];
  output: string;
};

export type PhaseLabels = {
  goal: string;
  activities: string;
  tools: string;
  output: string;
  open: string;
  close: string;
};

export function PhaseAccordion({ phases, labels }: { phases: readonly Phase[]; labels: PhaseLabels }) {
  const [openPhase, setOpenPhase] = useState(0);

  return (
    <MotionConfig reducedMotion="user">
      <div className="phase-accordion">
        {phases.map((phase, index) => {
          const isOpen = index === openPhase;
          const panelId = `phase-panel-${phase.number}`;
          const triggerId = `phase-trigger-${phase.number}`;

          return (
            <article
              className={isOpen ? "phase-card open" : "phase-card"}
              id={`phase-${phase.number}`}
              key={phase.number}
            >
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                aria-label={`${isOpen ? labels.close : labels.open}: ${phase.name}`}
                className="phase-trigger"
                id={triggerId}
                onClick={() => {
                  setOpenPhase(isOpen ? -1 : index);
                }}
                title={`${isOpen ? labels.close : labels.open}: ${phase.name}`}
                type="button"
              >
                <span>{phase.number}</span>
                <div><h3>{phase.name}</h3><p>{phase.question}</p></div>
                <i aria-hidden="true">{isOpen ? "−" : "+"}</i>
              </button>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    animate={{ height: "auto", opacity: 1 }}
                    aria-labelledby={triggerId}
                    className="phase-panel"
                    exit={{ height: 0, opacity: 0 }}
                    id={panelId}
                    initial={{ height: 0, opacity: 0 }}
                    role="region"
                    transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="phase-panel-inner">
                      <div className="phase-detail phase-goal"><small>{labels.goal}</small><p>{phase.goal}</p></div>
                      <div className="phase-detail"><small>{labels.activities}</small><ul>{phase.activities.map((activity) => <li key={activity}>{activity}</li>)}</ul></div>
                      <div className="phase-detail"><small>{labels.tools}</small><div className="phase-tools">{phase.tools.map((tool) => <span key={tool}>{tool}</span>)}</div></div>
                      <div className="phase-detail phase-output"><small>{labels.output}</small><p>{phase.output}</p></div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </MotionConfig>
  );
}

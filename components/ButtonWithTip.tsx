import { Tooltip } from "radix-ui";
import { motion } from "framer-motion";

export default function ButtonWithTip({
  action,
  icon,
  tip,
  side = "top",
  ariaControls,
  ariaExpanded,
}: {
  action: () => void;
  icon: React.ReactNode;
  tip: string;
  side?: "top" | "right" | "bottom" | "left";
  ariaControls?: string;
  ariaExpanded?: boolean;
}) {
  return (
    <Tooltip.Provider>
      <Tooltip.Root delayDuration={200}>
        <Tooltip.Trigger asChild>
          <button
            aria-controls={ariaControls}
            aria-expanded={ariaExpanded}
            aria-label={tip}
            type="button"
            onClick={action}
            className="p-3 rounded-lg bg-indigo-200/50 backdrop-blur-xl hover:bg-indigo-300 focus:bg-indigo-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700 dark:text-neutral-50 shadow dark:shadow-none transition-colors duration-300 cursor-pointer outline-indigo-500 dark:outline-white outline-offset-4"
          >
            <span aria-hidden>{icon}</span>
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content side={side} sideOffset={6} forceMount asChild>
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              transition={{ duration: 0.2 }}
              className="bg-indigo-300 text-indigo-900 dark:text-neutral-50 dark:bg-neutral-700 text-xs px-3 py-2 rounded-lg"
            >
              {tip}
              <Tooltip.Arrow className="fill-indigo-300 dark:fill-neutral-700" />
            </motion.div>
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}

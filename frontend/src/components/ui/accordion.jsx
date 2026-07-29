import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "../../lib/utils";

const AccordionContext = React.createContext({
  openItem: null,
  toggleItem: () => {},
});

const Accordion = ({ children, className, type = "single", defaultValue = null, collapsible = true }) => {
  const [openItem, setOpenItem] = React.useState(defaultValue);

  const toggleItem = React.useCallback(
    (value) => {
      setOpenItem((prev) => (prev === value && collapsible ? null : value));
    },
    [collapsible]
  );

  return (
    <AccordionContext.Provider value={{ openItem, toggleItem }}>
      <div className={cn("space-y-3", className)}>{children}</div>
    </AccordionContext.Provider>
  );
};

const AccordionItem = React.forwardRef(({ value, className, children, ...props }, ref) => {
  const { openItem } = React.useContext(AccordionContext);
  const isOpen = openItem === value;

  return (
    <div
      ref={ref}
      className={cn(
        "rounded-2xl border border-border bg-surface transition-all duration-300 overflow-hidden",
        isOpen ? "shadow-soft border-primary/40 ring-1 ring-primary/20" : "hover:border-primary/30",
        className
      )}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, { itemValue: value });
        }
        return child;
      })}
    </div>
  );
});
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef(({ className, children, itemValue, ...props }, ref) => {
  const { openItem, toggleItem } = React.useContext(AccordionContext);
  const isOpen = openItem === itemValue;

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => toggleItem(itemValue)}
      aria-expanded={isOpen}
      className={cn(
        "flex w-full items-center justify-between p-5 text-left font-semibold text-text text-base md:text-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-2xl",
        isOpen ? "text-primary" : "hover:text-primary",
        className
      )}
      {...props}
    >
      <span>{children}</span>
      <ChevronDown
        className={cn(
          "h-5 w-5 shrink-0 text-text-secondary transition-transform duration-300 ease-out",
          isOpen && "rotate-180 text-primary"
        )}
      />
    </button>
  );
});
AccordionTrigger.displayName = "AccordionTrigger";

const AccordionContent = React.forwardRef(({ className, children, itemValue, ...props }, ref) => {
  const { openItem } = React.useContext(AccordionContext);
  const isOpen = openItem === itemValue;

  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      className={cn(
        "px-5 pb-5 pt-0 text-sm md:text-base text-text-secondary leading-relaxed animate-in fade-in-50 duration-200",
        className
      )}
      {...props}
    >
      <div className="pt-2 border-t border-border/50">{children}</div>
    </div>
  );
});
AccordionContent.displayName = "AccordionContent";

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

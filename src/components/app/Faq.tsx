import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";

export type FaqItem = { question: string; answer: string };

/** Questions people actually ask, answered in a single-open accordion. */
export function Faq({
  items,
  className,
}: {
  items: FaqItem[];
  className?: string;
}) {
  return (
    <Accordion
      type="single"
      collapsible
      className={cn(
        "mx-auto max-w-3xl divide-y divide-border rounded-2xl border border-border bg-card px-6",
        className,
      )}
    >
      {items.map(({ question, answer }) => (
        <AccordionItem key={question} value={question} className="border-0">
          <AccordionTrigger className="py-5 text-left text-base font-semibold text-foreground hover:no-underline [&[data-state=open]]:text-primary">
            {question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-base leading-relaxed text-muted-foreground">
            {answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

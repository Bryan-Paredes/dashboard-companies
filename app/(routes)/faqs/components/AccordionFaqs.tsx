import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { dataFaqs } from "./accordionFaqs.data";

export default function AccordionFaqs() {
  return (
    <div>
      <Accordion type="single" collapsible>
        {dataFaqs.map((faq) => (
          <AccordionItem key={faq.id} value={faq.question}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

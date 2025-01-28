import React from "react";
import AccordionFaqs from "./components/AccordionFaqs";

export default function FaqsPage() {
  return (
    <div className="max-w-4xl mx-auto bg-background shadow-md rounded-lg p-4">
      <h2 className="mb-8 text-3xl">FAQs</h2>
      <div className="mb-5 flex flex-col gap-3">
        <p>
          ¿Preguntas Frecuentes (FAQs)? ¿Tienes alguna duda sobre cómo funciona
          nuestro dashboard empresarial? En esta sección, te ayudamos a resolver
          las preguntas más frecuentes que pueden surgir. Aquí encontrarás
          información sobre cómo acceder a tu panel de control, personalizar las
          métricas que más te interesan, integrar el dashboard con otras
          herramientas que ya uses en tu negocio, y mucho más.
        </p>
        <p>
          Si necesitas orientación adicional o no encuentras lo que buscas,
          nuestro equipo de soporte está siempre disponible para asistirte.
          Queremos que tu experiencia sea lo más sencilla y productiva posible,
          para que puedas enfocarte en lo que realmente importa: hacer crecer tu
          negocio. ¡Estamos aquí para ayudarte en cada paso del camino!
        </p>
      </div>
      <AccordionFaqs />
    </div>
  );
}

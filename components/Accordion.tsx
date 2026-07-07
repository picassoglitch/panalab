export function AccordionItem({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <details className="group border-b border-sand">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-semibold [&::-webkit-details-marker]:hidden">
        {title}
        <span className="text-xl font-light text-brand transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <div className="pb-5 leading-relaxed text-ink-soft">{children}</div>
    </details>
  );
}

export default function Accordion({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-sand">{children}</div>;
}

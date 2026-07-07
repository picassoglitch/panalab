export default function Disclaimer({ text }: { text?: string }) {
  return (
    <p className="rounded-card border border-accent/30 bg-accent/10 px-4 py-3 text-sm leading-relaxed text-ink-soft">
      <span className="font-semibold text-accent-dark">Importante: </span>
      {text ??
        "Esta información no sustituye una valoración médica. Consulte a su médico."}
    </p>
  );
}

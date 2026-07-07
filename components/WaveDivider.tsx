export default function WaveDivider({
  fill,
  bg = "transparent",
  flip = false,
}: {
  fill: string;
  bg?: string;
  flip?: boolean;
}) {
  return (
    <div style={{ background: bg }} aria-hidden="true">
      <svg
        viewBox="0 0 1440 56"
        preserveAspectRatio="none"
        className={`block h-8 w-full sm:h-14 ${flip ? "rotate-180" : ""}`}
      >
        <path
          d="M0 30 C 90 44, 180 16, 270 26 C 360 36, 450 12, 540 24 C 630 36, 720 46, 810 32 C 900 18, 990 14, 1080 26 C 1170 38, 1260 20, 1350 26 C 1395 29, 1420 31, 1440 30 L 1440 56 L 0 56 Z"
          fill={fill}
        />
      </svg>
    </div>
  );
}

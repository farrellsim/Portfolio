export default function BrandLogo({ theme, variant = "horizontal", height, eager = false }) {
  const isDark = theme === "dark";
  const isStacked = variant === "stacked";
  const file = isStacked
    ? isDark ? "/logo-stacked-white.png" : "/logo-stacked.png"
    : isDark ? "/logo-horizontal-white.png" : "/logo-horizontal.png";
  const width = isStacked ? 524 : 727;
  const heightAttr = isStacked ? 360 : 121;
  return (
    <img
      src={file}
      alt="builtbyxaviero"
      className="brand-logo"
      width={width}
      height={heightAttr}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      style={{ height: height || "auto", width: "auto" }}
    />
  );
}

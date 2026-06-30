import BrandLogo from "./BrandLogo";

export default function Footer({ theme }) {
  return (
    <footer className="footer">
      <BrandLogo theme={theme} variant="horizontal" height="14px" />
      <span className="footer__sep">·</span>
      <span>built with care, {new Date().getFullYear()}</span>
    </footer>
  );
}

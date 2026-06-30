import { useCallback, useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { data } from "../data";

function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    "N:;Farrell;;;",
    "FN:Farrell",
    `EMAIL;TYPE=INTERNET:${data.email}`,
    "TEL;TYPE=CELL:+6285121540990",
    "NOTE:builtbyxaviero",
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

export default function DigitalCard({ open, onClose }) {
  const [flipped, setFlipped] = useState(false);

  const close = useCallback(() => {
    setFlipped(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") close(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, close]);

  if (!open) return null;

  const vcard = buildVCard();

  const downloadVcf = () => {
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Farrell.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const flip = () => setFlipped((f) => !f);

  return (
    <div className="card-modal" onClick={close} role="dialog" aria-modal="true" aria-label="Digital business card">
      <div className="card-modal__scene" onClick={(e) => e.stopPropagation()}>
        <button className="card-modal__close" onClick={close} aria-label="Close">×</button>

        <div className={`card-modal__flipper ${flipped ? "is-flipped" : ""}`}>
          {/* Front photo card */}
          <button
            type="button"
            className="card-modal__face card-modal__face--front"
            onClick={flip}
            aria-label="Show QR code"
          >
            <div className="card-modal__photo">
              <img src="/avatar.jpg" alt="Xaviero Kenjiro Farrell" width="600" height="600" />
            </div>
            <div className="card-modal__info">
              <h2 className="card-modal__name">Xaviero Kenjiro Farrell</h2>
              <p className="card-modal__role">Founder</p>
              <div className="card-modal__brand">
                <img src="/logo-horizontal.png" alt="builtbyxaviero" height="18" />
              </div>
            </div>
            <div className="card-modal__flip-btn" aria-hidden="true">
              <span className="card-modal__flip-hint">tap card to scan & save</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 12a9 9 0 0 1-9 9 9 9 0 0 1-6.7-3M3 12a9 9 0 0 1 9-9 9 9 0 0 1 6.7 3" />
                <polyline points="21 3 21 9 15 9" />
                <polyline points="3 21 3 15 9 15" />
              </svg>
            </div>
          </button>

          {/* Back QR and contact details */}
          <div
            className="card-modal__face card-modal__face--back"
            onClick={flip}
            role="button"
            tabIndex={0}
            aria-label="Flip back to photo card"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                flip();
              }
            }}
          >
            <div className="card-modal__back-head">
              <img src="/logo-horizontal.png" alt="builtbyxaviero" height="18" />
            </div>

            <div className="card-modal__qr-btn" aria-hidden="true">
              <div className="card-modal__qr">
                <QRCodeSVG
                  value={vcard}
                  size={160}
                  bgColor="#ffffff"
                  fgColor="#0a0a0a"
                  level="M"
                  marginSize={1}
                />
              </div>
              <span className="card-modal__hint">scan to save · tap card to flip back</span>
            </div>

            <div className="card-modal__details">
              <div className="card-modal__row">
                <span className="card-modal__label">email</span>
                <a href={`mailto:${data.email}`} className="card-modal__value" onClick={(e) => e.stopPropagation()}>{data.email}</a>
              </div>
              <div className="card-modal__row">
                <span className="card-modal__label">phone</span>
                <a href={data.whatsapp} target="_blank" rel="noreferrer" className="card-modal__value" onClick={(e) => e.stopPropagation()}>{data.phone}</a>
              </div>
              <div className="card-modal__row">
                <span className="card-modal__label">web</span>
                <a href="https://www.builtbyxaviero.com" target="_blank" rel="noreferrer" className="card-modal__value" onClick={(e) => e.stopPropagation()}>builtbyxaviero.com</a>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                downloadVcf();
              }}
              className="btn btn--primary card-modal__save"
            >
              save to contacts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

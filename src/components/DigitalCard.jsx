import { useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";
import { data } from "../data";

function buildVCard() {
  const lines = [
    "BEGIN:VCARD",
    "VERSION:3.0",
    `N:Simangasing;Xaviero;Kenjiro Farrell;;`,
    `FN:${data.cardName}`,
    `NICKNAME:${data.nickname}`,
    `ORG:builtbyxaviero`,
    `TITLE:Software Engineer`,
    `EMAIL;TYPE=INTERNET:${data.email}`,
    `TEL;TYPE=CELL:+6285121540990`,
    `URL:https://www.builtbyxaviero.com`,
    `URL;TYPE=LinkedIn:https://${data.linkedin}`,
    `URL;TYPE=Instagram:https://${data.instagramBusiness}`,
    `NOTE:Software Engineering student · Incoming QA Engineer at FWD · Jakarta`,
    "END:VCARD",
  ];
  return lines.join("\r\n");
}

export default function DigitalCard({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const vcard = buildVCard();

  const downloadVcf = () => {
    const blob = new Blob([vcard], { type: "text/vcard;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Xaviero-Farrell.vcf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="card-modal" onClick={onClose} role="dialog" aria-modal="true" aria-label="Digital business card">
      <div className="card-modal__panel" onClick={(e) => e.stopPropagation()}>
        <button className="card-modal__close" onClick={onClose} aria-label="Close">×</button>

        <div className="card-modal__head">
          <span className="card-modal__brand">&lt;x/&gt; builtbyxaviero</span>
        </div>

        <h2 className="card-modal__name">{data.cardName}</h2>
        <p className="card-modal__role">Software Engineer · Incoming QA Engineer at FWD</p>

        <div className="card-modal__qr">
          <QRCodeSVG
            value={vcard}
            size={220}
            bgColor="#ffffff"
            fgColor="#0a0a0a"
            level="M"
            marginSize={2}
          />
        </div>

        <p className="card-modal__hint">scan to save contact</p>

        <div className="card-modal__details">
          <div className="card-modal__row">
            <span className="card-modal__label">email</span>
            <a href={`mailto:${data.email}`} className="card-modal__value">{data.email}</a>
          </div>
          <div className="card-modal__row">
            <span className="card-modal__label">whatsapp</span>
            <a href={data.whatsapp} target="_blank" rel="noreferrer" className="card-modal__value">{data.phone}</a>
          </div>
          <div className="card-modal__row">
            <span className="card-modal__label">web</span>
            <a href="https://www.builtbyxaviero.com" target="_blank" rel="noreferrer" className="card-modal__value">builtbyxaviero.com</a>
          </div>
        </div>

        <button onClick={downloadVcf} className="btn btn--primary card-modal__save">
          save to contacts (.vcf)
        </button>
      </div>
    </div>
  );
}

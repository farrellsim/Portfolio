import { useState } from "react";
import Reveal from "../components/Reveal";
import DigitalCard from "../components/DigitalCard";
import { LinkedInIcon, WhatsAppIcon, InstagramIcon, ArrowIcon } from "../components/Icons";
import { data } from "../data";

export default function Contact() {
  const [cardOpen, setCardOpen] = useState(false);
  return (
    <div className="page-wrap">
      <div className="contact container">
        <Reveal>
          <h1 className="contact__title">
            Let's build something{" "}
            <span className="contact__wave" aria-hidden="true">👀</span>
          </h1>
          <p className="contact__sub">
            Pick whichever you like. I usually reply within a day.
          </p>

          <a
            href={`mailto:${data.email}`}
            className="btn btn--primary contact__btn"
          >
            {data.email}
            <ArrowIcon />
          </a>

          <button
            onClick={() => setCardOpen(true)}
            className="btn btn--ghost contact__card-btn"
          >
            📇 digital business card
          </button>

          <div className="contact__methods">
            <a
              href={data.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="contact__method"
            >
              <WhatsAppIcon />
              <div>
                <span className="contact__method-label">WhatsApp</span>
                <span className="contact__method-value">{data.phone}</span>
              </div>
            </a>

            <a
              href={`https://${data.linkedin}`}
              target="_blank"
              rel="noreferrer"
              className="contact__method"
            >
              <LinkedInIcon />
              <div>
                <span className="contact__method-label">LinkedIn</span>
                <span className="contact__method-value">@xavierokenjirofarrell</span>
              </div>
            </a>

            <a
              href={`https://${data.instagramBusiness}`}
              target="_blank"
              rel="noreferrer"
              className="contact__method"
            >
              <InstagramIcon />
              <div>
                <span className="contact__method-label">Instagram · business</span>
                <span className="contact__method-value">@builtbyxaviero</span>
              </div>
            </a>

            <a
              href={`https://${data.instagramPersonal}`}
              target="_blank"
              rel="noreferrer"
              className="contact__method"
            >
              <InstagramIcon />
              <div>
                <span className="contact__method-label">Instagram · personal</span>
                <span className="contact__method-value">@farrell.sim</span>
              </div>
            </a>
          </div>
        </Reveal>
      </div>
      <DigitalCard open={cardOpen} onClose={() => setCardOpen(false)} />
    </div>
  );
}

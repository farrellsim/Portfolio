import PageWrap from "../components/PageWrap";
import Reveal from "../components/Reveal";
import { ArrowIcon } from "../components/Icons";
import { data } from "../data";

export default function Services({ navigate }) {
  return (
    <PageWrap title="What I build.">
      <div className="services">
        {data.services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.05}>
            <div className="service-card">
              <div className="service-card__num">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="service-card__body">
                <h2 className="service-card__title">{s.title}</h2>
                <p className="service-card__blurb">{s.blurb}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.3}>
        <div className="services__cta">
          <p>Got something in mind?</p>
          <button onClick={() => navigate("contact")} className="btn btn--primary">
            let's talk
            <ArrowIcon />
          </button>
        </div>
      </Reveal>
    </PageWrap>
  );
}

import PageWrap from "../components/PageWrap";
import Reveal from "../components/Reveal";
import { data } from "../data";

export default function About() {
  return (
    <PageWrap title="About.">
      <div className="about__layout">
        <Reveal delay={0.05} className="about__photo-wrap">
          <div className="about__photo">
            <img
              src="/avatar.jpg"
              alt={`Portrait of ${data.nickname}`}
              width="600"
              height="600"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about__name">
            <p className="about__name-main">{data.nickname}</p>
            <p className="about__name-sub">{data.name}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="about__text">
            {data.about.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </PageWrap>
  );
}

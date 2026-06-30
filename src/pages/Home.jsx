import Reveal from "../components/Reveal";
import HeroBackdrop from "../components/HeroBackdrop";
import { ArrowIcon } from "../components/Icons";
import { data } from "../data";

export default function Home({ navigate }) {
  return (
    <div className="page-wrap hero-page">
      <HeroBackdrop />
      <div className="container hero-page__inner">
        <Reveal className="hero__simple">
          <p className="hero__greeting">
            {data.hero.greeting}{" "}
            <span className="hero__wave" aria-hidden="true">👋</span>
          </p>
          <h1 className="hero__hook">{data.hero.hook}</h1>
          <p className="hero__sub">{data.hero.sub}</p>

          <div className="hero__cta">
            <button onClick={() => navigate("services")} className="btn btn--primary">
              see what I do
              <ArrowIcon />
            </button>
            <button onClick={() => navigate("contact")} className="btn btn--ghost">
              say hi
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  );
}

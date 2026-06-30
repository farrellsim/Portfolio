import PageWrap from "../components/PageWrap";
import Reveal from "../components/Reveal";
import { ArrowIcon } from "../components/Icons";

export default function Projects({ navigate }) {
  return (
    <PageWrap title="Projects.">
      <Reveal delay={0.05}>
        <div className="coming-soon">
          <p className="coming-soon__big">Coming soon.</p>
          <p className="coming-soon__sub">
            Case studies for <strong>DudukDimana</strong>,{" "}
            <strong>Rauv Studio</strong>, and a few others are being written up.
            In the meantime, ask me about them directly.
          </p>
          <button onClick={() => navigate("contact")} className="btn btn--primary">
            ask me about them
            <ArrowIcon />
          </button>
        </div>
      </Reveal>
    </PageWrap>
  );
}

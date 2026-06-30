import Reveal from "./Reveal";

export default function PageWrap({ title, children }) {
  return (
    <div className="page-wrap">
      <div className="container">
        <Reveal>
          <div className="sh">
            <h1 className="sh__title">{title}</h1>
          </div>
        </Reveal>
        {children}
      </div>
    </div>
  );
}

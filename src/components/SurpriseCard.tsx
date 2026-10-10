import type { ReactNode } from "react";
import Icon, { type IconName } from "./Icon";

function YoutubeCard({ videoId, title }: { videoId: string; title: string }) {
  return (
    <div className="video-frame">
      <iframe
        src={`https://www.youtube-nocookie.com/embed/${videoId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}

export { YoutubeCard };

export default function SurpriseCard({
  index,
  time,
  icon,
  title,
  eyebrow,
  visible,
  children,
}: {
  index: number;
  time: string;
  icon: IconName;
  title: string;
  eyebrow: string;
  visible: boolean;
  children: ReactNode;
}) {
  if (!visible) return null;

  return (
    <article className="surprise-card reveal" id={`hora-${time}`}>
      <div className="card-number">{String(index + 1).padStart(2, "0")}</div>
      <div className="card-heading">
        <span className="card-icon"><Icon name={icon} /></span>
        <div>
          <p className="eyebrow">{time}:00 · {eyebrow}</p>
          <h2>{title}</h2>
        </div>
      </div>
      {children}
    </article>
  );
}

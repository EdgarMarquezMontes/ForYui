import { lazy, Suspense, useState, type CSSProperties } from "react";
import FrogGame from "./components/FrogGame";
import Icon from "./components/Icon";
import LoveLetter from "./components/LoveLetter";
import SurpriseCard, { YoutubeCard } from "./components/SurpriseCard";
import schedule from "./data/schedule";
import { useClock } from "./hooks/useClock";
import { formatCountdown } from "./utils/time";

const ThreeLoveScene = lazy(() => import("./components/ThreeLoveScene"));

const ROSE_IMAGE =
  "https://images.unsplash.com/photo-1516565349308-c76fe36a115c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixlib=rb-4.1.0&q=85&w=1800";
export default function App() {
  const now = useClock();
  const [letterOpen, setLetterOpen] = useState(false);
  const unlocked = (date: string) => now >= new Date(date);
  const unlockedCount = schedule.filter((item) => unlocked(item.unlock)).length;
  const nextChapter = schedule.find((item) => !unlocked(item.unlock));
  const nextUnlock = nextChapter ? new Date(nextChapter.unlock) : null;
  const statusTitle = unlockedCount === 0
    ? "La primera sorpresa llega a la 1:00 p. m."
    : nextChapter
      ? "Una nueva sorpresa cada hora"
      : "Todas las sorpresas están aquí";
  const statusDescription = nextUnlock
    ? `${unlockedCount} de ${schedule.length} sorpresas desbloqueadas · siguiente en ${formatCountdown(nextUnlock, now)}`
    : `${schedule.length} de ${schedule.length} sorpresas desbloqueadas`;

  return (
    <main>
      <div className="grain" />
      <header className="topbar">
        <a href="#inicio" className="brand">
          <img className="brand-logo" src="/Logo.png" alt="" />
          <span>ForYui</span>
        </a>
      </header>

      <section className="hero" id="inicio" style={{ "--rose-image": `url(${ROSE_IMAGE})` } as CSSProperties}>
        <div className="hero-vignette" />
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow">10 · 10 · 2026</p>
          <h1>Una sorpresa<br /><em>para mi amor eterno</em></h1>
          <p className="intro">
            Esta página guarda pequeños secretos para ti. El 10 de octubre, desde la 1:00 p. m.,
            una nueva parte de nuestra historia despertará cada hora.
          </p>
          <p className="ornate-button">9 sorpresas · una cada hora <span>♡</span></p>
          <div className="release-status" aria-live="polite">
            <Icon name={unlockedCount === schedule.length ? "heart" : "lock"} />
            <div>
              <strong>{statusTitle}</strong>
              <span>{statusDescription}</span>
            </div>
            <div
              className="release-progress"
              role="progressbar"
              aria-label="Sorpresas desbloqueadas"
              aria-valuemin={0}
              aria-valuemax={schedule.length}
              aria-valuenow={unlockedCount}
            >
              <span style={{ width: `${(unlockedCount / schedule.length) * 100}%` }} />
            </div>
          </div>
        </div>
        <div className="hero-note"><span>Hecho en la oscuridad</span><i /><span>con todo mi amor</span></div>
      </section>

      {unlockedCount > 0 && <section className="chapters" id="sorpresas">
        <SurpriseCard index={0} time={schedule[0].hour} icon="heart" eyebrow="Cuando la muerte no separa" title="Votos bajo la luna" visible={unlocked(schedule[0].unlock)}>
          <blockquote className="poem">
            <span>“</span>
            <p>Si la noche vistiera de novia<br />y el silencio aprendiera a bailar,<br />buscaría tus manos de hueso y de vida<br />para nunca dejarte de amar.</p>
            <footer>Un poema original, inspirado en el amor que atraviesa dos mundos</footer>
          </blockquote>
        </SurpriseCard>

        <SurpriseCard index={1} time={schedule[1].hour} icon="music" eyebrow="Dale play a nosotros" title="La canción que encontró tu nombre" visible={unlocked(schedule[1].unlock)}>
          <YoutubeCard videoId="XXfntpmrQ08" title="Nuestra canción especial" />
          <p className="caption">Hay canciones que se escuchan. Esta se queda viviendo en el pecho.</p>
        </SurpriseCard>

        <SurpriseCard index={2} time={schedule[2].hour} icon="letter" eyebrow="Correo desde mi corazón" title="Una carta que no cabe en un sobre" visible={unlocked(schedule[2].unlock)}>
          <div className="envelope-wrap">
            <button className="envelope" onClick={() => setLetterOpen(true)}>
              <span className="envelope-flap" />
              <Icon name="heart" size={30} />
              <strong>Abrir mi carta</strong>
            </button>
            <p>Tócala. Hay un pequeño experimento sobre cuánto te amo.</p>
          </div>
        </SurpriseCard>

        <SurpriseCard index={3} time={schedule[3].hour} icon="pin" eyebrow="Donde empezó el para siempre" title="El lugar de nuestra promesa" visible={unlocked(schedule[3].unlock)}>
          <div className="promise-grid">
            <div className="map-card">
              <iframe title="Observatorio de Bosques de Antioquia" src="https://www.google.com/maps?q=Observatorio%20de%20Bosques%20de%20Antioquia%2C%20Medell%C3%ADn&output=embed" loading="lazy" />
            </div>
            <div className="promise-copy">
              <Icon name="pin" size={34} />
              <p className="script">Aquí te prometí el para siempre.</p>
              <p>Observatorio de Bosques de Antioquia<br />Cl. 73 #51d 14, Aranjuez, Medellín</p>
              <a href="https://maps.google.com/?q=Observatorio+de+Bosques+de+Antioquia+Medellín" target="_blank" rel="noreferrer">Volver a nuestro lugar ↗</a>
            </div>
          </div>
        </SurpriseCard>

        <SurpriseCard index={4} time={schedule[4].hour} icon="game" eyebrow="Una pequeña misión" title="La ranita y la rosa negra" visible={unlocked(schedule[4].unlock)}>
          <FrogGame />
        </SurpriseCard>

        <SurpriseCard index={5} time={schedule[5].hour} icon="music" eyebrow="Jugador dos, para siempre" title="Contigo no existe el game over" visible={unlocked(schedule[5].unlock)}>
          <div className="two-column">
            <YoutubeCard videoId="PjJSY6o1clk" title="Canción de la una" />
            <div className="quote-panel">
              <Icon name="game" size={36} />
              <p>“En todos los universos, en cada partida y en cualquier dificultad, siempre volvería a elegirte como mi jugadora dos.”</p>
              <span>Vida extra desbloqueada: nosotros</span>
            </div>
          </div>
        </SurpriseCard>

        <SurpriseCard index={6} time={schedule[6].hour} icon="belt" eyebrow="Fuerza, disciplina y corazón" title="Mi amor de cinturón negro" visible={unlocked(schedule[6].unlock)}>
          <div className="dan-section">
            <div className="dan-mark"><span>I</span><small>DAN</small></div>
            <div>
              <p className="script">Estoy inmensamente orgulloso de ti.</p>
              <p>Tu primer dan no es solo un cinturón: son las veces que te levantaste, la disciplina que elegiste y la fuerza que llevas dentro. Admiro a la guerrera y amo a la mujer maravillosa que eres.</p>
            </div>
          </div>
        </SurpriseCard>

        <SurpriseCard index={7} time={schedule[7].hour} icon="bear" eyebrow="Nuestro extraño y tierno hogar" title="Amor de otra dimensión" visible={unlocked(schedule[7].unlock)}>
          <div className="scene-copy">
            <div>
              <p className="script">Una carta entre patitas</p>
              <h3>“Amo a mis papás Yui y Nei”</h3>
              <p>Un osito enorme, una ranita pequeña y el mismo hogar. Arrastra suavemente la escena para ver nuestro rincón en tres dimensiones.</p>
            </div>
            <Suspense fallback={<div className="three-scene scene-loading">Preparando nuestro pequeño universo…</div>}>
              <ThreeLoveScene />
            </Suspense>
          </div>
          <div className="couples-strip">
            <p className="eyebrow">Amores que nos recuerdan</p>
            <div>
              <span><b>Morticia & Gómez</b><small>Devoción sin medida</small></span>
              <span><b>Inuyasha & Kagome</b><small>Dos épocas, un destino</small></span>
              <span><b>Víctor & Emily</b><small>Amor que sabe dejar volar</small></span>
            </div>
          </div>
        </SurpriseCard>

        <SurpriseCard index={8} time={schedule[8].hour} icon="cake" eyebrow="El gran final" title="Feliz cumpleaños, mi amor precioso" visible={unlocked(schedule[8].unlock)}>
          <div className="finale">
            <span className="age">23</span>
            <p className="script">veintitrés vueltas al sol</p>
            <h3>Hoy celebro que existes.</h3>
            <p>Te amo con la ternura de lo extraño, con la lealtad de los Addams y con esa magia oscura que convierte cada día contigo en mi película favorita. Que este nuevo año te encuentre valiente, amada y rodeada de todos los sueños que mereces.</p>
            <div className="forever"><Icon name="heart" /> Por ti, haría de la eternidad un hogar.</div>
          </div>
        </SurpriseCard>
      </section>}

      {unlockedCount > 0 && <footer className="footer">
        <Icon name="moon" size={28} />
        <p>Con amor, desde este mundo y el siguiente.</p>
        <span>Yui & Nei · 2026</span>
        <a href="https://unsplash.com/@asoggetti" target="_blank" rel="noreferrer">Fotografía de Alessio Soggetti · Unsplash</a>
      </footer>}
      {letterOpen && <LoveLetter onClose={() => setLetterOpen(false)} />}
    </main>
  );
}

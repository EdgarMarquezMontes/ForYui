import { useEffect, useState } from "react";

export default function FrogGame() {
  const [position, setPosition] = useState(6);
  const [jumping, setJumping] = useState(false);
  const [won, setWon] = useState(false);

  const move = (amount: number) => {
    setPosition((current) => {
      const next = Math.max(3, Math.min(88, current + amount));
      if (next > 78) setWon(true);
      return next;
    });
  };

  const jump = () => {
    if (jumping) return;
    setJumping(true);
    window.setTimeout(() => setJumping(false), 500);
  };

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") move(7);
      if (event.key === "ArrowLeft") move(-7);
      if (event.key === "ArrowUp" || event.key === " ") jump();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [jumping]);

  const reset = () => {
    setPosition(6);
    setWon(false);
  };

  return (
    <div className="frog-game">
      <div className="game-header">
        <div><span>CAPÍTULO XII</span><strong>Encuentra la rosa negra</strong></div>
        <span className="game-lives">AMOR × ∞</span>
      </div>
      <div className="game-world">
        <div className="pixel-moon" />
        <div className="pixel-cloud cloud-one" />
        <div className="pixel-cloud cloud-two" />
        <div className="pixel-rose" aria-label="Rosa negra"><i /><b>◆</b></div>
        <div className={`pixel-frog ${jumping ? "jumping" : ""}`} style={{ left: `${position}%` }} aria-label="Ranita">
          <i className="frog-eye left" /><i className="frog-eye right" /><span />
        </div>
        <div className="pixel-ground" />
        {won && (
          <div className="win-message">
            <strong>¡Rosa encontrada!</strong>
            <span>Mi lugar favorito siempre será a tu lado.</span>
            <button onClick={reset}>Jugar otra vez</button>
          </div>
        )}
      </div>
      <div className="game-controls">
        <button onClick={() => move(-7)} aria-label="Mover a la izquierda">←</button>
        <button onClick={jump}>SALTAR</button>
        <button onClick={() => move(7)} aria-label="Mover a la derecha">→</button>
      </div>
    </div>
  );
}

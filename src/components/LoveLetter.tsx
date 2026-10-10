export default function LoveLetter({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Medidor de amor">
      <button className="modal-close" onClick={onClose} aria-label="Cerrar carta">
        ×
      </button>
      <div className="love-letter">
        <p className="script">Clasificado: expediente Yui + Nei</p>
        <h3>Nivel de amor</h3>
        <div className="creature-meter" aria-label="Medidor desbordado al infinito">
          <svg viewBox="0 0 260 170" role="img" aria-label="Pequeña criatura enamorada abrazando un corazón">
            <path className="creature" d="M63 118C43 99 45 66 67 50c-8-21 15-29 30-12 20-8 41-4 56 8 17-15 37-2 25 18 14 25 2 58-24 68-32 13-70 8-91-14Z" />
            <path className="ear" d="M70 53 39 25c-7 22 3 42 22 48M158 50l35-26c4 24-7 42-25 49" />
            <circle cx="94" cy="80" r="6" className="eye" />
            <circle cx="145" cy="80" r="6" className="eye" />
            <path d="M111 95c6 6 13 6 19 0" className="smile" />
            <path className="meter-heart" d="M120 145C74 113 83 88 102 91c10 1 17 10 18 16 3-8 9-15 19-16 19-2 27 24-19 54Z" />
          </svg>
          <div className="meter-track"><span /></div>
          <strong>∞ / 100</strong>
        </div>
        <p>No existe una escala capaz de medirlo. Se salió del papel, cruzó la noche y siguió creciendo.</p>
        <p className="signature">Siempre tuyo, Nei</p>
      </div>
    </div>
  );
}

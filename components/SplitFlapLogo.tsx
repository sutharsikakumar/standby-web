import SplitFlapTile from "./SplitFlapTile";

const LETTERS = ["S", "T", "A", "N", "D", "B", "Y"];

export default function SplitFlapLogo() {
  return (
    <div className="flap-board" role="img" aria-label="STANDBY">
      {LETTERS.map((letter, i) => (
        <SplitFlapTile key={`${letter}-${i}`} target={letter} index={i} />
      ))}
    </div>
  );
}

export default function Header(timer: number) {
  return (
    <div className="headerBar sticky bg-white h-8 w-full top-0 flex justify-around items-center">
      <p className="timer">{timer}</p>
    </div>
  );
}

import { HandCoins } from "lucide-react";
const Logo = () => {
  return (
    <div className="flex gap-2 items-center">
      <div className="bg-transparent w-9 h-9 flex items-center justify-center rounded-full border-2 border-primary">
        <HandCoins className="text-primary" size={20} />
      </div>
      <span className="text-3xl text-primary font-sora font-extrabold">
        Finora
      </span>
    </div>
  );
};

export default Logo;

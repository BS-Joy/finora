import { cn } from "@/lib/utils";
import { HandCoins } from "lucide-react";
const Logo = ({
  textColor,
  darkTextColor,
  style,
}: {
  textColor: string;
  darkTextColor: string;
  style?: string;
}) => {
  return (
    // ********* mine *********
    // <div className="flex gap-2 items-center">
    //   <div className="bg-transparent w-9 h-9 flex items-center justify-center rounded-full border-2 border-white">
    //     <HandCoins className="text-white" size={20} />
    //   </div>
    //   <span className="text-3xl text-white font-sora font-extrabold">
    //     Finora
    //   </span>
    // </div>

    <div className={cn("flex items-center gap-3 relative z-1", style)}>
      <div className="w-9 h-9 md:w-11 md:h-11 rounded-[12px] bg-ring flex items-center justify-center font-extrabold text-[16px] text-forest tracking-[-0.5px] shrink-0">
        <HandCoins size={20} />
      </div>
      <span
        className={`text-${textColor} dark:text-${darkTextColor} font-sora font-bold text-[22px] md:text-2xl m-0`}
      >
        Finora
      </span>
    </div>
  );
};

export default Logo;

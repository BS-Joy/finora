import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { categoryIcons } from "@/utils";

interface PropsTypes {
  value: string;
  onChange: (value: string) => void;
}

const CategoryIconSelector = ({ value, onChange }: PropsTypes) => {
  return (
    <div className="grid grid-cols-4 gap-2 max-h-30.5 overflow-y-auto no-scrollbar pb-3 pr-px">
      {categoryIcons?.length > 0 &&
        categoryIcons.map((cat, index) => {
          const active = cat === value;
          return (
            <Button
              type="button"
              key={index}
              value={value}
              onClick={() => onChange(cat)}
              className={cn(
                "h-auto border-border bg-muted/50 hover:border-[#CBEF43]/50 hover:bg-muted flex flex-col gap-2 items-center justify-center rounded-2xl border-[1.5px] py-2.5 px-1 transition-all duration-150 cursor-pointer outline-none dark:bg-[#161616] dark:border-accent/30",
                active &&
                  "bg-primary hover:bg-primary dark:bg-[#1A2E1A] dark:border-accent",
              )}
            >
              <span className="text-xl">{cat}</span>
            </Button>
          );
        })}
    </div>
  );
};

export default CategoryIconSelector;

import { cn } from "@/lib/utils";

const Spinner = ({
  size = "6",
  darkBg,
}: {
  size?: string;
  darkBg?: boolean;
}) => {
  return (
    <>
      <div
        className={cn(
          `w-${size} h-${size} border-4 border-transparent text-primary dark:text-accent text-4xl animate-spin flex items-center justify-center border-t-primary dark:border-t-accent rounded-full`,
          darkBg && "border-t-accent dark:border-t-primary",
        )}
      ></div>
    </>
  );
};

export default Spinner;

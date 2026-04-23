const Spinner = ({ light, size = "6" }: { light?: boolean; size?: string }) => {
  return (
    <>
      {light ? (
        <div
          className={`w-${size} h-${size} border-4 border-transparent text-accent text-4xl animate-spin flex items-center justify-center border-t-accent rounded-full`}
        ></div>
      ) : (
        <div
          className={`w-${size} h-${size} border-4 border-transparent text-primary text-2xl animate-spin flex items-center justify-center border-t-primary rounded-full`}
        ></div>
      )}
    </>
  );
};

export default Spinner;

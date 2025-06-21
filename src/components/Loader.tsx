import { Loader2 } from "lucide-react";

const Loader = ({ title, massage }: { title?: string; massage?: string }) => {
  return (
    <div className="w-full mt-24 flex justify-center">
      <div className="flex flex-col items-center gap-2">
        <Loader2 className="h-8 w-8 animate-spin text-zinc-500" />
        <h3 className="font-semibold text-xl">{title}</h3>
        <p>{massage}</p>
      </div>
    </div>
  );
};
export default Loader;

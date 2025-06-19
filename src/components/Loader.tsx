import { Loader2 } from "lucide-react";

const Loader = () => {
  return (
    <div className="w-full min-h-[calc(100vh-3.5rem-1px)] flex justify-center items-center">
      <Loader2 className="animate-spin text-primary size-16" />
    </div>
  );
};
export default Loader;

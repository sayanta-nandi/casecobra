import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

const FiveStar = ({ className }: { className?: string }) => {
  return (
    <div className={cn("flex items-center", className)}>
      <Star
        className="fill-green-600 
               text-green-600"
      />
      <Star
        className="fill-green-600 
               text-green-600"
      />
      <Star
        className="fill-green-600 
               text-green-600"
      />
      <Star
        className="fill-green-600 
               text-green-600"
      />
      <Star
        className="fill-green-600 
               text-green-600"
      />
    </div>
  );
};

export default FiveStar;

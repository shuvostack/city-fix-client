import React from "react";
import { FaRegBuilding } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] w-full gap-4">
      
      <div className="relative flex items-center justify-center">
        
        <div className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        
        <div className="absolute w-16 h-16 bg-primary/10 rounded-full animate-pulse"></div>

        <div className="absolute text-primary text-2xl animate-bounce duration-1000">
           <FaRegBuilding />
        </div>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-neutral tracking-wider flex items-center gap-1">
          City<span className="text-primary">Fix</span>
        </h2>
        
        <div className="flex gap-1 mt-1">
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-primary rounded-full animate-bounce"></span>
        </div>
      </div>
      
    </div>
  );
};

export default Loader;
import React from "react";
import { FaRegBuilding } from "react-icons/fa";

const Logo = () => {
  return (
    <div className="flex items-center gap-2 select-none">
      {/* Icon Box */}
      <div className="w-9 h-9 bg-primary text-white rounded-xl flex items-center justify-center font-bold text-lg shadow-sm">
        <FaRegBuilding />
      </div>

      {/* Brand Text */}
      <div className="leading-tight">
        <h1 className="text-xl lg:text-2xl font-bold tracking-wide text-neutral">
          City<span className="text-primary">Fix</span>
        </h1>
        <p className="text-sm text-neutral/60 hidden sm:block tracking-wide">
          Smart Issue Reporting
        </p>
      </div>
    </div>
  );
};

export default Logo;

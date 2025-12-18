import React from "react";
import { CheckCircle, Circle, Clock, Loader2 } from "lucide-react";

const TimelineSection = ({ status, date }) => {
  const getStepClass = (stepStatus) => {
    const steps = ["pending", "in-progress", "resolved"];
    const currentIndex = steps.indexOf(status);
    const stepIndex = steps.indexOf(stepStatus);

    if (currentIndex >= stepIndex) return "text-primary border-primary";
    return "text-gray-300 border-gray-200";
  };

  const getLineClass = (stepStatus) => {
    const steps = ["pending", "in-progress", "resolved"];
    const currentIndex = steps.indexOf(status);
    const stepIndex = steps.indexOf(stepStatus);

    if (currentIndex > stepIndex) return "bg-primary";
    return "bg-gray-200";
  };

  return (
    <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
      <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">
        Issue Progress
      </h3>

      <div className="relative pl-4 space-y-8">
        <div className="absolute left-[27px] top-2 bottom-2 w-0.5 bg-gray-100 -z-0"></div>

        <div className="relative z-10 flex gap-4">
          <div
            className={`w-8 h-8 rounded-full border-4 bg-white flex items-center justify-center transition-colors ${getStepClass(
              "pending"
            )}`}
          >
            <Clock size={14} className="fill-current" />
          </div>
          <div>
            <h4 className="font-bold text-gray-800">Issue Reported</h4>
            <p className="text-sm text-gray-500">
              The issue has been submitted and is pending review.
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="relative z-10 flex gap-4">
          <div
            className={`w-8 h-8 rounded-full border-4 bg-white flex items-center justify-center transition-colors ${getStepClass(
              "in-progress"
            )}`}
          >
            <Loader2
              size={14}
              className={status === "in-progress" ? "animate-spin" : ""}
            />
          </div>
          <div>
            <h4
              className={`font-bold ${
                status === "pending" ? "text-gray-400" : "text-gray-800"
              }`}
            >
              Investigation Started
            </h4>
            <p className="text-sm text-gray-500">
              Authorities are currently working on this issue.
            </p>
          </div>
        </div>

        <div className="relative z-10 flex gap-4">
          <div
            className={`w-8 h-8 rounded-full border-4 bg-white flex items-center justify-center transition-colors ${getStepClass(
              "resolved"
            )}`}
          >
            <CheckCircle size={14} />
          </div>
          <div>
            <h4
              className={`font-bold ${
                status === "resolved" ? "text-gray-800" : "text-gray-400"
              }`}
            >
              Resolved
            </h4>
            <p className="text-sm text-gray-500">
              The issue has been fixed and verified.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineSection;

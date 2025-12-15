import React from "react";

interface Step {
  id: number;
  name: string;
  component: any;
}

interface EditorSidebarProps {
  STEPS: Step[];
  activeStep: number;
  setActiveStep: (stepId: number) => void;
}

const EditorSidebar: React.FC<EditorSidebarProps> = ({
  STEPS,
  activeStep,
  setActiveStep,
}) => {
  return (
    <div className="xl:w-fit min-h-screen bg-primary p-6 flex-col justify-between hidden md:flex">
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white border-b pb-2 ">
          Editor CV
        </h2>

        <div className="space-y-3">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-all duration-200 ${
                activeStep === step.id ? " font-semibold" : "text-white"
              }`}
              onClick={() => setActiveStep(step.id)}>
              <div
                className={`h-6 w-6 rounded-full flex items-center justify-center text-sm ${
                  activeStep === step.id
                    ? "bg-white text-blue-600"
                    : "bg-white text-black"
                }`}>
                {step.id}
              </div>
              <span className="text-white">{step.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorSidebar;

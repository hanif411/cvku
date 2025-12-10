// app/editor/page.tsx (Revisi)
"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  ResumeData,
  TemplateStyle,
  Experience,
  Education,
} from "@/types/index";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

import StepPersonalInfo from "@/components/editor-steps/StepPersonalInfo";
import StepExperience from "@/components/editor-steps/StepExperience";
import StepEducation from "@/components/editor-steps/StepEducation";
import StepSkills from "@/components/editor-steps/StepSkills";

const PlaceholderStep: React.FC<{ name: string }> = ({ name }) => (
  <div className="p-6 text-center text-gray-500">
    <h3 className="text-xl font-semibold">Langkah {name}</h3>
    <p>
      Akan segera dibuat. Silakan klik tombol *Continue* untuk melihat preview.
    </p>
  </div>
);
const CVPreview: React.FC<{ data: ResumeData; styles: TemplateStyle }> = ({
  data,
  styles,
}) => {
  const previewStyle: React.CSSProperties = {
    fontFamily: styles.fontFamily,
    // "--primary-color": styles.primaryColor,
  };

  return (
    <div className="p-4 bg-gray-100 h-full flex justify-center items-start overflow-y-auto">
      <div
        className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-8 transition-all duration-300"
        style={previewStyle}>
        <div
          className="pb-2 mb-4 border-b-2"
          style={{ borderColor: styles.primaryColor }}>
          <h1
            className="text-3xl font-bold"
            style={{ color: styles.primaryColor }}>
            {data.personalInfo.name || "Nama Anda"}
          </h1>
          <p className="text-xl text-gray-600">
            {data.personalInfo.title || "Jabatan Impian"}
          </p>
        </div>

        <h3
          className="text-lg font-semibold mb-2 mt-4"
          style={{ color: styles.primaryColor }}>
          Ringkasan
        </h3>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {data.personalInfo.summary ||
            "Tulis ringkasan profesional Anda di sini."}
        </p>
        {data.experience.length > 0 && (
          <>
            <h3
              className="text-lg font-semibold mb-2 mt-4"
              style={{ color: styles.primaryColor }}>
              Pengalaman
            </h3>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-2">
                <p className="font-semibold text-base">
                  {exp.jobTitle} - {exp.company}
                </p>
              </div>
            ))}
          </>
        )}

        <div className="mt-8 text-center text-xs text-gray-400">
          Preview Template: {styles.fontFamily} | Warna: {styles.primaryColor}
        </div>
      </div>
    </div>
  );
};

const STEPS = [
  {
    id: 1,
    name: "Personal Info",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    }) => <StepPersonalInfo {...props} />,
  },
  {
    id: 2,
    name: "Experience",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    }) => <StepExperience {...props} />,
  },
  {
    id: 3,
    name: "Education",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    }) => <StepEducation {...props} />,
  },
  {
    id: 4,
    name: "Skills",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    }) => <StepSkills {...props} />,
  },
];

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "Hanif Sholihin",
    title: "Marketing Manager",
    email: "hanif@email.com",
    phone: "+6281",
    summary:
      "Hasil didorong oleh Marketing Manager dengan keahlian dalam perencanaan strategis, konten kreatif, dan media sosial, fokus pada tujuan berbasis data.",
  },
  experience: [],
  education: [],
  skills: [],
};

const initialTemplateStyle: TemplateStyle = {
  primaryColor: "#F59E0B",
  fontFamily: "Roboto, sans-serif",
  layoutVariant: "classic",
};

const EditorPage: React.FC = () => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "default";

  const [resumeData, setResumeData] = useState<ResumeData>(initialResumeData);
  const [templateStyles, setTemplateStyles] =
    useState<TemplateStyle>(initialTemplateStyle);
  const [activeStep, setActiveStep] = useState(1);

  const ActiveStepComponent = STEPS.find(
    (step) => step.id === activeStep
  )?.component;

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="xl:w-xl bg-primary p-6 flex flex-col justify-between hidden md:flex">
        <div className="space-y-6">
          <h2 className="text-2xl font-bold border-b pb-2 border-gray-700">
            Editor CV
          </h2>
          {/* Navigasi Langkah */}
          <div className="space-y-3">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-all duration-200 ${
                  activeStep === step.id ? "bg-blue-600 font-semibold" : ""
                }`}
                onClick={() => setActiveStep(step.id)}>
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-sm ${
                    activeStep === step.id
                      ? "bg-white text-blue-600"
                      : "bg-gray-600"
                  }`}>
                  {step.id}
                </div>
                <span>{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sisi Tengah: Form Input Langkah Aktif */}
      <div className="w-full  border-r bg-white overflow-y-auto">
        <div className="p-4 bg-gray-50 border-b">
          <h1 className="text-xl font-bold">
            Langkah {activeStep}:{" "}
            {STEPS.find((step) => step.id === activeStep)?.name}
          </h1>
        </div>
        {/* Render Komponen Form yang Aktif */}
        {ActiveStepComponent && (
          <ActiveStepComponent data={resumeData} setData={setResumeData} />
        )}

        {/* Tombol Next/Back */}
        <div className="p-6 flex justify-between border-t">
          <Button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            variant="outline">
            Back
          </Button>
          <Button
            onClick={() =>
              setActiveStep((prev) => Math.min(STEPS.length, prev + 1))
            }
            disabled={activeStep === STEPS.length}>
            Continue
          </Button>
        </div>
      </div>

      {/* Sisi Kanan: Live Preview A4 */}
      <div className="hidden lg:block lg:w-3/5 xl:w-2/3 bg-gray-200">
        <CVPreview data={resumeData} styles={templateStyles} />
      </div>
    </div>
  );
};

export default EditorPage;

"use client";

import React, { useState, useRef, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { ResumeData, TemplateStyle } from "@/types/index";
import { Button } from "@/components/ui/button";
import { FileDown, Eye, X } from "lucide-react";
import StepPersonalInfo from "@/components/editor-steps/StepPersonalInfo";
import StepExperience from "@/components/editor-steps/StepExperience";
import StepEducation from "@/components/editor-steps/StepEducation";
import StepSkills from "@/components/editor-steps/StepSkills";
import StepCertifications from "@/components/editor-steps/StepFormTambahan";

import { downloadPDF } from "@/lib/Downloadpdf";
import EditorSidebar from "@/components/editor/Sidebar";

/* TEMPLATE */
import { CVAts } from "@/components/templates-cv/CvAts";
import { CVProfessional } from "@/components/templates-cv/CvProfessional";

/* ======================= */
/* ✅ TAMBAHAN (LOGIC FOTO) */
/* ======================= */
const templateUsePhoto = (templateId: string | null) => {
  return templateId === "professional";
};

const STEPS = [
  {
    id: 1,
    name: "Data Diri",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
      useProfilePhoto: boolean; // ✅ TAMBAHAN
    }) => <StepPersonalInfo {...props} />,
  },
  {
    id: 2,
    name: "Pengalaman",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    }) => <StepExperience {...props} />,
  },
  {
    id: 3,
    name: "Pendidikan",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    }) => <StepEducation {...props} />,
  },
  {
    id: 4,
    name: "Keahlian",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    }) => <StepSkills {...props} />,
  },
  {
    id: 5,
    name: "Sertifikat",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
    }) => (
      <StepCertifications
        data={props.data.certifications}
        setData={(newCerts) =>
          props.setData((prev) => ({ ...prev, certifications: newCerts }))
        }
        onNext={() => {}}
        onBack={() => {}}
      />
    ),
  },
];

const defaultResumeData: ResumeData = {
  personalInfo: {
    name: "",
    title: "",
    email: "",
    phone: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
};

const initialTemplateStyle: TemplateStyle = {
  primaryColor: "#000",
  fontFamily: "Roboto, sans-serif",
  layoutVariant: "classic",
};

const getInitialData = (): ResumeData => {
  if (typeof window !== "undefined") {
    const savedData = localStorage.getItem("resumeDataDraft");
    if (savedData) {
      try {
        return JSON.parse(savedData);
      } catch {
        return defaultResumeData;
      }
    }
  }
  return defaultResumeData;
};

const EditorPage: React.FC = () => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template");

  const [resumeData, setResumeData] = useState<ResumeData>(getInitialData);
  const [templateStyles] =
    useState<TemplateStyle>(initialTemplateStyle);
  const [activeStep, setActiveStep] = useState(1);
  const [showFullPreview, setShowFullPreview] = useState(false);

  const fullCvRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem("resumeDataDraft", JSON.stringify(resumeData));
  }, [resumeData]);

  const ActiveStepComponent = STEPS.find(
    (step) => step.id === activeStep
  )?.component;

  /* ✅ TAMBAHAN */
  const useProfilePhoto = templateUsePhoto(templateId);

  return (
    <div className="flex h-screen overflow-hidden ">
      <EditorSidebar
        STEPS={STEPS}
        activeStep={activeStep}
        setActiveStep={setActiveStep}
      />

      <div className="w-full border-r bg-white overflow-y-auto">
        <div className="p-4 bg-gray-50 border-b">
          <h1 className="text-xl font-bold">
            Langkah {activeStep}:{" "}
            {STEPS.find((step) => step.id === activeStep)?.name}
          </h1>
        </div>

        {ActiveStepComponent && (
          <ActiveStepComponent
            data={resumeData}
            setData={setResumeData}
            /* ✅ TAMBAHAN */
            useProfilePhoto={useProfilePhoto}
          />
        )}

        <div className="p-6 flex justify-between border-t">
          <div className="flex gap-3">
            <Button
              onClick={() =>
                setActiveStep((prev) => Math.min(STEPS.length, prev - 1))
              }
              disabled={activeStep === 1}>
              Kembali
            </Button>
            <Button
              onClick={() =>
                setActiveStep((prev) => Math.min(STEPS.length, prev + 1))
              }
              disabled={activeStep === STEPS.length}>
              Selanjutnya
            </Button>

            <Button onClick={() => setShowFullPreview(true)}>
              <Eye size={18} /> Preview CV
            </Button>

            {activeStep === STEPS.length && (
              <Button onClick={() => downloadPDF(fullCvRef)}>
                <FileDown size={18} /> Download CV
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* PREVIEW SIDEBAR (TIDAK DIUBAH) */}
      <div className="bg-gray-50 border-l overflow-y-auto">
        <div className="p-4 md:flex justify-center hidden items-start min-h-[calc(100vh-120px)] overflow-y-auto">
          <div
            className="scale-50 origin-top transition-transform duration-300 cursor-pointer"
            onClick={() => setShowFullPreview(true)}>
            {templateId === "professional" ? (
              <CVProfessional
                data={resumeData}
                styles={templateStyles}
                isPreview={true}
              />
            ) : (
              <CVAts
                data={resumeData}
                styles={templateStyles}
                isPreview={true}
              />
            )}
          </div>
        </div>
      </div>

      {/* PDF (TIDAK DIUBAH) */}
      <div className="fixed -left-[10000px] top-0">
        <div ref={fullCvRef}>
          {templateId === "professional" ? (
            <CVProfessional
              data={resumeData}
              styles={templateStyles}
              isPreview={false}
            />
          ) : (
            <CVAts
              data={resumeData}
              styles={templateStyles}
              isPreview={false}
            />
          )}
        </div>
      </div>

      {/* MODAL (TIDAK DIUBAH) */}
      {showFullPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-0 md:p-4">
          <div className="bg-white rounded-none md:rounded-xl shadow-2xl w-full md:w-auto max-h-screen md:max-h-[90vh] overflow-hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Preview CV</h2>
              <Button
                onClick={() => setShowFullPreview(false)}
                variant="ghost"
                size="icon">
                <X size={24} />
              </Button>
            </div>

            <div className="overflow-y-auto p-4 bg-gray-100 flex-1">
              <div className="flex justify-center">
                <div className="scale-75 sm:scale-90 md:scale-100 lg:scale-90 xl:scale-100 transition-transform duration-300">
                  {templateId === "professional" ? (
                    <CVProfessional
                      data={resumeData}
                      styles={templateStyles}
                      isPreview={false}
                    />
                  ) : (
                    <CVAts
                      data={resumeData}
                      styles={templateStyles}
                      isPreview={false}
                    />
                  )}
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-gray-50 flex justify-end items-center">
              <div className="flex gap-3">
                <Button
                  onClick={() => setShowFullPreview(false)}
                  variant="outline">
                  Tutup Preview
                </Button>
                <Button
                  onClick={() => {
                    setShowFullPreview(false);
                    downloadPDF(fullCvRef);
                  }}>
                  <FileDown size={18} /> Download CV Sekarang
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditorPage;

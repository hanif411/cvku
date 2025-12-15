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
import { CVAts } from "@/components/templates-cv/CvAts";
// import { CVAts } from "@/components/templates-cv/CvProfessional";

const STEPS = [
  {
    id: 1,
    name: "Data Diri",
    component: (props: {
      data: ResumeData;
      setData: React.Dispatch<React.SetStateAction<ResumeData>>;
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
        onNext={function (): void {
          throw new Error("Function not implemented.");
        }}
        onBack={function (): void {
          throw new Error("Function not implemented.");
        }}
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
    // Pastikan kode berjalan di client-side
    const savedData = localStorage.getItem("resumeDataDraft");
    if (savedData) {
      try {
        return JSON.parse(savedData) as ResumeData;
      } catch (error) {
        console.error("Error parsing resume data from localStorage:", error); // Jika gagal parse, kembalikan data default
        return defaultResumeData;
      }
    }
  }
  return defaultResumeData;
};

const EditorPage: React.FC = () => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "default";

  const [resumeData, setResumeData] = useState<ResumeData>(getInitialData);
  const [templateStyles, setTemplateStyles] =
    useState<TemplateStyle>(initialTemplateStyle);
  const [activeStep, setActiveStep] = useState(1);
  const [showFullPreview, setShowFullPreview] = useState(false);

  // ✅ Ref untuk PDF
  const fullCvRef = useRef<HTMLDivElement>(null);
  if (!fullCvRef || fullCvRef === null) {
    return;
  }

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("resumeDataDraft", JSON.stringify(resumeData));
    }
  }, [resumeData]);

  const ActiveStepComponent = STEPS.find(
    (step) => step.id === activeStep
  )?.component;

  return (
    <div className="flex h-screen overflow-hidden ">
      <div className=" ">
        <EditorSidebar
          STEPS={STEPS}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
        />
      </div>

      <div className="w-full border-r bg-white overflow-y-auto">
        <div className="p-4 bg-gray-50 border-b">
          <h1 className="text-xl font-bold">
            Langkah {activeStep}:{" "}
            {STEPS.find((step) => step.id === activeStep)?.name}
          </h1>
        </div>

        {ActiveStepComponent && (
          <ActiveStepComponent data={resumeData} setData={setResumeData} />
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

            {/* Tombol Preview Full */}
            <Button
              onClick={() => setShowFullPreview(true)}
              className="flex gap-2  text-white">
              <Eye size={18} />
              Preview CV
            </Button>

            {/* Tombol Download PDF */}
            {activeStep === STEPS.length && (
              <Button
                onClick={() => downloadPDF(fullCvRef)}
                className="flex gap-2  text-white ">
                <FileDown size={18} />
                Download CV
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* PREVIEW SIDEBAR - TAMPILAN PROPORSIONAL */}
      <div className="bg-gray-50 border-l overflow-y-auto">
        {/* Container untuk preview yang proporsional */}
        <div className="p-4 md:flex justify-center hidden items-start min-h-[calc(100vh-120px)] overflow-y-auto">
          <div
            className="scale-50 origin-top transition-transform duration-300  cursor-pointer"
            onClick={() => setShowFullPreview(true)}>
            <CVAts data={resumeData} styles={templateStyles} isPreview={true} />
          </div>
        </div>
      </div>

      {/* ✅ ELEMEN A4 PENUH YANG DISEMBUNYIKAN - untuk PDF */}
      <div className="fixed -left-[10000px] top-0">
        <div ref={fullCvRef}>
          <CVAts data={resumeData} styles={templateStyles} isPreview={false} />
        </div>
      </div>

      {/* ✅ MODAL FULL PREVIEW */}
      {showFullPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm p-0 md:p-4">
          <div className="bg-white rounded-none md:rounded-xl shadow-2xl w-full md:w-auto max-h-screen md:max-h-[90vh] overflow-hidden flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h2 className="text-xl font-bold text-gray-800">Preview CV</h2>
              <Button
                onClick={() => setShowFullPreview(false)}
                variant="ghost"
                size="icon"
                className="hover:bg-gray-200">
                <X size={24} />
              </Button>
            </div>

            {/* Modal Content - Scrollable */}
            <div className="overflow-y-auto p-4 bg-gray-100 flex-1">
              <div className="flex justify-center">
                <div className="scale-75 sm:scale-90 md:scale-100 lg:scale-90 xl:scale-100 transition-transform duration-300">
                  <CVAts
                    data={resumeData}
                    styles={templateStyles}
                    isPreview={false}
                  />
                </div>
              </div>
            </div>

            {/* Modal Footer */}
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
                  }}
                  className="flex gap-2  text-white">
                  <FileDown size={18} />
                  Download CV Sekarang
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

/* eslint-disable @typescript-eslint/no-unused-vars */
// app/editor/page.tsx (Revisi)
"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import {
  ResumeData,
  TemplateStyle,
  Experience,
  Education,
  certifications,
} from "@/types/index";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { FileDown } from "lucide-react";
import StepPersonalInfo from "@/components/editor-steps/StepPersonalInfo";
import StepExperience from "@/components/editor-steps/StepExperience";
import StepEducation from "@/components/editor-steps/StepEducation";
import StepSkills from "@/components/editor-steps/StepSkills";
import StepCertifications from "@/components/editor-steps/StepFormTambahan";

import { downloadPDF } from "@/lib/Downloadpdf";

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
  };

  return (
    <div className="p-4 bg-gray-100 h-full flex justify-center items-start overflow-y-auto">
      <div
        className="w-[210mm] min-h-[297mm] bg-white shadow-xl p-8 transition-all duration-300"
        style={previewStyle}
      >
        <div
          className="pb-2 mb-4 border-b-2"
          style={{ borderColor: styles.primaryColor }}
        >
          <h1
            className="text-3xl font-bold"
            style={{ color: styles.primaryColor }}
          >
            {data.personalInfo.name || "Nama Anda"}
          </h1>
          <p className="text-xl text-gray-600">
            {data.personalInfo.title || "Jabatan Impian"}
          </p>
          <h2>
            <p className="text-sm text-gray-600 mt-1">
              {data.personalInfo.email || "Email anda"} |{" "}
              {data.personalInfo.phone || "No. Telepon anda"}
            </p>
          </h2>
        </div>

        <h3
          className="text-lg font-semibold mb-2 mt-4"
          style={{ color: styles.primaryColor }}
        >
          Ringkasan
        </h3>
        <p className="text-sm text-gray-700 whitespace-pre-wrap">
          {data.personalInfo.summary ||
            "Tulis ringkasan profesional Anda di sini."}
        </p>

        <h3
          className="text-lg font-semibold mb-2 mt-4"
          style={{ color: styles.primaryColor }}
        >
          Skills
        </h3>

        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs bg-gray-200 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>

        {data.experience.length > 0 && (
          <>
            <h3
              className="text-lg font-semibold mb-2 mt-4"
              style={{ color: styles.primaryColor }}
            >
              Pengalaman
            </h3>
            {data.experience.map((exp) => (
              <div key={exp.id} className="mb-2">
                <p className="flex gap-4 text-sm text-gray-700">
                  <span>
                    {exp.jobTitle} - {exp.company}
                  </span>
                  <span>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </p>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">
                  {exp.description}
                </p>
              </div>
            ))}
          </>
        )}

        {data.education.length > 0 && (
          <>
            <h3
              className="text-lg font-semibold mb-2 mt-4"
              style={{ color: styles.primaryColor }}
            >
              Pendidikan
            </h3>
            {data.education.map((exp) => (
              <div key={exp.id} className="mb-2">
                <p className="text-sm text-gray-700">
                  {exp.institution} {exp.startDate} - {exp.endDate}
                </p>
                <p className="text-sm text-gray-700">{exp.degree}</p>
              </div>
            ))}
          </>
        )}
        {data.certifications.length > 0 && (
          <>
            <h3
              className="text-lg font-semibold mb-2 mt-4"
              style={{ color: styles.primaryColor }}
            >
              Sertifikasi
            </h3>
            {data.certifications.map((cert) => (
              <div key={cert.id} className="mb-2">
                <p className="text-sm text-gray-700 font-medium">
                  {cert.name}
                </p>
                <p className="text-xs text-gray-600">
                  {cert.issuer} | Dikeluarkan: {cert.issue_date} 
                  {/* Perhatikan: Jika expiration_date tidak wajib/tidak ada, Anda bisa menggunakan ternary operator */}
                  {cert.expiration_date ? ` | Berlaku hingga: ${cert.expiration_date}` : ''}
                </p>
                {cert.description && (
                  <p className="text-xs text-gray-700 mt-1 whitespace-pre-wrap">
                    {cert.description}
                  </p>
                )}
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
 {
  id: 5,
  name: "certifications",
  component: (props: {
    data: ResumeData;
    setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  }) => (
    <StepCertifications
      data={props.data.certifications} // array certifications
      setData={(newCerts) => props.setData((prev) => ({ ...prev, certifications: newCerts }))} onNext={function (): void {
        throw new Error("Function not implemented.");
      } } onBack={function (): void {
        throw new Error("Function not implemented.");
      } }    />
  ),
}

];

const initialResumeData: ResumeData = {
  personalInfo: {
    name: "Hanif Sholihin",
    title: "Marketing Manager",
    email: "hanif@email.com",
    phone: "+6281",
    summary: "Hasil didorong oleh Marketing Manager dengan keahlian dalam perencanaan strategis, konten kreatif, dan media sosial, fokus pada tujuan berbasis data.",
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  
};

const initialTemplateStyle: TemplateStyle = {
  primaryColor: "#F59E0B",
  fontFamily: "Roboto, sans-serif",
  layoutVariant: "classic",
};

const EditorPage: React.FC = () => {
  const searchParams = useSearchParams();
  const templateId = searchParams.get("template") || "default";

  const [resumeData, setResumeData] =
    useState<ResumeData>(initialResumeData);
  const [templateStyles, setTemplateStyles] =
    useState<TemplateStyle>(initialTemplateStyle);
  const [activeStep, setActiveStep] = useState(1);

  // ✅ NEW: ref untuk PDF
  const previewRef = useRef<HTMLDivElement>(null);

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

          <div className="space-y-3">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className={`flex items-center space-x-3 cursor-pointer p-2 rounded-md transition-all duration-200 ${
                  activeStep === step.id
                    ? "bg-blue-600 font-semibold"
                    : ""
                }`}
                onClick={() => setActiveStep(step.id)}
              >
                <div
                  className={`h-6 w-6 rounded-full flex items-center justify-center text-sm ${
                    activeStep === step.id
                      ? "bg-white text-blue-600"
                      : "bg-gray-600"
                  }`}
                >
                  {step.id}
                </div>
                <span>{step.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full  border-r bg-white overflow-y-auto">
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
          />
        )}

        <div className="p-6 flex justify-between border-t">
          <Button
            onClick={() => setActiveStep((prev) => Math.max(1, prev - 1))}
            disabled={activeStep === 1}
            variant="outline"
          >
            Back
          </Button>

          <div className="flex gap-3">
            <Button
              onClick={() =>
                setActiveStep((prev) => Math.min(STEPS.length, prev + 1))
              }
              disabled={activeStep === STEPS.length}
            >
              Continue
            </Button>

            {/* ✅ NEW: Tombol Download PDF */}
            <Button
              onClick={() => downloadPDF(previewRef)}
              className="flex gap-2 bg-blue-600 text-white"
            >
              <FileDown size={18} />
              Download CV
            </Button>
          </div>
        </div>
      </div>

      {/* PREVIEW dibungkus ref */}
      <div className="hidden lg:block lg:w-3/5 xl:w-2/3 bg-gray-200">
        <div ref={previewRef}>
          <CVPreview data={resumeData} styles={templateStyles} />
        </div>
      </div>
    </div>
  );
};

export default EditorPage;

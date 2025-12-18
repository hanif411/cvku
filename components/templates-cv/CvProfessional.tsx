//cvku/componenponents/templates-cv/Cvprofesional
"use client";
import React from "react";
import { ResumeData, TemplateStyle } from "@/types";

export const CVProfessional: React.FC<{
  data: ResumeData;
  styles: TemplateStyle;
  isPreview?: boolean;
}> = ({ data, styles, isPreview = false }) => {
  const previewStyle: React.CSSProperties = {
    fontFamily: styles.fontFamily || "'Inter', 'Segoe UI', sans-serif",
  };

  return (
    <div
      className={`scale-65 md:scale-100 bg-white ${
        isPreview
          ? "shadow-lg rounded-lg border border-gray-200"
          : "w-full mx-auto "
      }`}>
      <div
        className="w-[210mm] min-h-[297mm] bg-white p-12"
        style={previewStyle}
        id="cv-a4-container">

        {/* HEADER SECTION - Name & Title */}
        <div className="mb-10 flex items-start gap-6">
          
          {/* ===== TAMBAHAN FOTO (TIDAK MENGUBAH HEADER ASLI) ===== */}
          {data.personalInfo.photo && (
            <img
              src={data.personalInfo.photo}
              alt="Profile"
              className="w-28 h-28 object-cover border border-gray-300"
            />
          )}
          {/* ===== END TAMBAHAN FOTO ===== */}

          <div>
            <h1
              className="text-4xl font-bold mb-3 tracking-tight text-gray-900"
              style={{ color: styles.primaryColor }}>
              {data.personalInfo.name || "Full Name"}
            </h1>
            <div
              className="h-1 w-20 mb-6"
              style={{ backgroundColor: styles.primaryColor }}></div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {data.personalInfo.title || "Professional Title"}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-12">
          {/* LEFT COLUMN */}
          <div className="space-y-10">
            {/* CONTACT SECTION */}
            <section>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-800">
                Contact
              </h3>
              <div className="space-y-1 text-gray-700">
                {data.personalInfo.phone && (
                  <div>{data.personalInfo.phone}</div>
                )}
                {data.personalInfo.email && (
                  <div>{data.personalInfo.email}</div>
                )}
              </div>
            </section>

            {/* SKILLS SECTION */}
            {data.skills.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-800">
                  Skills
                </h3>
                <ul className="space-y-2">
                  {data.skills.map((skill, i) => (
                    <li key={i} className="flex items-start">
                      <span
                        className="mr-2"
                        style={{ color: styles.primaryColor }}>
                        •
                      </span>
                      <span className="text-gray-700">{skill}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* EDUCATION SECTION */}
            {data.education.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-800">
                  Education
                </h3>
                <div className="space-y-6">
                  {data.education.map((edu, index) => (
                    <div key={edu.id || index} className="space-y-2">
                      <div className="font-bold text-gray-900">
                        {edu.degree || "Degree"}
                      </div>
                      <div
                        className="text-sm font-medium italic"
                        style={{ color: styles.primaryColor }}>
                        {edu.institution || "Institution"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {edu.startDate} - {edu.endDate || "Present"}
                      </div>
                      {edu.description && (
                        <p className="text-sm text-gray-600 mt-2 leading-relaxed">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-10">
            {/* ABOUT ME SECTION */}
            <section>
              <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-800">
                About Me
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {data.personalInfo.summary ||
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
              </p>
            </section>

            {/* EXPERIENCE SECTION */}
            {data.experience.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-800">
                  Experience
                </h3>
                <div className="space-y-8">
                  {data.experience.map((exp, index) => (
                    <div key={exp.id || index} className="space-y-2">
                      <div className="font-bold text-lg text-gray-900">
                        {exp.jobTitle || "Job Title"}
                      </div>
                      <div
                        className="text-sm font-medium italic"
                        style={{ color: styles.primaryColor }}>
                        {exp.company || "Company Name"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {exp.startDate} - {exp.endDate || "Present"}
                      </div>
                      {exp.description && (
                        <ul className="space-y-1 mt-3">
                          {exp.description
                            .split("\n")
                            .filter((line) => line.trim() !== "")
                            .map((line, lineIndex) => (
                              <li key={lineIndex} className="flex items-start">
                                <span
                                  className="mr-2 mt-1"
                                  style={{ color: styles.primaryColor }}>
                                  •
                                </span>
                                <span className="text-gray-700">
                                  {line.trim()}
                                </span>
                              </li>
                            ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* CERTIFICATIONS SECTION */}
            {data.certifications && data.certifications.length > 0 && (
              <section>
                <h3 className="text-lg font-bold mb-4 uppercase tracking-wider text-gray-800">
                  Certifications
                </h3>
                <div className="space-y-4">
                  {data.certifications.map((cert, index) => (
                    <div key={cert.id || index} className="space-y-1">
                      <div className="font-bold text-gray-900">
                        {cert.name || "Certificate Name"}
                      </div>
                      <div className="text-sm text-gray-700">
                        {cert.issuer && (
                          <span className="mr-4 italic">{cert.issuer}</span>
                        )}
                        {cert.issue_date && (
                          <span className="text-gray-600">
                            Issued: {cert.issue_date}
                          </span>
                        )}
                      </div>
                      {cert.expiration_date && (
                        <div className="text-xs text-gray-500">
                          Valid until: {cert.expiration_date}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

"use client";
import React from "react";
import { ResumeData, TemplateStyle } from "@/types";

export const CVAts: React.FC<{
  data: ResumeData;
  styles: TemplateStyle;
  isPreview?: boolean;
}> = ({ data, styles, isPreview = false }) => {
  const previewStyle: React.CSSProperties = {
    fontFamily: styles.fontFamily,
  };

  return (
    <div
      className={`scale-65 md:scale-100 bg-white ${
        isPreview
          ? "shadow-lg rounded-lg border border-gray-200"
          : "w-full mx-auto "
      }`}>
      <div
        className="w-[210mm] min-h-[297mm]  bg-white p-4 md:p-8"
        style={previewStyle}
        id="cv-a4-container">
        {/* HEADER dengan warna yang konsisten */}
        <div
          className="pb-3 mb-6 border-b-3"
          style={{ borderColor: styles.primaryColor }}>
          <h1
            className="text-4xl font-bold mb-2"
            style={{ color: styles.primaryColor }}>
            {data.personalInfo.name}
          </h1>
          <p className="text-xl font-medium text-gray-700">
            {data.personalInfo.title}
          </p>
          <div className="flex flex-wrap gap-4 mt-2 text-gray-600">
            <span className="flex items-center gap-1">
              {data.personalInfo.email}
            </span>
            <span className="flex items-center gap-1">
              {data.personalInfo.phone}
            </span>
          </div>
        </div>

        {/* RINGKASAN PROFILE*/}
        <section className="mb-6">
          <h2
            className="text-xl font-bold mb-3 pb-1 border-b"
            style={{
              color: styles.primaryColor,
              borderColor: styles.primaryColor,
            }}>
            Profil
          </h2>
          <p className="text-gray-700 leading-relaxed">
            {data.personalInfo.summary ||
              "Tulis ringkasan profesional Anda di sini."}
          </p>
        </section>

        {/* SKILLS */}
        {data.skills.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: styles.primaryColor,
                borderColor: styles.primaryColor,
              }}>
              Keahlian
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm rounded-md font-medium"
                  style={{
                    backgroundColor: `${styles.primaryColor}20`,
                    color: styles.primaryColor,
                    border: `1px solid ${styles.primaryColor}40`,
                  }}>
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* PENGALAMAN */}
        {data.experience.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: styles.primaryColor,
                borderColor: styles.primaryColor,
              }}>
              Pengalaman Kerja
            </h2>
            {data.experience.map((exp) => (
              <div
                key={exp.id}
                className="mb-4 pb-4 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-bold text-lg">{exp.jobTitle}</h3>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded">
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <ul className="list-disc list-inside text-gray-600 leading-relaxed space-y-1 pl-4">
                  {exp.description
                    .split("\n") // ✅ Pisahkan string berdasarkan karakter Enter (\n)
                    .filter((line) => line.trim() !== "") // Hapus baris kosong
                    .map((line, lineIndex) => (
                      <li key={lineIndex}>{line.trim()}</li> // Tampilkan setiap baris sebagai bullet point
                    ))}
                </ul>
              </div>
            ))}
          </section>
        )}

        {/* PENDIDIKAN */}
        {data.education.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: styles.primaryColor,
                borderColor: styles.primaryColor,
              }}>
              Pendidikan
            </h2>
            {data.education.map((edu) => (
              <div
                key={edu.id}
                className="mb-3 pb-3 border-b border-gray-100 last:border-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold">{edu.institution}</h3>
                    <p className="text-gray-700">{edu.degree}</p>
                  </div>
                  <span className="text-sm text-gray-600">
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              </div>
            ))}
          </section>
        )}

        {/* SERTIFIKASI */}
        {data.certifications && data.certifications.length > 0 && (
          <section className="mb-6">
            <h2
              className="text-xl font-bold mb-3 pb-1 border-b"
              style={{
                color: styles.primaryColor,
                borderColor: styles.primaryColor,
              }}>
              Sertifikasi
            </h2>
            {data.certifications.map((cert) => (
              <div
                key={cert.id}
                className="mb-3 pb-3 border-b border-gray-100 last:border-0">
                <h3 className="font-bold text-gray-800">{cert.name}</h3>
                <div className="flex flex-wrap gap-3 text-sm text-gray-600 mt-1">
                  {cert.issuer && <span>{cert.issuer}</span>}
                  {cert.issue_date && (
                    <span>Dikeluarkan: {cert.issue_date}</span>
                  )}
                  {cert.expiration_date && (
                    <span> Berlaku hingga: {cert.expiration_date}</span>
                  )}
                </div>
                {cert.description && (
                  <p className="text-gray-600 mt-2 text-sm">
                    {cert.description}
                  </p>
                )}
              </div>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

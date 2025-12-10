// src/components/editor-steps/StepPersonalInfo.tsx
import React from "react";
import { ResumeData } from "@/types/index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Definisikan props yang diterima komponen
interface StepPersonalInfoProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const StepPersonalInfo: React.FC<StepPersonalInfoProps> = ({
  data,
  setData,
}) => {
  // Handler input sederhana untuk Personal Info
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Update state ResumeData hanya di bagian personalInfo
    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Informasi Kontak & Header</h2>
      <p className="text-gray-500">
        Sertakan nama lengkap dan cara untuk menghubungi Anda.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nama Lengkap</Label>
          <Input
            id="name"
            name="name"
            value={data.personalInfo.name}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="title">Jabatan Saat Ini / Target</Label>
          <Input
            id="title"
            name="title"
            value={data.personalInfo.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={data.personalInfo.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Telepon</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            value={data.personalInfo.phone}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="summary">Ringkasan Diri (Summary)</Label>
        <Textarea
          id="summary"
          name="summary"
          value={data.personalInfo.summary}
          onChange={handleInputChange}
          rows={5}
        />
      </div>
    </div>
  );
};

export default StepPersonalInfo;

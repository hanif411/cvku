/* eslint-disable @next/next/no-img-element */
"use client";
import React from "react";
import { ResumeData } from "@/types/index";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface StepPersonalInfoProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  useProfilePhoto: boolean; // ✅ KUNCI LOGIC
}

const StepPersonalInfo: React.FC<StepPersonalInfoProps> = ({
  data,
  setData,
  useProfilePhoto,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [name]: value,
      },
    }));
  };

  // HANDLE FOTO
  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setData((prev) => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          photo: reader.result as string,
        },
      }));
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Informasi Data Diri</h2>

      {/* FOTO — MUNCUL HANYA JIKA CV PAKAI FOTO */}
      {useProfilePhoto && (
        <div className="space-y-2">
          <Label>Foto (CV Profesional)</Label>

          <Input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
          />

          {data.personalInfo.photo && (
            <img
              src={data.personalInfo.photo}
              alt="Preview"
              className="mt-3 w-32 h-32 object-cover border rounded-md"
            />
          )}
        </div>
      )}

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
        <Label htmlFor="summary">Ringkasan</Label>
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

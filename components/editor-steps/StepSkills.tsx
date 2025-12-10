// src/components/editor-steps/StepSkills.tsx
"use client";

import React, { useState, useCallback } from "react";
import { ResumeData } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

// Definisikan props untuk komponen StepSkills
interface StepSkillsProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const StepSkills: React.FC<StepSkillsProps> = ({ data, setData }) => {
  // State lokal untuk input skill yang sedang diketik
  const [skillInput, setSkillInput] = useState("");

  // Fungsi untuk Menambah Skill
  const handleAddSkill = useCallback(() => {
    const trimmedSkill = skillInput.trim();

    // Pastikan skill tidak kosong dan belum ada di daftar
    if (trimmedSkill && !data.skills.includes(trimmedSkill)) {
      setData((prev) => ({
        ...prev,
        skills: [...prev.skills, trimmedSkill], // Tambahkan skill baru
      }));
      setSkillInput(""); // Kosongkan input setelah ditambahkan
    }
  }, [skillInput, data.skills, setData]);

  // Fungsi untuk Menghapus Skill
  const handleDeleteSkill = useCallback(
    (skillToDelete: string) => {
      setData((prev) => ({
        ...prev,
        skills: prev.skills.filter((skill) => skill !== skillToDelete),
      }));
    },
    [setData]
  );

  // Handler untuk key down (misalnya: saat menekan Enter)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Mencegah submit form
      handleAddSkill();
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Keahlian (Skills)</h2>
      <p className="text-gray-500">
        Tambahkan keahlian teknis dan *soft skill* yang relevan. Pisahkan setiap
        *skill* dengan menekan tombol **Add** atau **Enter**.
      </p>

      {/* Input dan Tombol Tambah */}
      <div className="flex space-x-2">
        <Input
          type="text"
          placeholder="Contoh: JavaScript, Marketing Strategy, Problem Solving"
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-grow"
        />
        <Button
          onClick={handleAddSkill}
          disabled={!skillInput.trim()}
          className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" /> Add
        </Button>
      </div>

      {/* Tampilan Tag/Chip Skills */}
      <div className="flex flex-wrap gap-3 p-4 border rounded-lg bg-gray-50 min-h-[100px]">
        {data.skills.length > 0 ? (
          data.skills.map((skill, index) => (
            <div
              key={index}
              className="flex items-center space-x-1 bg-gray-200 text-gray-800 text-sm py-1 px-3 rounded-full hover:bg-gray-300 transition-colors cursor-default">
              <span>{skill}</span>
              <button
                onClick={() => handleDeleteSkill(skill)}
                className="text-gray-500 hover:text-red-600 p-0.5 rounded-full">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-400 italic">
            Belum ada keahlian yang ditambahkan.
          </p>
        )}
      </div>
    </div>
  );
};

export default StepSkills;

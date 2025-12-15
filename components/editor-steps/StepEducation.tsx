"use client";

import React, { useState } from "react";
import { ResumeData, Education } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  PlusCircle,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid";

interface EducationItemEditorProps {
  education: Education;
  index: number;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onClose: () => void;
}

const EducationItemEditor: React.FC<EducationItemEditorProps> = ({
  education,
  index,
  setData,
  onClose,
}) => {
  const [localEdu, setLocalEdu] = useState<Education>(education);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLocalEdu((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    setData((prev) => ({
      ...prev,
      education: prev.education.map((edu, i) => (i === index ? localEdu : edu)),
    }));
    onClose();
  };

  return (
    <div className="p-4 border-t border-purple-200 bg-purple-50/50 space-y-4 mt-2">
      <h4 className="text-lg font-semibold border-b pb-2">
        Edit Riwayat Pendidikan
      </h4>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`degree-${index}`}>Gelar/Jurusan</Label>
          <Input
            id={`degree-${index}`}
            name="degree"
            value={localEdu.degree}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`institution-${index}`}>Institusi/Universitas</Label>
          <Input
            id={`institution-${index}`}
            name="institution"
            value={localEdu.institution}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`startDate-${index}`}>Mulai (Tahun)</Label>
          <Input
            id={`startDate-${index}`}
            name="startDate"
            value={localEdu.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`endDate-${index}`}>Selesai (Tahun/Lulus)</Label>
          <Input
            id={`endDate-${index}`}
            name="endDate"
            value={localEdu.endDate}
            onChange={handleInputChange}
            placeholder="Contoh: 2020 atau 'Currently Attending'"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button onClick={handleSave}>Simpan Pendidikan</Button>
      </div>
    </div>
  );
};

// =======================================================
// 2. KOMPONEN UTAMA STEP (Default Export)
// =======================================================
interface StepEducationProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

const StepEducation: React.FC<StepEducationProps> = ({ data, setData }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // 1. Fungsi untuk Menambahkan Pendidikan Baru
  const handleAddEducation = () => {
    const newEdu: Education = {
      id: uuidv4(),
      degree: "",
      institution: "",
      startDate: "",
      endDate: "",
    };
    setData((prev) => ({
      ...prev,
      education: [newEdu, ...prev.education], // Tambahkan di awal array
    }));
    setEditingIndex(0);
  };

  // 2. Fungsi untuk Menghapus Pendidikan
  const handleDeleteEducation = (idToDelete: string) => {
    setData((prev) => ({
      ...prev,
      education: prev.education.filter((edu) => edu.id !== idToDelete),
    }));
    if (
      editingIndex !== null &&
      data.education[editingIndex]?.id === idToDelete
    ) {
      setEditingIndex(null);
    }
  };

  // 3. Fungsi untuk Mengubah Urutan
  const handleMoveEducation = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < data.education.length) {
      const updatedEdu = [...data.education];
      [updatedEdu[index], updatedEdu[newIndex]] = [
        updatedEdu[newIndex],
        updatedEdu[index],
      ];

      setData((prev) => ({ ...prev, education: updatedEdu }));

      if (editingIndex === index) setEditingIndex(newIndex);
      else if (editingIndex === newIndex) setEditingIndex(index);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Riwayat Pendidikan</h2>
      <p className="text-gray-500">
        Sertakan gelar, institusi, dan tahun kelulusan Anda. Urutan dari yang
        terbaru.
      </p>

      <Button onClick={handleAddEducation} className="w-full ">
        <PlusCircle className="h-4 w-4 mr-2" /> Tambah Pendidikan
      </Button>

      <div className="space-y-4">
        {data.education.map((edu, index) => (
          <div
            key={edu.id}
            className="p-4 border rounded-lg bg-white shadow-sm">
            {/* Header Item Pendidikan */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">
                  {edu.degree || "Gelar Tanpa Nama"}
                </h3>
                <p className="text-sm text-gray-600">
                  {edu.institution || "Institusi Tanpa Nama"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>

              {/* Tombol Aksi Item */}
              <div className="flex space-x-2">
                {/* Tombol Pindah Urutan */}
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleMoveEducation(index, "up")}
                    disabled={index === 0}
                    className="h-7 w-7">
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleMoveEducation(index, "down")}
                    disabled={index === data.education.length - 1}
                    className="h-7 w-7">
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                {/* Tombol Edit & Hapus */}
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setEditingIndex(editingIndex === index ? null : index)
                  } // Toggle Edit
                  className="h-12 w-12">
                  {editingIndex === index ? (
                    <ChevronUp className="h-4 w-4" />
                  ) : (
                    <Edit2 className="h-4 w-4" />
                  )}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-12 w-12 text-red-500 hover:text-red-700 hover:bg-red-50"
                  onClick={() => handleDeleteEducation(edu.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Editor Detail Pendidikan (Conditional Rendering) */}
            {editingIndex === index && (
              <EducationItemEditor
                education={edu}
                index={index}
                setData={setData}
                onClose={() => setEditingIndex(null)} // Tutup editor
              />
            )}
          </div>
        ))}
      </div>

      {/* Jika tidak ada pendidikan */}
      {data.education.length === 0 && (
        <p className="text-center text-gray-500 italic">
          Belum ada riwayat pendidikan yang ditambahkan.
        </p>
      )}
    </div>
  );
};

export default StepEducation;

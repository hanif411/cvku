// src/components/editor-steps/StepExperience.tsx
"use client";

import React, { useState } from "react";
import { ResumeData, Experience } from "@/types/index";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PlusCircle,
  Trash2,
  Edit2,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { v4 as uuidv4 } from "uuid"; // Pastikan Anda sudah menginstal uuid

// Definisikan props untuk komponen StepExperience
interface StepExperienceProps {
  data: ResumeData;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
}

// Komponen Input Detail Pengalaman
interface ExperienceItemEditorProps {
  experience: Experience;
  index: number;
  setData: React.Dispatch<React.SetStateAction<ResumeData>>;
  onClose: () => void;
}

const ExperienceItemEditor: React.FC<ExperienceItemEditorProps> = ({
  experience,
  index,
  setData,
  onClose,
}) => {
  // State lokal untuk item yang sedang diedit (agar tidak langsung memengaruhi state global saat mengetik)
  const [localExp, setLocalExp] = useState<Experience>(experience);

  // Handler untuk input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setLocalExp((prev) => ({ ...prev, [name]: value }));
  };

  // Handler untuk checkbox (Is Current Job)
  const handleCheckboxChange = (checked: boolean) => {
    setLocalExp((prev) => ({
      ...prev,
      isCurrent: checked,
      // Jika sedang bekerja, endDate dikosongkan
      endDate: checked ? "Present" : prev.endDate,
    }));
  };

  // Handler saat form disimpan
  const handleSave = () => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.map((exp, i) =>
        i === index ? localExp : exp
      ),
    }));
    onClose(); // Tutup editor setelah disimpan
  };

  return (
    <div className="p-4 border-t border-blue-200 bg-blue-50/50 space-y-4 mt-2">
      <h4 className="text-lg font-semibold border-b pb-2">Edit Pengalaman</h4>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor={`jobTitle-${index}`}>Jabatan</Label>
          <Input
            id={`jobTitle-${index}`}
            name="jobTitle"
            value={localExp.jobTitle}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`company-${index}`}>Perusahaan</Label>
          <Input
            id={`company-${index}`}
            name="company"
            value={localExp.company}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`startDate-${index}`}>Mulai (Bulan/Tahun)</Label>
          <Input
            id={`startDate-${index}`}
            name="startDate"
            value={localExp.startDate}
            onChange={handleInputChange}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor={`endDate-${index}`}>Selesai (Bulan/Tahun)</Label>
          <Input
            id={`endDate-${index}`}
            name="endDate"
            value={localExp.endDate}
            onChange={handleInputChange}
            disabled={localExp.isCurrent} // Disable jika sedang bekerja
          />
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox
          id={`isCurrent-${index}`}
          checked={localExp.isCurrent}
          onCheckedChange={handleCheckboxChange}
        />
        <Label htmlFor={`isCurrent-${index}`}>
          Saat ini saya bekerja di sini
        </Label>
      </div>

      <div className="space-y-2">
        <Label htmlFor={`description-${index}`}>Deskripsi / Poin Kunci</Label>
        <Textarea
          id={`description-${index}`}
          name="description"
          value={localExp.description}
          onChange={handleInputChange}
          rows={5}
          placeholder="Gunakan poin-poin singkat (bullet points) untuk hasil terbaik!"
        />
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          Simpan Perubahan
        </Button>
      </div>
    </div>
  );
};

const StepExperience: React.FC<StepExperienceProps> = ({ data, setData }) => {
  // State untuk mengontrol item mana yang sedang dibuka/diedit
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  // 1. Fungsi untuk Menambahkan Pengalaman Baru
  const handleAddExperience = () => {
    const newExp: Experience = {
      id: uuidv4(),
      jobTitle: "New Position",
      company: "New Company",
      startDate: "",
      endDate: "",
      description: "",
      isCurrent: false,
    };
    setData((prev) => ({
      ...prev,
      experience: [newExp, ...prev.experience], // Tambahkan di awal array
    }));
    setEditingIndex(0); // Langsung buka editor untuk item baru (indeks 0)
  };

  // 2. Fungsi untuk Menghapus Pengalaman
  const handleDeleteExperience = (idToDelete: string) => {
    setData((prev) => ({
      ...prev,
      experience: prev.experience.filter((exp) => exp.id !== idToDelete),
    }));
    // Tutup editor jika item yang dihapus sedang diedit
    if (
      editingIndex !== null &&
      data.experience[editingIndex]?.id === idToDelete
    ) {
      setEditingIndex(null);
    }
  };

  // 3. Fungsi untuk Mengubah Urutan (Pindahkan ke atas/bawah)
  const handleMoveExperience = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;

    if (newIndex >= 0 && newIndex < data.experience.length) {
      const updatedExp = [...data.experience];
      // Swap elemen
      [updatedExp[index], updatedExp[newIndex]] = [
        updatedExp[newIndex],
        updatedExp[index],
      ];

      setData((prev) => ({ ...prev, experience: updatedExp }));

      // Perbarui state editingIndex
      if (editingIndex === index) setEditingIndex(newIndex);
      else if (editingIndex === newIndex) setEditingIndex(index);
    }
  };

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-3xl font-bold">Pengalaman Kerja</h2>
      <p className="text-gray-500">
        Tambahkan semua posisi yang relevan. Urutan akan muncul dari yang
        terbaru (atas) ke yang terlama (bawah).
      </p>

      <Button
        onClick={handleAddExperience}
        className="w-full bg-green-500 hover:bg-green-600">
        <PlusCircle className="h-4 w-4 mr-2" /> Tambah Pengalaman Baru
      </Button>

      <div className="space-y-4">
        {data.experience.map((exp, index) => (
          <div
            key={exp.id}
            className="p-4 border rounded-lg bg-white shadow-sm">
            {/* Header Item Pengalaman */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">
                  {exp.jobTitle || "Jabatan Tanpa Nama"}
                </h3>
                <p className="text-sm text-gray-600">
                  {exp.company || "Perusahaan Tanpa Nama"}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  {exp.startDate} - {exp.endDate}
                </p>
              </div>

              {/* Tombol Aksi Item */}
              <div className="flex space-x-2">
                {/* Tombol Pindah Urutan */}
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleMoveExperience(index, "up")}
                    disabled={index === 0}
                    className="h-7 w-7">
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => handleMoveExperience(index, "down")}
                    disabled={index === data.experience.length - 1}
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
                  onClick={() => handleDeleteExperience(exp.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Editor Detail Pengalaman (Conditional Rendering) */}
            {editingIndex === index && (
              <ExperienceItemEditor
                experience={exp}
                index={index}
                setData={setData}
                onClose={() => setEditingIndex(null)} // Tutup editor
              />
            )}
          </div>
        ))}
      </div>

      {/* Jika tidak ada pengalaman */}
      {data.experience.length === 0 && (
        <p className="text-center text-gray-500 italic">
          Belum ada pengalaman kerja yang ditambahkan.
        </p>
      )}
    </div>
  );
};

export default StepExperience;

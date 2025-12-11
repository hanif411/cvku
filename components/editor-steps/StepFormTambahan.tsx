"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Trash2, Edit2, ChevronUp, ChevronDown } from "lucide-react";
import { certifications } from "@/types/index";

interface Props {
  data: certifications[];
  setData: (value: certifications[]) => void;
  onNext: () => void;
  onBack: () => void;
}

// ===========================
// Editor untuk setiap item
// ===========================
const CertificationEditor: React.FC<{
  item: certifications;
  index: number;
  data: certifications[];
  setData: (value: certifications[]) => void;
  onClose: () => void;
}> = ({ item, index, data, setData, onClose }) => {
  const [localItem, setLocalItem] = useState(item);

  const handleChange = (field: keyof certifications, value: string | number) => {
    setLocalItem({ ...localItem, [field]: value });
  };

  const handleSave = () => {
    const newData = [...data];
    newData[index] = localItem;
    setData(newData);
    onClose();
  };

  return (
    <div className="p-4 border-t border-purple-200 bg-purple-50/50 space-y-4 mt-2 rounded">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Nama Sertifikasi</Label>
          <Input
            value={localItem.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Penerbit</Label>
          <Input
            value={localItem.issuer}
            onChange={(e) => handleChange("issuer", e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label>Tanggal Terbit</Label>
          <Input
            type="number"
            value={localItem.issue_date}
            onChange={(e) => handleChange("issue_date", Number(e.target.value))}
          />
        </div>
        <div className="space-y-2">
          <Label>Tanggal Expired (Opsional)</Label>
          <Input
            type="number"
            value={localItem.expiration_date}
            onChange={(e) => handleChange("expiration_date", Number(e.target.value))}
          />
        </div>
        <div className="space-y-2 col-span-2">
          <Label>Deskripsi</Label>
          <textarea
            value={localItem.description}
            onChange={(e) => handleChange("description", e.target.value)}
            className="w-full p-2 rounded  border"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose}>
          Batal
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={handleSave}>
          Simpan
        </Button>
      </div>
    </div>
  );
};

// ===========================
// Step Sertifikasi Utama
// ===========================
const StepCertifications: React.FC<Props> = ({ data, setData }) => {
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const addItem = () => {
    const newItem: certifications = {
      id: Date.now(),
      resume_id: 0,
      name: "",
      issuer: "",
      issue_date: 0,
      expiration_date: 0,
      description: "",
    };
    setData([...data, newItem]);
    setEditingIndex(data.length); // langsung edit
  };

  const removeItem = (index: number) => {
    setData(data.filter((_, i) => i !== index));
    if (editingIndex === index) setEditingIndex(null);
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= data.length) return;

    const list = [...data];
    [list[index], list[newIndex]] = [list[newIndex], list[index]];
    setData(list);

    if (editingIndex === index) setEditingIndex(newIndex);
    else if (editingIndex === newIndex) setEditingIndex(index);
  };

  return (
    <div className="space-y-5 p-6">
      <h2 className="text-xl font-semibold">Sertifikasi</h2>
      <p className="text-sm text-gray-400">
        Tambahkan sertifikasi atau lisensi profesional yang kamu miliki.
      </p>

      <Button
        onClick={addItem}
        className="flex items-center gap-2 w-full bg-purple-600 hover:bg-purple-700"
      >
        <PlusCircle size={16} /> Tambah Sertifikasi
      </Button>

      <div className="space-y-4">
        {data.map((item, index) => (
          <div key={item.id} className="p-4 border rounded-lg bg-white shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold">{item.name || "Sertifikasi Tanpa Nama"}</h3>
                <p className="text-sm text-gray-600">{item.issuer}</p>
                <p className="text-xs text-gray-400 mt-1">
                  {item.issue_date} - {item.expiration_date || "Saat ini"}
                </p>
              </div>

              <div className="flex space-x-2">
                <div className="flex flex-col space-y-1">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => moveItem(index, "up")}
                    disabled={index === 0}
                    className="h-7 w-7"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => moveItem(index, "down")}
                    disabled={index === data.length - 1}
                    className="h-7 w-7"
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>

                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setEditingIndex(editingIndex === index ? null : index)}
                  className="h-12 w-12"
                >
                  {editingIndex === index ? <ChevronUp className="h-4 w-4" /> : <Edit2 className="h-4 w-4" />}
                </Button>

                <Button
                  variant="destructive"
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => removeItem(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {editingIndex === index && (
              <CertificationEditor
                item={item}
                index={index}
                data={data}
                setData={setData}
                onClose={() => setEditingIndex(null)}
              />
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default StepCertifications;

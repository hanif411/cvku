"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { Template } from "@/app/_types/index";

const templates: Template[] = [
  {
    id: "creative",
    name: "Template Kreatif",
    description: "Desain modern & menarik, ideal untuk industri kreatif.",
    image: "/Cvats.png",
  },
  {
    id: "professional",
    name: "Template Profesional",
    description: "Klasik & rapi, cocok untuk karir korporat.",
    image: "/Cv.png",
    
  },
  {
    id: "minimalist",
    name: "Template Minimalis",
    description: "Bersih & fokus, menonjolkan esensi terbaik Anda.",
    image: "/CvMinimalis.png",
  },
];

const TemplatesPage: React.FC = () => {
  const router = useRouter();

  // Fungsi untuk menangani pemilihan template dan navigasi ke editor
  const handleSelectTemplate = (templateId: string) => {
    // Navigasi ke halaman editor dengan menyertakan ID template sebagai query parameter
    router.push(`/editor?template=${templateId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-gray-900">
          Pilih Template Resume Anda
        </h1>
        <p className="text-xl text-center text-gray-600 mb-12">
          Jelajahi berbagai pilihan desain modern dan profesional kami.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <Card
              key={template.id}
              className="flex flex-col h-full shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <CardHeader className="p-0">
              <div className="w-full h-80 overflow-hidden border-b border-gray-200">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover object-top"/>
              </div>
            </CardHeader>

              <CardContent className="flex-grow pt-4">
                <CardTitle className="text-xl font-semibold mb-2">
                  {template.name}
                </CardTitle>
                <p className="text-sm text-gray-600">{template.description}</p>
              </CardContent>
              <CardFooter className="pt-4">
                <Button
                  onClick={() => handleSelectTemplate(template.id)}
                  className="w-full">
                  Pilih Template Ini
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;

"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, LayoutGrid, Download } from "lucide-react";
import cvats from "../public/CvAts.png";
import cv from "../public/cv.png";
import cvminimalis from "../public/CvMinimalis.png";
import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="flex flex-col items-center text-center py-16 md:py-24 px-6 flex-grow">
        <div className="max-w-4xl">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 leading-tight">
            Buat <span className="text-green-500">Professional CV</span> kamu
            dalam hitungan menit
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-gray-600">
            Mulai dari modern templates hingga templates CV ATS
          </p>
          <Button
            size="lg"
            className=" text-lg py-3 px-8 transition-all duration-300 shadow-lg shadow-red-200">
            <Link href="/templates">Mulai buat Cv sekarang</Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
        <div className="w-full max-w-6xl my-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 pb-10">
            <div className="bg-white p-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ">
              <div className="h-112 bg-gray-100 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center text-sm text-gray-500">
                <Image src={cvats} alt="cv" />
              </div>
              <h4 className="text-xl font-semibold mt-5">Template Cv Ats</h4>
              <p className="text-sm text-gray-500 mb-5">
                Template Cv Ats cocok untuk lamar kerja dan sudah ats friendly
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300 ">
              <div className="h-112 border  rounded-md overflow-hidden flex items-center justify-center text-sm ">
                <Image src={cv} alt="cv" width={500} height={500} />
              </div>
              <h4 className="text-xl font-semibold mt-5">
                Template Profesional
              </h4>
              <p className="text-sm text-gray-500 mb-5">
                Tampilkan yang terbaik dengan format profesional standar
                industri.
              </p>
            </div>

            <div className="bg-white p-4 rounded-lg shadow-xl hover:shadow-2xl transition-all duration-300">
              <div className="h-112 bg-gray-100 border border-gray-200 rounded-md overflow-hidden flex items-center justify-center text-sm text-gray-500">
                <Image src={cvminimalis} alt="cv" width={500} height={500} />
              </div>
              <h4 className="text-xl font-semibold mt-5">
                Template Fresh Graduate
              </h4>
              <p className="text-sm text-gray-500 mb-5">
                Tidak ada pengalaman? Tidak masalah! Fokus pada pendidikan &
                skill.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10">
          <Button
            size="lg"
            className="bg-primary text-lg py-3 px-8 transition-all duration-300 shadow-xl shadow-green-200">
            <Link href="/templates">Discover Lebih Banyak Template Resume</Link>
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </header>

      <section className="py-16 px-6 md:px-20 bg-white border-t border-gray-100">
        <h3 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Mengapa My Cv
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="p-6 bg-blue-50 rounded-xl text-left shadow-md hover:shadow-lg transition-shadow duration-300 border border-blue-100">
            <Sparkles className="h-8 w-8 text-blue-600 mb-3" />
            <h4 className="text-xl font-semibold mb-2 text-gray-900">
              Modern Templates
            </h4>
            <p className="text-gray-600">
              Akses galeri template yang dirancang oleh ahli untuk menarik
              perhatian rekruter.
            </p>
          </div>
          <div className="p-6 bg-green-50 rounded-xl text-left shadow-md hover:shadow-lg transition-shadow duration-300 border border-green-100">
            <LayoutGrid className="h-8 w-8 text-green-600 mb-3" />
            <h4 className="text-xl font-semibold mb-2 text-gray-900">
              Real-Time Editing
            </h4>
            <p className="text-gray-600">
              Lihat perubahan secara instan di sisi kanan saat Anda mengisi data
              di sisi kiri.
            </p>
          </div>
          <div className="p-6 bg-purple-50 rounded-xl text-left shadow-md hover:shadow-lg transition-shadow duration-300 border border-purple-100">
            <Download className="h-8 w-8 text-purple-600 mb-3" />
            <h4 className="text-xl font-semibold mb-2 text-gray-900">
              Siap Cetak PDF
            </h4>
            <p className="text-gray-600">
              Unduh CV Anda dalam format PDF berkualitas tinggi, siap untuk
              dilamar.
            </p>
          </div>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="py-6 bg-gray-800 text-white text-center">
        <p className="text-sm">&copy; 2025 My Cv All rights reserved.</p>
      </footer>
    </div>
  );
}

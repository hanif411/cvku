// src/lib/Downloadpdf.ts
import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

export const downloadPDF = async (
  fullCvRef: React.RefObject<HTMLDivElement>
) => {
  if (!fullCvRef.current) {
    console.error("Full CV ref not found");
    return;
  }

  // Temukan container A4 di dalam ref
  const cvNode = fullCvRef.current.querySelector(
    "#cv-a4-container"
  ) as HTMLElement;

  if (!cvNode) {
    console.error("CV A4 container not found for PDF capture");
    return;
  }

  try {
    // Tambahkan kelas khusus untuk PDF (opsional)
    cvNode.classList.add("pdf-export");

    // Capture dengan kualitas tinggi
    const dataUrl = await htmlToImage.toPng(cvNode, {
      quality: 1.0,
      pixelRatio: 3,
      backgroundColor: "#ffffff",
      cacheBust: true,
    });

    // Hapus kelas setelah capture
    cvNode.classList.remove("pdf-export");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = 210;
    const pdfHeight = 297;

    // Tambahkan gambar ke PDF
    pdf.addImage(dataUrl, "PNG", 0, 0, pdfWidth, pdfHeight);

    // Simpan file
    pdf.save("CV_Professional.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

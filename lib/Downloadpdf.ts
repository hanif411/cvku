import * as htmlToImage from "html-to-image";
import jsPDF from "jspdf";

export const downloadPDF = async (previewRef: any) => {
  if (!previewRef.current) return;

  const node = previewRef.current;

  const dataUrl = await htmlToImage.toPng(node, {
    cacheBust: true,
    pixelRatio: 2, // high quality
  });

  const img = new Image();
  img.src = dataUrl;

  img.onload = () => {
    const pdf = new jsPDF("p", "mm", "a4");

    const pdfWidth = 210;
    const pdfHeight = (img.height * pdfWidth) / img.width;

    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("CV.pdf");
  };
};

import React, { useEffect, useState } from "react";
import { PDFDocument } from "pdf-lib";

const PdfMerger = ({ pdfUrls }) => {
  const [mergedPdfUrl, setMergedPdfUrl] = useState("");

  const mergePdfs = async () => {
    try {
      // Charger les fichiers PDF à partir des URLs
      const pdfBytesArray = await Promise.all(
        pdfUrls.map((url) => fetch(url).then((res) => res.arrayBuffer()))
      );

      // Créer un nouveau document PDF
      const mergedPdf = await PDFDocument.create();

      for (const pdfBytes of pdfBytesArray) {
        // Charger chaque PDF
        const pdf = await PDFDocument.load(pdfBytes);

        // Copier toutes les pages de chaque PDF dans mergedPdf
        const pages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        pages.forEach((page) => mergedPdf.addPage(page));
      }

      // Sauvegarder le nouveau PDF fusionné
      const mergedPdfBytes = await mergedPdf.save();
      const mergedPdfBlob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

      setMergedPdfUrl(mergedPdfUrl);
    } catch (error) {
      console.error("Erreur lors de la fusion des PDF : ", error);
    }
  };

  const printPdf = () => {
    if (mergedPdfUrl) {
      const printWindow = window.open(mergedPdfUrl);
      printWindow.addEventListener('load', () => {
        printWindow.focus();
        printWindow.print();
      });
    }
  };

  // Fusionner les PDFs lorsque les URLs sont fournies ou modifiées
  useEffect(() => {
    if (pdfUrls && pdfUrls.length === 4) {
      mergePdfs();
    }
  }, [pdfUrls]);

  return (
    <div>
      {mergedPdfUrl && <button onClick={printPdf}>Imprimer le PDF fusionné</button>}
    </div>
  );
};

export default PdfMerger;
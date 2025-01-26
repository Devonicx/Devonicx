import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import { Document, Page, pdfjs } from "react-pdf";
import html2canvas from "html2canvas";
import { content } from "html2canvas/dist/types/css/property-descriptors/content";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface printType {
  content: any;
  options: any;
}

const Print: React.FC<printType> = ({
  content,
  options = { margin: 20, paddingTop: 20, paddingBottom: 20 },
}) => {
  const canvasRef = useRef(null);
  const [isPrinting, setIsPrinting] = useState(false);

  const handlePrint = async () => {
    setIsPrinting(true);

    const printContainer: any = document.getElementById("print-container");
    const canvas = await html2canvas(printContainer);
    const imgData = canvas.toDataURL("image/png");

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [210, 297], // A4 size (consider options.format for customization)
    });

    const imgProps = doc.getImageProperties(imgData);
    const width = doc.internal.pageSize.getWidth();
    const height = (imgProps.height * width) / imgProps.width;

    // doc.addImage(imgData, "PNG", 0, options.paddingTop, width, height);
    try {
      doc.addImage(imgData, "PNG", 0, options.paddingTop, width, height); // Adjust coordinates as needed
      doc.save("my_pdf.pdf");
    } catch (error) {
      console.error("Error adding image:", error);
      // Handle the error gracefully, e.g., display an error message to the user
    }
    doc.autoPrint();
    doc.save("dynamic-print.pdf"); // Optional: Save as PDF

    setIsPrinting(false);
  };

  return (
    <div>
      <div id="print-container" ref={canvasRef} style={{ display: "none" }}>
        {content}
      </div>
      <button onClick={handlePrint} disabled={isPrinting}>
        {isPrinting ? "Printing..." : "Print"}
      </button>
    </div>
  );
};

export default Print;

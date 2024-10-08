"use client";
import { Viewer, Worker } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';


const PdfViewer = ({ pdfUrl }: { pdfUrl: string }) => {
    const defaultLayoutPluginInstance = defaultLayoutPlugin();
  return (
    <div className=" w-[90vw] md:w-[80vw]  h-[90vh] mx-auto">
    <Worker   workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
      <Viewer theme={"dark"}  plugins={[defaultLayoutPluginInstance]}  fileUrl={pdfUrl} />
    </Worker>
    </div>
  );
};

export default PdfViewer;

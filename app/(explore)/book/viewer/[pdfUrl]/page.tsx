import PdfViewer from "@/app/(explore)/(components)/pdf-viewer";

const page = ({ params }: { params: { pdfUrl: string } }) => {
    const pdfUrl = decodeURIComponent(params.pdfUrl);

    if(!pdfUrl) {
      return (
        <div>
          Pdf Not found
        </div>
      )
    }


  return (
    <div className="w-full">
      <PdfViewer pdfUrl={pdfUrl} />
    </div>
  )
}

export default page

import React, { useState, useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Particle from "../Particles";
import pdf from "/Ayush_web_resume.pdf";
import { AiOutlineDownload } from "react-icons/ai";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import "./resume.css";

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

function ResumeNew() {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    setWidth(window.innerWidth);
  }, []);

  return (
    <div>
      <Container fluid className="resume-section">
        <Particle />


        <Row className="resume-button-row">
          <Button variant="primary" href={pdf} target="_blank" className="download-btn">
            <AiOutlineDownload /> &nbsp;Download Resume
          </Button>
        </Row>

        <Row className="resume-pdf-row">
          <Document file={pdf} className="pdf-document">
            <Page
              pageNumber={1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              scale={width > 768 ? 1.5 : 0.6}
              className="pdf-page"
            />
          </Document>
        </Row>

        <Row className="resume-button-row">
          <Button variant="primary" href={pdf} target="_blank" className="download-btn">
            <AiOutlineDownload /> &nbsp;Download Resume
          </Button>
        </Row>
      </Container>
    </div>
  );
}

export default ResumeNew;

import React, { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const PDFTextExtractor = () => {
    const [pdfText, setPdfText] = useState('');

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            const arrayBuffer = await file.arrayBuffer();
            const pdfDoc = await PDFDocument.load(arrayBuffer);

            let fullText = '';
            const pages = pdfDoc.getPages();

            pages.forEach(page => {
                const text = page.getTextContent(); // text extraction
                fullText += text + '\n';
            });

            setPdfText(fullText);
        } else {
            alert('Please upload a valid PDF file.');
        }
    };

    return (
        <div>
            <h1>PDF Text Extractor</h1>
            <input type="file" accept="application/pdf" onChange={handleFileChange} />
            <textarea
                rows="20"
                cols="80"
                value={pdfText}
                readOnly
                placeholder="Extracted text will appear here..."
            ></textarea>
        </div>
    );
};

export default PDFTextExtractor;

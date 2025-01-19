const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const app = express();
const upload = multer({ dest: "uploads/" });
const cors = require('cors');

app.use(cors())
app.use(express.json());

const fs = require("fs");
const PdfReader = require("pdfreader").PdfReader;





const extractTextFromPDF = (filePath) => {
  return new Promise((resolve, reject) => {
    let text = "";
    new PdfReader().parseFileItems(filePath, (err, item) => {
      if (err) {
        return reject(err);
      }
      if (!item) {
        return resolve(text); // End of file
      }
      if (item.text) {
        text += item.text + " "; // Collect text
      }
    });
  });
};
























app.post('/extracttext',upload.single("pdf"), async (req, res) => {
    if (!req.file) {
        return res.status(400).send({ message: 'No file uploaded.' });
    }

    const filePath = req.file.path;
    
   const text = await extractTextFromPDF(filePath);

   fs.unlinkSync(filePath);

   res.json({ text });




})

app.listen(4000, () => {
    console.log('The app is listening at port ')
})
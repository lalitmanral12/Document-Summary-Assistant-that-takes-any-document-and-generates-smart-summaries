// App.jsx
import React, { useState } from "react";
import FileUpload from "./components/FileUpload";
import Results from "./components/Results";
import SummaryOptions from "./components/SummaryOptions";
import Loader from "./components/Loader";
import axios from "axios";
import "./index.css";

const App = () => {
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryLength, setSummaryLength] = useState("medium");
  const [loading, setLoading] = useState(false);


  const handleFileUpload = async (uploadedFile) => {
    setFile(uploadedFile);
    setLoading(true);

    try {
      const extractedText = await uploadPdfFile(uploadedFile);
      setExtractedText(extractedText);
      generateSummary(extractedText); 
    } catch (error) {
      console.error("Error extracting text:", error);
    } finally {
      setLoading(false);
    }
  };


  const uploadPdfFile = async (file) => {
    try {
      const formData = new FormData();
      formData.append("pdf", file); 
      formData.append("name", file.name); 

      const response = await axios.post(
       "https://document-summary-assistant-that-takes-4752.onrender.com/extracttext",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );

      console.log("File uploaded successfully:", response.data);
      return response.data.text; 
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  };

  const generateSummary = (text) => {
    const summaries = {
      short: `Short summary of: ${text.slice(0, 50)}...`, 
      medium: `Medium-length summary: ${text.slice(0, 100)}...`, 
      long: `Detailed summary: ${text}`,
    };
    setSummary(summaries[summaryLength]);
  };

  const handleSummaryChange = (length) => {
    setSummaryLength(length);

   
    if (extractedText) {
      generateSummary(extractedText);
    }
  };

  return (
    <div className="app">
      <h1>Document Text Extraction & Summarization</h1>
    
      <FileUpload onFileUpload={handleFileUpload} />

   
      <SummaryOptions
        selectedOption={summaryLength}
        onOptionChange={handleSummaryChange}
      />

      {loading ? (
        <Loader />
      ) : (
        <Results extractedText={extractedText} summary={summary} />
      )}
    </div>
  );
};

export default App;

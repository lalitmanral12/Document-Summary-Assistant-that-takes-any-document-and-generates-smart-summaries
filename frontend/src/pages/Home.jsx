// Home.jsx
import React, { useState } from 'react';
import FileUpload from '../components/FileUpload';
import Results from '../components/Results';
import SummaryOptions from '../components/SummaryOptions';
import { Layout } from 'antd';

const { Content } = Layout;

const Home = () => {
    const [extractedText, setExtractedText] = useState('');
    const [summary, setSummary] = useState('');
    const [summaryLength, setSummaryLength] = useState('medium');

    const handleFileProcess = (text) => {
        setExtractedText(text);
        generateSummary(text);
    };

    const generateSummary = (text) => {
        const wordCount = text.split(' ').length;
        const summaries = {
            short: text.split(' ').slice(0, Math.min(50, wordCount)).join(' ') + '...',
            medium: text.split(' ').slice(0, Math.min(100, wordCount)).join(' ') + '...',
            long: text.split(' ').slice(0, Math.min(200, wordCount)).join(' ') + '...',
        };
        setSummary(summaries[summaryLength]);
    };

    const handleSummaryChange = (length) => {
        setSummaryLength(length);
        if (extractedText) generateSummary(extractedText);
    };

    return (
        <Layout style={{ padding: '20px', minHeight: '100vh' }}>
            <Content>
                <FileUpload onFileProcess={handleFileProcess} />
                <SummaryOptions
                    selectedOption={summaryLength}
                    onOptionChange={handleSummaryChange}
                />
                <Results extractedText={extractedText} summary={summary} />
            </Content>
        </Layout>
    );
};

export default Home;

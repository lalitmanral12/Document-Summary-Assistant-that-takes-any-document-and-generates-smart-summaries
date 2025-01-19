// Results.jsx
import React from 'react';

const Results = ({ extractedText, summary }) => {
    return (
        <div className="results">
            <div className="section">
                <h3>Extracted Text</h3>
                <p>{extractedText || 'No text available.'}</p>
            </div>
            <div className="section">
                <h3>Summary</h3>
                <p>{summary || 'Summary will appear here.'}</p>
            </div>
        </div>
    );
};

export default Results;

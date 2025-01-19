// SummaryOptions.jsx
import React from 'react';

const SummaryOptions = ({ selectedOption, onOptionChange }) => {
    return (
        <div className="summary-options">
            <label>
                <input
                    type="radio"
                    value="short"
                    checked={selectedOption === 'short'}
                    onChange={() => onOptionChange('short')}
                />
                Short
            </label>
            <label>
                <input
                    type="radio"
                    value="medium"
                    checked={selectedOption === 'medium'}
                    onChange={() => onOptionChange('medium')}
                />
                Medium
            </label>
            <label>
                <input
                    type="radio"
                    value="long"
                    checked={selectedOption === 'long'}
                    onChange={() => onOptionChange('long')}
                />
                Long
            </label>
        </div>
    );
};

export default SummaryOptions;

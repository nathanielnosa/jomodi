import React, { useState } from 'react';

function StoreTop({ onSortChange }) {
    // State to keep track of the selected sorting option
    const [selectedSortOption, setSelectedSortOption] = useState('1');

    // Function to handle the change in sorting option
    const handleSortChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSortOption(selectedValue);
        onSortChange(selectedValue); // Call the onSortChange prop with the selected value
    };

    return (
        <div className="store-filter clearfix">
            <div className="store-sort">
                <label>
                    Sort By:
                    <select className="input-select" value={selectedSortOption} onChange={handleSortChange}>
                        <option value="1">Recommended</option>
                        <option value="2">Price: Low to High</option>
                        <option value="3">Price: High to Low</option>
                        <option value="4">Newest Arrivals</option>
                    </select>
                </label>
            </div>
        </div>
    );
}

export default StoreTop;

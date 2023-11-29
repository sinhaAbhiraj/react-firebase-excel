// src/components/DataTable.tsx
import React, { useState } from "react";

interface DataTableProps {
  data: any[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Filter data based on the search term
  const filteredData = data.filter((row) =>
    Object.values(row)
      .map((value) => String(value).toLowerCase())
      .some((value) => value.includes(searchTerm.toLowerCase()))
  );

  return (
    <div>
      {/* Search input */}
      <input
        type="text"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Display table */}
      <table>
        <thead>
          <tr>
            {Object.keys(data[0]).map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Object.values(row).map((value, colIndex) => (
                <td key={colIndex}>{String(value)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;

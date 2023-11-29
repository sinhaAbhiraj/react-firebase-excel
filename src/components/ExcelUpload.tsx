// src/components/ExcelUpload.tsx
import React, { ChangeEvent, useState, Dispatch, SetStateAction } from "react";
import * as XLSX from "xlsx";
import { firestore } from "../firebaseConfig";
import Button from '@mui/material/Button';
// import Input from '@mui/joy/Input';


interface ExcelUploadProps {
  setUploadedData: Dispatch<SetStateAction<any[]>>;
}

const ExcelUpload: React.FC<ExcelUploadProps> = ({ setUploadedData }) => {
  const [excelData, setExcelData] = useState<any[]>([]);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = async (event) => {
        if (event.target) {
          const data = event.target.result;
          const workbook = XLSX.read(data, { type: "binary" });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(sheet);
          setExcelData(jsonData);
        }
      };
      reader.readAsBinaryString(file);
    }
  };

  const uploadDataToFirestore = async () => {
    const batch = firestore.batch();
    const collectionRef = firestore.collection("users");

    excelData.forEach((data) => {
      const newDocRef = collectionRef.doc();
      batch.set(newDocRef, data);
    });

    await batch.commit();
    setExcelData([]); // Clear the uploaded data
    

    // setUploadedData([]); // Update the parent component state
  };

  return (
    <div>
       {/* <Input placeholder="Type in here…" /> */}

      <input  placeholder="Type in here…"  type="file" accept=".xlsx, .xls" onChange={handleFileChange} />
      <Button variant="contained" onClick={uploadDataToFirestore}>Upload to Firestore</Button>
      {/* <Button variant="contained">Hello world</Button>; */}
    </div>
  );
};

export default ExcelUpload;

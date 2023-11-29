import React, { useState,useEffect } from "react";
import { firebaseConfig } from "./firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import ExcelUpload from "./components/ExcelUpload";
import DataTable from "./components/DataTable";

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const App: React.FC = () => {
  const [uploadedData, setUploadedData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = firebase.firestore().collection("users");
      const snapshot = await collectionRef.get();
      const data = snapshot.docs.map((doc) => doc.data());
      setUploadedData(data);
    };

    fetchData();
  }, []);





  return (
    <div>
      <h1>React Firebase Excel Upload</h1>
      <ExcelUpload setUploadedData={setUploadedData} />
      {uploadedData.length > 0 ?( <DataTable data={uploadedData} />)
      : (
        <p>No data available.</p>
      )
      }
    </div>
  );
};

export default App;

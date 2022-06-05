import React, { useState } from 'react';
import InputForm from './InputFile/InputFile';
import './App.scss';
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadString } from "firebase/storage";

function App() {
  let storageRef: any;
  const [base64Str, setBase64Str] = useState<string>('');
  const [fileNamestr, setFilenamestr] = useState<string>('');

  const selectSymbolHandler = (selectedSymbol: FileReader, fileName: string) => {
    console.log('selectSymbolHandler', selectedSymbol);
    console.log('fileName', fileName);

    selectedSymbol.onloadend = () => {
      setBase64Str(selectedSymbol?.result as string);
      setFilenamestr((fileName as any).name);
    }
  }

  const uploadPic = () => {
    console.log('upload pic...', base64Str);
    storageRef = setStorageRef();

    uploadString(storageRef, base64Str, 'data_url').then((snapshot) => {
      console.log('Uploaded a base64url string!', snapshot);
    });
  }

  const setStorageRef = () => {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_API_KEY,
      storageBucket: process.env.REACT_APP_SERVER_BASE_URL
    };  
    
    const firebaseApp = initializeApp(firebaseConfig);
    const storage = getStorage(firebaseApp);
    return ref(storage, fileNamestr);
  }

  return (
    <div className="App">
      {/* <form> */}
        <div><InputForm onSelectFile={(selectedSymbol: FileReader, fileName: string) => selectSymbolHandler(selectedSymbol, fileName)}></InputForm></div>
        <div className="centerDiv"><button onClick={() => uploadPic()}>Upload!</button></div>
      {/* </form> */}
    </div>
  );
}

export default App;



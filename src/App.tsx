import React from 'react';
import InputForm from './InputFile/InputFile';
import './App.scss';

function App() {
  const selectSymbolHandler = (selectedSymbol: FileReader | null, fileName: string) => {
    console.log('selectSymbolHandler', selectedSymbol);
    console.log('fileName', fileName);
  }

  return (
    <div className="App">
      <form>
        <div><InputForm onSelectFile={(selectedSymbol: FileReader | null, fileName: string) => selectSymbolHandler(selectedSymbol, fileName)}></InputForm></div>
      </form>
    </div>
  );
}

export default App;

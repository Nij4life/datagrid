import React from 'react';
import Table from './components/table/Table';
import SearchGlobal from './components/table/SearchGlobal';
import './App.scss';

function App() {
  return (
    <div className="App">
      <SearchGlobal />
      <Table />
    </div>
  );
}

export default App;

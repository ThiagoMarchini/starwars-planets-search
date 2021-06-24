import React from 'react';
import Filters from './components/Filters';
import Table from './components/Table';
import SWProvider from './context/SWProvider';
import './App.css';

function App() {
  return (
    <SWProvider>
      <main>
        <Filters />
        <Table />
      </main>
    </SWProvider>
  );
}

export default App;

import React from 'react';
import Table from './components/Table';
import SWProvider from './context/SWProvider';
import './App.css';

function App() {
  return (
    <SWProvider>
      <main>
        <Table />
      </main>
    </SWProvider>
  );
}

export default App;

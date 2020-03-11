import React from 'react';
import faker from 'faker';
import './App.css';

const getData = () => {
  return [faker.name.findName(), faker.internet.email(), faker.company.companyName()];
}

const Row = ({ index }) => {
  const d = getData();
  return (
    <tr style={index % 2 === 0 ? { background: '#ccc' } : { background: '#999' }}>{d.map(data => (<td>{data}</td>))}</tr>
  );
};

const Table = ({ data }) => {
  return (
    <table>
      <caption>My table</caption>
      <thead>
        <tr>
          <th>First</th>
          <th>Second</th>
          <th>Third</th>
        </tr>
      </thead>
      <tbody>
        {data.map((data, i) => <Row key={i} index={i} />)}
      </tbody>
    </table>
  );
};

function App() {
  return (
    <div className="App">
      <Table data={[1, 2, 3, 4, 5]} />
    </div>
  );
}

export default App;

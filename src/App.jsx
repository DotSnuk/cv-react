import { useState } from 'react';
import Form from './Form';
import CV from './CV';

function Header({ props }) {
  // take in state, isEdit?
  const click = () => props();

  return (
    <header>
      <h1>CV</h1>
      <div>
        <input type='button' value='submit' onClick={click} />
      </div>
    </header>
  );
}

function isName(val) {
  return val.id === 'firstname' || val.id === 'lastname';
}

function compareName(a, b) {
  if (a.id > b.id) return 1;
  return -1;
}

function joinName(data) {
  const newData = [...data];
  const filteredData = newData.filter(isName).sort((a, b) => compareName(a, b));
  const name = filteredData.map(d => d.inputData).join(' ');
  filteredData.map(d => {
    const indx = newData.findIndex(item => item.id === d.id);
    newData.splice(indx, 1);
  });
  return [{ id: 'name', group: 'about', inputData: name }, ...newData];
}

function Content({ isEdit, data, cb }) {
  if (isEdit) return <Form cb={cb} data={data} />;
  return <CV data={joinName(data)} />;
}

export default function App() {
  const [isEdit, setIsEdit] = useState(true);
  const [data, setData] = useState([]);

  const renderCV = () => {
    setIsEdit(!isEdit);
  };

  const addData = (newData, group, id) => {
    setData(previous => {
      // if input is cleared
      if (newData === '') {
        return previous.filter(p => p.id !== id);
      }

      // if id exists, update it
      const existItemIndex = previous.findIndex(item => item.id === id);
      if (existItemIndex !== -1) {
        const updateData = [...previous];
        updateData[existItemIndex] = {
          ...updateData[existItemIndex],
          inputData: newData,
        };
        return updateData;
      }

      return [...previous, { id, group, inputData: newData }];
    });
  };

  return (
    <>
      <Header props={renderCV} />
      <Content isEdit={isEdit} data={data} cb={addData} />
    </>
  );
}

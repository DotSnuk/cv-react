import { useState, useCallback } from 'react';
// import { useEffect } from 'react';
import Form from './Form';
import CV from './CV';

function Header({ props }) {
  // take in state, isEdit?
  const click = e => props(e);

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

function isEmpty(input) {
  return input.trim() === '';
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

function Content({ isEdit, data, cb, submit }) {
  if (isEdit) return <Form cb={cb} data={data} submit={submit} />;
  return <CV data={joinName(data)} />;
}

export default function App() {
  const [isEdit, setIsEdit] = useState(true);
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState({
    education: 0,
    work: 0,
  });

  // change name
  const renderCV = e => {
    e.preventDefault();

    if (checkRequired()) {
      setIsEdit(!isEdit);
    }
  };

  const checkRequired = () => {
    // const tempData = [...data];
    // const filteredData = tempData.filter(d => d.required === true);
    // return filteredData.every(elemnt => !isEmpty(elemnt.inputData));
    return true;
  };

  const addData = (inputData, id, group) => {
    setData(previous =>
      previous.some(item => item.id === id && item.group === group)
        ? previous.map(item =>
            item.id === id && item.group === group
              ? { ...item, inputData }
              : item,
          )
        : [...previous, { inputData, id, group }],
    );
  };

  return (
    <>
      <Header props={renderCV} />
      <Content isEdit={isEdit} data={data} cb={addData} />
    </>
  );
}

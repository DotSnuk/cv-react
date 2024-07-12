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

function Content({ isEdit, data, cb }) {
  return <>{isEdit ? <Form cb={cb} /> : <CV data={data} />}</>;
}

export default function App() {
  const [isEdit, setIsEdit] = useState(true);
  const [data, setData] = useState([]);

  const renderCV = () => {
    setIsEdit(!isEdit);
  };

  const addData = (newData, id) => {
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

      return [...previous, { id, inputData: newData }];
    });
  };

  return (
    <>
      <Header props={renderCV} />
      <Content isEdit={isEdit} data={data} cb={addData} />
    </>
  );
}

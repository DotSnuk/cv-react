import { useState } from 'react';
import Form from './Form';

function Header({ props }) {
  // take in state, isEdit?
  const click = () => console.log(props);

  return (
    <header>
      <h1>CV</h1>
      <div>
        <input type='button' value='submit' onClick={click} />
      </div>
    </header>
  );
}

function Content(cb) {
  return <Form cb={cb} />;
}

export default function App() {
  const [data, setData] = useState([]);

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
        updateData[existItemIndex] = { ...updateData[existItemIndex], newData };
        return updateData;
      }

      return [...previous, { id, newData }];
    });
  };

  //     setData(d => [...d, { id, newData }]);

  return (
    <>
      <Header props={data} />
      <Content cb={addData} />
    </>
  );
}

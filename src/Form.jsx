import { useState } from 'react';

function Heading({ txt }) {
  return <h2>{txt}</h2>;
}

function Input({ cb, props }) {
  let state;
  const { type, id } = props;
  type === 'tel' || type === 'number' ? (state = 0) : (state = '');
  // const [input, setInput] = useState(state);
  return (
    <div className='inputfield'>
      <label htmlFor={id}>{id}</label>
      <input type={type} onChange={e => cb.cb(e.target.value, id)} />
    </div>
  );
}

const submitButton = () => {};

export default function Form({ cb }) {
  return (
    <form>
      <Heading txt={'About you'} />
      <Input cb={cb} props={{ type: 'text', id: 'firstname' }} />
      <Input cb={cb} props={{ type: 'text', id: 'lastname' }} />
      <Input cb={cb} props={{ type: 'number', id: 'age' }} />
      <Input cb={cb} props={{ type: 'mail', id: 'email' }} />
      <Input cb={cb} props={{ type: 'tel', id: 'phone' }} />
    </form>
  );
}

import { useState } from 'react';

function Heading({ txt }) {
  return <h2>{txt}</h2>;
}

function Input({ cb, props }) {
  const { type, group, id } = props;
  return (
    <div className='inputfield'>
      <label htmlFor={id}>{id}</label>
      <input
        type={type}
        id={id}
        onChange={e => cb.cb(e.target.value, group, id)}
      />
    </div>
  );
}

const submitButton = () => {};

export default function Form(cb) {
  return (
    <form>
      <Heading txt={'About you'} />
      <Input
        cb={cb}
        props={{ type: 'text', id: 'firstname', group: 'about' }}
      />
      <Input cb={cb} props={{ type: 'text', id: 'lastname', group: 'about' }} />
      <Input cb={cb} props={{ type: 'number', id: 'age', group: 'about' }} />
      <Input cb={cb} props={{ type: 'mail', id: 'email', group: 'about' }} />
      <Input cb={cb} props={{ type: 'tel', id: 'phone', group: 'about' }} />
    </form>
  );
}

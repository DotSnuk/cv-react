import inputTemplate from './inputtemplate.json';
import plussvg from './assets/plus.svg';
import { useEffect } from 'react';

function Heading({ txt }) {
  return <h2>{txt}</h2>;
}

function getAttributes({ cb, props }) {
  if (props.inputProp.id === 'picture') {
    return {
      id: props.inputProp.id,
      accept: 'image/*',
      onChange: e => cb(e.target.files, props.inputProp),
    };
  }
  return {
    id: props.inputProp.id,
    value: props.inputData,
    onChange: e => cb(e.target.value, props.inputProp),
  };
}

function Input({ cb, props }) {
  const { id, label } = props.inputProp;
  const attributes = getAttributes({ cb, props });

  return (
    <div className='inputfield'>
      <label htmlFor={id}>{label}</label>
      <input {...attributes} />
    </div>
  );
}

function initAddTemplate(cb, inputs) {
  inputs.map(inputProperties => {
    cb('', inputProperties);
  });
}

function NewForm() {
  // take parameter for which form it is
  return (
    <a href='#'>
      <img className='svg' src={plussvg} />
    </a>
  );
}

function Education({ cb, data }) {
  return (
    <>
      <NewForm />
    </>
  );
}

function About({ cb, data }) {
  const inputs = inputTemplate.about;
  useEffect(() => {
    if (data.about.length === 0) {
      // other solution for education and work will need to
      // make use of groupId
      initAddTemplate(cb, inputs);
    }
  }, []);

  return (
    <>
      {data.about.map(item => {
        return <Input key={item.data.inputProp.id} cb={cb} props={item.data} />;
      })}
    </>
  );
}

export default function Form({ cb, data }) {
  return (
    <form id='inputform'>
      <Heading txt={'About you'} />
      <About cb={cb} data={data} />
      <Heading txt={'Education'} />
      <Education cb={cb} data={data} />
    </form>
  );
}

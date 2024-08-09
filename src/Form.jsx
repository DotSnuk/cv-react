import inputTemplate from './inputtemplate.json';
import plussvg from './assets/plus.svg';
import { useEffect } from 'react';

function Heading({ txt }) {
  return <h2>{txt}</h2>;
}

function getAttributes({ cb, props }) {
  const { inputData, id, group } = props;

  if (props.id === 'picture') {
    return {
      id: id,
      accept: 'image/*',
      onChange: e => cb(e.target.files, id, group),
    };
  }

  return {
    id: id,
    value: inputData,
    onChange: e => cb(e.target.value, id, group),
  };
}

function Input({ cb, props }) {
  const { id, label } = props;
  const attributes = getAttributes({ cb, props });

  return (
    <div className='inputfield'>
      <label htmlFor={id}>{label}</label>
      <input {...attributes} />
    </div>
  );
}

function initAddTemplate(cb, inputs) {
  inputs.map(item => {
    cb('', item.id, item.group);
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
    initAddTemplate(cb, inputs);
  }, []);

  return (
    <>
      {data.map(item => {
        // check for item exists
        // const itemExists = data.findIndex(d => d.id === item.id);
        // if (itemExists !== -1) item.inputData = data[itemExists].inputData;

        return <Input key={item.id} cb={cb} props={item} />;
      })}
    </>
  );
}

{
  /* <>
      {inputs.map(item => {
        // check for item exists
        const itemExists = data.findIndex(d => d.id === item.id);
        if (itemExists !== -1) item.inputData = data[itemExists].inputData;

        return <Input key={item.id} cb={cb} props={item} />;
      })}
    </> */
}

export default function Form({ cb, data }) {
  return (
    <form id='inputform'>
      <Heading txt={'About you'} />
      <About cb={cb} data={data.filter(d => d.group === 'about')} />
      <Heading txt={'Education'} />
      <Education cb={cb} data={data.filter(d => d.group === 'education')} />
    </form>
  );
}

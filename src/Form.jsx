import inputTemplate from './inputtemplate.json';
import plussvg from './assets/plus.svg';
import { useEffect } from 'react';

function Heading({ txt }) {
  return <h2>{txt}</h2>;
}

function getAttributes({ cb, props }) {
  if (props.data.inputProp.id === 'picture') {
    return {
      id: props.data.inputProp.id,
      accept: 'image/*',
      onChange: e => cb(e.target.files, props.data.inputProp, props.groupId),
    };
  }
  return {
    id: props.data.inputProp.id,
    value: props.data.inputData,
    onChange: e => cb(e.target.value, props.data.inputProp, props.groupId),
  };
}

function Input({ cb, props }) {
  const { id, label } = props.data.inputProp;
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

function NewForm({ cb, cbCounter, group }) {
  const inputs = inputTemplate[group];
  const addInputs = e => {
    e.preventDefault();
    initAddTemplate(cb, inputs);
    cbCounter(group);
  };

  return (
    <a
      onClick={e => {
        addInputs(e);
      }}
    >
      <img className='svg' src={plussvg} />
    </a>
  );
}

function Education({ cb, cbCounter, data }) {
  return (
    <>
      {data.education.map(item => {
        return (
          <Input
            key={item.data.inputProp.id + item.groupId}
            cb={cb}
            props={item}
          />
        );
      })}
      <NewForm cb={cb} cbCounter={cbCounter} group={'education'} />
    </>
  );
}

function About({ cb, data }) {
  const inputs = inputTemplate.about;
  useEffect(() => {
    if (data.about.length === 0) {
      initAddTemplate(cb, inputs);
    }
  }, []);

  return (
    <>
      {data.about.map(item => {
        return (
          <Input
            key={item.data.inputProp.id + item.groupId}
            cb={cb}
            props={item}
          />
        );
      })}
    </>
  );
}

export default function Form({ cb, cbCounter, data }) {
  return (
    <form id='inputform'>
      <Heading txt={'About you'} />
      <About cb={cb} data={data} />
      <Heading txt={'Education'} />
      <Education cb={cb} cbCounter={cbCounter} data={data} />
    </form>
  );
}

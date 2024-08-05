import inputTemplate from './inputtemplate.json';
import { useEffect } from 'react';

function Heading({ txt }) {
  return <h2>{txt}</h2>;
}

function getAttributes({ cb, props }) {
  const { type, group, id, inputData, required } = props;

  if (props.id === 'picture') {
    return {
      type: type,
      id: id,
      accept: 'image/*',
      onChange: e => cb(e.target.files, group, id),
    };
  }

  return {
    type: type,
    id: id,
    value: inputData,
    onChange: e => cb(e.target.value, group, id, required),
  };
}

function Input({ cb, props }) {
  const { label, id } = props;
  const attributes = getAttributes({ cb, props });

  return (
    <div className='inputfield'>
      <label htmlFor={id}>{label}</label>
      <input {...attributes} />
    </div>
  );
}

// type={type}
//         id={id}
//         {...(id === 'picture' && { accept: 'image/*' })}
//         {...(id === 'picture'
//           ? { onChange: e => cb(e.target.files, group, id) }
//           : { onChange: e => cb(e.target.value, group, id), value: inputData })}

// onChange={e => cb(e.target.value, group, id)}

function initAddTemplate(cb, inputs) {
  console.log(inputs);
  inputs.map(item => {
    cb(
      item.inputData,
      item.group,
      item.id,
      item.required,
      item.type,
      item.label,
    );
  });
}

function GetAbout({ cb, data }) {
  const inputs = inputTemplate.about;
  useEffect(() => {
    initAddTemplate(cb, inputs);
  }, []);

  return (
    <>
      {inputs.map(item => {
        // check for item exists
        const itemExists = data.findIndex(d => d.id === item.id);
        if (itemExists !== -1) item.inputData = data[itemExists].inputData;

        return <Input key={item.id} cb={cb} props={item} />;
      })}
    </>
  );
}

export default function Form({ cb, data }) {
  return (
    <form id='inputform'>
      <Heading txt={'About you'} />
      <GetAbout cb={cb} data={data.filter(d => d.group === 'about')} />
    </form>
  );
}

// onSubmit={submit}

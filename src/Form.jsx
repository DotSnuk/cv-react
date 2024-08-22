import inputTemplate from './inputtemplate.json';
import plussvg from './assets/plus.svg';
import { useEffect } from 'react';

function Heading({ txt }) {
  return <h2>{txt}</h2>;
}

function getAttributes({ cb, props, groupId }) {
  if (props.inputProp.id === 'picture') {
    return {
      id: props.inputProp.id,
      accept: 'image/*',
      onChange: e => cb(e.target.files, props.inputProp, groupId),
    };
  }
  return {
    id: props.inputProp.id,
    value: props.inputData,
    onChange: e => cb(e.target.value, props.inputProp, groupId),
  };
}

function Input({ cb, props, groupId }) {
  const { id, label } = props.inputProp;
  const attributes = getAttributes({ cb, props, groupId });

  return (
    <div key={id} className='inputfield'>
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
    <div className='newform'>
      <a
        href='#'
        onClick={e => {
          addInputs(e);
        }}
      >
        <img className='svg' src={plussvg} />
      </a>
    </div>
  );
}

function Group({ cb, groupId, data }) {
  return (
    <>
      <div key={groupId}>{groupId}</div>
      {data.map(item => {
        return (
          <Input
            key={`${groupId}+${item.inputProp.id}`}
            groupId={groupId}
            cb={cb}
            props={item}
          />
        );
      })}
    </>
  );
}

function Education({ cb, cbCounter, data }) {
  return (
    <>
      {data.education.map(groupItem => {
        return (
          <>
            <Group
              cb={cb}
              key={groupItem.groupId}
              groupId={groupItem.groupId}
              data={groupItem.data}
            />
          </>
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
      {data.about.map(groupItem => {
        return groupItem.data.map(item => (
          <Input
            key={groupItem.groupId + item.inputProp.id}
            cb={cb}
            groupId={groupItem.groupId}
            props={item}
          />
        ));
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

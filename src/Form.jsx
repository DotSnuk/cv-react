import inputTemplate from './inputtemplate.json';

function Heading({ txt }) {
  return <h2>{txt}</h2>;
}

function getAttributes({ cb, props }) {
  const { type, group, id, inputData } = props;

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
    onChange: e => cb(e.target.value, group, id),
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

function GetAbout({ cb, data }) {
  const inputs = inputTemplate.about;
  return (
    <>
      {inputs.map(inp => {
        const itemExists = data.findIndex(item => item.id === inp.id);
        if (itemExists !== -1) inp.inputData = data[itemExists].inputData;

        return <Input key={inp.id} cb={cb} props={inp} />;
      })}
    </>
  );
}

export default function Form({ cb, data }) {
  return (
    <form>
      <Heading txt={'About you'} />
      <GetAbout cb={cb} data={data.filter(d => d.group === 'about')} />
    </form>
  );
}

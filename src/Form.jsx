import inputTemplate from './inputtemplate.json';

function Heading({ txt }) {
  return <h2>{txt}</h2>;
}

function Input({ cb, props }) {
  const { type, group, id, inputData, label } = props;
  return (
    <div className='inputfield'>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        value={inputData}
        onChange={e => cb(e.target.value, group, id)}
      />
    </div>
  );
}

function test() {
  console.log('test');
}

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
  // inputs.map(inp => {
  //   // const itemExists = data.findIndex(item => item.id === inp.id);
  //   // if (itemExists !== -1) inp.inputData = data[itemExists].inputData;
  //   return <Input key={inp.id} cb={cb} props={inp} />;
  // });

  //{inputs.map(inp => {
  //   return <Input key={inp.id} cb={cb} props={inp} />;
  // })}
  //

  // const itemExists = data.findIndex(item => item.id === inp.id);
  // if (itemExists !== -1) inp.inputData = data[itemExists].inputData;
}

export default function Form({ cb, data }) {
  return (
    <form>
      <Heading txt={'About you'} />
      <GetAbout cb={cb} data={data.filter(d => d.group === 'about')} />
    </form>
  );
}

{
  /* <Input
        cb={cb}
        props={{ type: 'text', id: 'firstname', group: 'about' }}
      />
      <Input cb={cb} props={{ type: 'text', id: 'lastname', group: 'about' }} />
      <Input cb={cb} props={{ type: 'number', id: 'age', group: 'about' }} />
      <Input cb={cb} props={{ type: 'mail', id: 'email', group: 'about' }} />
      <Input cb={cb} props={{ type: 'tel', id: 'phone', group: 'about' }} /> */
}

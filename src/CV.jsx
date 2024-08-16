function RenderLine({ inputData, id }) {
  console.log(inputData);
  return <div className={id}>{inputData}</div>;
}

function ProfilePicture({ inputData, id }) {
  if (inputData === '') return null;
  const url = URL.createObjectURL(inputData[0]);
  return <img src={url} className={id} />;
}

function Section({ group, data }) {
  console.log(data);
  return (
    <div className={group}>
      {data.map(d =>
        d.data.id === 'picture' ? (
          <ProfilePicture
            key={d.data.id}
            id={d.data.id}
            inputData={d.data.inputData}
          />
        ) : (
          <RenderLine
            key={d.data.id}
            id={d.data.id}
            inputData={d.data.inputData}
          />
        ),
      )}
    </div>
  );
}

export default function CV({ data }) {
  // const dataArray = data;
  // const ab = dataArray.filter(d => d.group === 'about');

  return (
    <div>
      <Section group={'about'} data={data.about} />
    </div>
  );
}

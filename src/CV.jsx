function RenderLine({ inputData, id }) {
  return <div className={id}>{inputData}</div>;
}

function ProfilePicture({ inputData, id }) {
  if (inputData === '') return null;
  const url = URL.createObjectURL(inputData[0]);
  return <img src={url} className={id} />;
}

function Section({ group, data }) {
  return (
    <div className={group}>
      {data.map(d =>
        d.id === 'picture' ? (
          <ProfilePicture key={d.id} id={d.id} inputData={d.inputData} />
        ) : (
          <RenderLine key={d.id} id={d.id} inputData={d.inputData} />
        ),
      )}
    </div>
  );
}

export default function CV({ data }) {
  const dataArray = data;
  const ab = dataArray.filter(d => d.group === 'about');

  return (
    <div>
      <Section group={ab[0].group} data={ab} />
    </div>
  );
}

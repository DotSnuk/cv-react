function RenderLine({ inputData, id }) {
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
      {data.map(groupId => {
        return groupId.data.map(d => {
          return d.inputProp.id === 'picture' ? (
            <ProfilePicture
              key={d.inputProp.id}
              id={d.inputProp.id}
              inputData={d.inputData}
            />
          ) : (
            <RenderLine
              key={d.inputProp.id}
              id={d.inputProp.id}
              inputData={d.inputData}
            />
          );
        });
      })}
    </div>
  );
}

export default function CV({ data }) {
  return (
    <>
      {Object.entries(data).map(([key, value]) => (
        <Section key={`${key}+${value.groupId}`} group={key} data={value} />
      ))}
    </>
  );
}

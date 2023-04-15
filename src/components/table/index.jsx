import Row from "./row";

function Table({ rows }) {
  return (
    <table className='mergeTable'>
      <tbody>
        {rows.map((row, index) => (
          <Row key={index} rowIndex={index} columns={row} />
        ))}
      </tbody>
    </table>
  );
}

export default Table;

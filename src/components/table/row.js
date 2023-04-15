import Column from "./column";

function Row({ columns, rowIndex }) {
  return (
    <tr>
      {columns.map((column, columnIndex) => (
        <Column
          key={columnIndex}
          column={{ ...column, columnIndex, rowIndex }}
        />
      ))}
    </tr>
  );
}

export default Row;

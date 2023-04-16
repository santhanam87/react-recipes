import { useState } from "react";

export default function AddTableForm({ onFormSubmit }) {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const onSubmit = (event) => {
    event.preventDefault();
    onFormSubmit({ rows, columns });
  };
  return (
    <form className='form-container' onSubmit={onSubmit}>
      <div className='form-container'>
        <label>Rows</label>
        <input
          type='number'
          value={rows}
          onChange={(event) => {
            setRows(event.target.value);
          }}
        />
      </div>
      <div className='form-container'>
        <label>Columns</label>
        <input
          type='number'
          value={columns}
          onChange={(event) => {
            setColumns(event.target.value);
          }}
        />
      </div>
      <input type='submit' value='submitForm' />
    </form>
  );
}

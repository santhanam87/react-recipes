import AddTableForm from "../AddTableForm/AddTableForm";
import { useState } from "react";
import { generateTable } from "./table.utils";

function Table({ rows }) {
  const [tableData, setTableData] = useState({});
  const onTableInputChange = ({rows, columns}) => {
    setTableData(generateTable(rows, columns))
  }
  return (
    <>
    <AddTableForm onFormSubmit={onTableInputChange} />
    <pre>{JSON.stringify(tableData)}</pre>
    </>
  );
}

export default Table;

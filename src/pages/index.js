import useTable from "../components/table/useTable";
import TableContext from "../components/table/table.context";
import Table from "../components/table";

const TableData = [
  [{}, { rowSpan: 2 }, { rowSpan: 2 }, { colSpan: 2, rowSpan: 2 }, {}],
  [{}, {}],
  [{}, {}, {}, {}, {}, {}],
  [{ colSpan: 5 }, {}],
];

export default function Home() {
  const tableApi = useTable(TableData);
  return (
    <TableContext.Provider value={tableApi}>
      <Table rows={tableApi.tableData} />
      {tableApi.isMergable ? (
        <button type='button' onClick={tableApi.mergeCells}>
          Merge
        </button>
      ) : (
        ""
      )}
    </TableContext.Provider>
  );
}

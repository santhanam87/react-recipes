import { useContext } from "react";
import TableContext from "./table.context";

function Column({ column }) {
  const { isCellSelected, toggleCellSelection } = useContext(TableContext);
  const { colSpan, rowSpan } = column;
  const onCellClick = () => {
    toggleCellSelection(column);
  };

  return (
    <td
      onClick={onCellClick}
      className={isCellSelected(column) ? "selected" : ""}
      colSpan={colSpan}
      rowSpan={rowSpan}
    ></td>
  );
}

export default Column;

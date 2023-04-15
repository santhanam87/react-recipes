import { useEffect, useState } from "react";
import {
  getCellKey,
  buildMappedTableData,
  checkIfCellsMergable,
  getMappedCellsInfo,
} from "./tableUtil";

function useTable(tempTableData) {
  const [tableData] = useState(tempTableData);
  const [selectedCells, setSelectedCells] = useState([]);
  const [mapedTableData, setMappedTableData] = useState([]);
  const [isMergable, setMergable] = useState(false);

  useEffect(() => {
    setMappedTableData(buildMappedTableData(tempTableData));
  }, []);

  const toggleCellSelection = (column) => {
    const cellKey = getCellKey(column);
    const tempSelectedCell = [...selectedCells];
    if (selectedCells.indexOf(cellKey) > -1) {
      tempSelectedCell.splice(selectedCells.indexOf(cellKey), 1);
    } else {
      tempSelectedCell.push(cellKey);
    }
    setSelectedCells(tempSelectedCell);
    setMergable(checkIfCellsMergable(tempSelectedCell, mapedTableData));
  };

  const isCellSelected = (column) => {
    return selectedCells.indexOf(getCellKey(column)) > -1;
  };

  const mergeCells = () => {
    const { minMaxColumn, minMaxRow } = getMappedCellsInfo(
      selectedCells,
      mapedTableData
    );
    console.info((minMaxRow.min, minMaxColumn.min), {
      rowSpan: minMaxRow.max - minMaxRow.min + 1,
      colSpan: minMaxColumn.max - minMaxColumn.min + 1,
    });
  };

  return {
    toggleCellSelection,
    isCellSelected,
    tableData,
    mapedTableData,
    isMergable,
    mergeCells,
  };
}

export default useTable;

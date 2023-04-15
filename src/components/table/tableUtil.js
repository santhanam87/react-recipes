export const getCellKey = ({ rowIndex, columnIndex }) =>
  `${rowIndex}:${columnIndex}`;

export const buildMappedTableData = (tableData) => {
  let tempMappedTableData = [];
  tableData.forEach((columns, rowIndex) => {
    tempMappedTableData.push([]);
    columns.forEach((cell, columnIndex) => {
      tempMappedTableData[rowIndex].push({ ...cell, rowIndex, columnIndex });
    });
  });
  tableData.forEach((columns, rowIndex) => {
    columns.forEach(({ colSpan = 1, rowSpan = 1, ...other }, columnIndex) => {
      if (colSpan > 1 || rowSpan > 1) {
        for (let i = 0; i < rowSpan; i++) {
          for (let j = 0; j < colSpan; j++) {
            if (rowIndex === rowIndex + i) {
              if (columnIndex !== columnIndex + j) {
                tempMappedTableData[rowIndex + i].splice(columnIndex + j, 0, {
                  span: true,
                });
              }
            } else {
              tempMappedTableData[rowIndex + i].splice(columnIndex + j, 0, {
                span: true,
              });
            }
          }
        }
      }
    });
  });
  tempMappedTableData = tempMappedTableData.map((tableRow, rowIndex) => {
    let spaned = 0;
    return tableRow.map((cell, columnIndex) => {
      cell.columnIndex = cell.columnIndex + spaned;
      if (cell.span) {
        spaned++;
      }
      return cell;
    });
  });
  return tempMappedTableData.map((tableRow) =>
    tableRow.filter(({ span }) => !span)
  );
};

const getMinMaxIndex = (minMax, newIndex) => {
  if (minMax.min > newIndex) {
    minMax.min = newIndex;
  }
  if (minMax.max < newIndex) {
    minMax.max = newIndex;
  }
  return minMax;
};

export const getMappedCellsInfo = (selectedCells, mappedRefCells) => {
  const mapedCells = selectedCells.map((cellIndex) => {
    const [rowIndex, colIndex] = cellIndex.split(":");
    return mappedRefCells[rowIndex][colIndex];
  });
  const mergeCellRef = {};
  let minMaxColumn = { min: Infinity, max: 0 };
  let minMaxRow = { min: Infinity, max: 0 };
  mapedCells.forEach(({ columnIndex, rowIndex, colSpan = 1, rowSpan = 1 }) => {
    minMaxRow = getMinMaxIndex(minMaxRow, rowIndex);
    minMaxColumn = getMinMaxIndex(minMaxColumn, columnIndex);
    if (colSpan > 1 || rowSpan > 1) {
      for (let i = 0; i < rowSpan; i++) {
        for (let j = 0; j < colSpan; j++) {
          mergeCellRef[
            getCellKey({ columnIndex: columnIndex + j, rowIndex: rowIndex + i })
          ] = true;
          minMaxRow = getMinMaxIndex(minMaxRow, rowIndex + i);
          minMaxColumn = getMinMaxIndex(minMaxColumn, columnIndex + j);
        }
      }
    } else {
      mergeCellRef[getCellKey({ columnIndex, rowIndex })] = true;
    }
  });
  return { mergeCellRef, minMaxColumn, minMaxRow };
};

export const checkIfCellsMergable = (selectedCells, mappedRefCells) => {
  const { minMaxRow, minMaxColumn, mergeCellRef } = getMappedCellsInfo(
    selectedCells,
    mappedRefCells
  );

  for (let i = minMaxRow.min; i <= minMaxRow.max; i++) {
    for (let j = minMaxColumn.min; j <= minMaxColumn.max; j++) {
      if (!mergeCellRef[getCellKey({ rowIndex: i, columnIndex: j })]) {
        return false;
      }
    }
  }

  return true;
};

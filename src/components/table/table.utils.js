import { COMPONENT_TYPES } from "./table.constants";

export function generateTableCell({
  type = COMPONENT_TYPES.TABLE_CELL,
  attributes = {},
  text = "",
} = {}) {
  return {
    type,
    attributes,
    text,
  };
}

export function generateTableRow({ columns = [], attributes = {} }) {
  const type = COMPONENT_TYPES.TABLE_ROW;
  return { type, columns, attributes };
}

export function generateTable(
  rowsCount = 0,
  columnsCount = 0,
  attributes = {}
) {
  const type = COMPONENT_TYPES.TABLE;
  const rows = [];
  for (let rowIndex = 0; rowIndex < rowsCount; rowIndex++) {
    const columns = [];
    for (let columnIndex = 0; columnIndex < columnsCount; columnIndex++) {
      columns.push(generateTableCell());
    }
    rows.push(generateTableRow({ columns }));
  }
  return { rows, attributes, type };
}

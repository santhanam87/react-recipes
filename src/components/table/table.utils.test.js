import {
  generateTable,
  generateTableCell,
  generateTableRow,
} from "./table.utils";
import { COMPONENT_TYPES } from "./table.constants";

describe("Table Utilities", () => {
  describe("generateTableCell", () => {
    it("default values to be empty with tableCell type", () => {
      const tableCell = generateTableCell({});
      expect(tableCell).toEqual({
        attributes: {},
        text: "",
        type: COMPONENT_TYPES.TABLE_CELL,
      });
    });
    it("type, attribute overriding with default text", () => {
      const mockCell = {
        type: COMPONENT_TYPES.TABLE_HEADER_CELL,
        attributes: { colSpan: 2 },
      };
      const tableCell = generateTableCell(mockCell);
      expect(tableCell).toEqual({ ...mockCell, text: "" });
    });
  });

  describe("generateTableRow", () => {
    it("default values to be empty with tableRow type", () => {
      const tableRow = generateTableRow({});
      expect(tableRow).toEqual({
        attributes: {},
        type: COMPONENT_TYPES.TABLE_ROW,
        columns: [],
      });
    });
    it("attribute overriding", () => {
      const tableRow = generateTableRow({ attributes: { someAttribute: "" } });
      expect(tableRow).toEqual({
        attributes: { someAttribute: "" },
        type: COMPONENT_TYPES.TABLE_ROW,
        columns: [],
      });
    });
  });

  describe("generateTableRow", () => {
    it("default table with 0 rows and 0 columns", () => {
      const table = generateTable();
      expect(table).toEqual({
        attributes: {},
        rows: [],
        type: COMPONENT_TYPES.TABLE,
      });
    });
    it("table with 1 rows and 1 columns", () => {
      const table = generateTable(1, 1);
      expect(table).toEqual({
        attributes: {},
        rows: [
          {
            type: COMPONENT_TYPES.TABLE_ROW,
            attributes: {},
            columns: [
              {
                type: COMPONENT_TYPES.TABLE_CELL,
                attributes: {},
                text: "",
              },
            ],
          },
        ],
        type: COMPONENT_TYPES.TABLE,
      });
    });
  });
});

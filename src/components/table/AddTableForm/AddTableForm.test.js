import { render, fireEvent } from "@testing-library/react";
import AddTableForm from "./AddTableForm";

describe("AddTableForm", () => {
  it("should match the snapshot", () => {
    const { asFragment } = render(<AddTableForm onFormSubmit={() => {}} />);
    expect(asFragment()).toMatchSnapshot();
  });
  it("should call the mock onsubmit on formSubmit", () => {
    const mockSubmitCallback = jest.fn(() => {});
    const { getByText } = render(
      <AddTableForm onFormSubmit={mockSubmitCallback} />
    );
    const submitForm = getByText(/submitform/i);
    fireEvent.submit(submitForm);
    expect(mockSubmitCallback).lastCalledWith({ columns: 0, rows: 0 });
  });
});

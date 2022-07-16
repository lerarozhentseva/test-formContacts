import { render, fireEvent, waitFor } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect'
import FormContacts from "./components/FormContacts";

describe('FormContacts', () => {
    it ('should render component', () => {
        render(<FormContacts/>);
    })

    it ('button should be disabled when site is open', () => {
        const { getByText } = render(<FormContacts/>);
        expect(getByText(/Отправить/i).closest('Button')).toHaveAttribute('disabled');
    })

    it("should show validation name onBlur", async () => {
        const { getByLabelText, getByTestId } = render(<FormContacts />);
        const inputName = getByLabelText("Ваше имя");
        fireEvent.blur(inputName);
        await waitFor(() => {
          expect(getByTestId("nameerror")).not.toBe(null);
          expect(getByTestId("nameerror")).toHaveTextContent("Это поле не может быть пустым");
        });
    });

    it("should show validation email onBlur", async () => {
        const { getByLabelText, getByTestId } = render(<FormContacts />);
        const inputEmail = getByLabelText("Ваш электронный адрес");
        fireEvent.blur(inputEmail);
        await waitFor(() => {
          expect(getByTestId("emailerror")).not.toBe(null);
          expect(getByTestId("emailerror")).toHaveTextContent("Это поле не может быть пустым");
        });
    });
});


import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import Card  from "../../src/presentation/components/Card/Card";

describe("Card", () => {

  beforeEach(() => {
    const country = {
      id: "BRA",
      name: "South Georgia",
      capital: "Brasília",
      region: "Americas",
      population: 206135893,
      flag: "https://restcountries.com/data/bra.svg"
    }

    render(<Card character={country} />);
  });

  test("should render a card with country data", () => {

    expect(screen.getByText("South Georgia")).toBeDefined();
    expect(screen.getByText("Americas")).toBeDefined();
    expect(screen.getByText("Brasília")).toBeDefined();
    expect(screen.getByText("206135893")).toBeDefined();
    expect(screen.getByText("Detail")).toBeDefined();
  });

  test("clicking on the button should call the onClick function", async() => {

    const button = screen.getByRole("button", { name: "Detail" });
    await userEvent.click(button);
    

    button.click();
  });
});
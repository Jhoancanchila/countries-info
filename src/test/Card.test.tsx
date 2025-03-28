import { render, screen } from "@testing-library/react";
import Card  from "../../src/presentation/components/Card/Card";

beforeAll(() => {
  global.IntersectionObserver = class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(
      public callback: IntersectionObserverCallback,
      public options?: IntersectionObserverInit
    ) {}

    observe(target: Element): void {
      // Simula que el elemento es visible
      this.callback([{ isIntersecting: true, target, intersectionRatio: 1, boundingClientRect: {} as DOMRectReadOnly, intersectionRect: {} as DOMRectReadOnly, rootBounds: null, time: 0 }], this);
    }

    unobserve(target: Element): void {
      this.callback([{ isIntersecting: false, target, intersectionRatio: 0, boundingClientRect: {} as DOMRectReadOnly, intersectionRect: {} as DOMRectReadOnly, rootBounds: null, time: 0 }], this);
    }

    disconnect(): void {
      // No hace nada en la simulación
    }

    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
  };
});

describe("Card", () => {

  const country = {
    id: "BRA",
    title: "South Georgia",
    subTitle: "Brasília",
    threeTitle: "Americas",
    point: 206135893,
    subPoint: 55555,
    image: "https://restcountries.com/data/bra.svg"
  }

  beforeEach(() => {
    render(<Card character={country} />);
  });

  test("should render a card with country data", () => {

    expect(screen.getByText("South Georgia")).toBeDefined();
    expect(screen.getByText("Americas")).toBeDefined();
    expect(screen.getByText("Brasília")).toBeDefined();
    expect(screen.getByText("206135893")).toBeDefined();
    expect(screen.getByText("55555")).toBeDefined();});
});
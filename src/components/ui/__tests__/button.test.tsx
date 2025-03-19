// src/components/ui/__tests__/button.test.tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "../button";

describe("Button component", () => {
  it("renders correctly with default props", () => {
    render(<Button>Test Button</Button>);
    const button = screen.getByRole("button", { name: /test button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("bg-primary");
  });

  it("applies the correct variant class", () => {
    render(<Button variant="outline">Outline Button</Button>);
    const button = screen.getByRole("button", { name: /outline button/i });
    expect(button).toHaveClass("border-input");
    expect(button).toHaveClass("bg-background");
  });

  it("applies the correct size class", () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole("button", { name: /large button/i });
    expect(button).toHaveClass("h-10");
    expect(button).toHaveClass("rounded-md");
  });

  it("passes additional props to the button element", () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole("button", { name: /disabled button/i });
    expect(button).toBeDisabled();
  });
});

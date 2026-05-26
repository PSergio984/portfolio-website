import { render, screen } from "@testing-library/react";
import { Contact } from "./Contact";

describe("Contact", () => {
  beforeEach(() => {
    render(<Contact />);
  });

  it("renders the contact section", () => {
    expect(document.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders GitHub link with correct href", () => {
    const link = screen.getByRole("link", { name: /github/i });
    expect(link).toHaveAttribute("href", "https://github.com/PSergio984");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders LinkedIn link", () => {
    const link = screen.getByRole("link", { name: /linkedin/i });
    expect(link).toHaveAttribute(
      "href",
      "https://www.linkedin.com/in/eric-gabriel-manabat-554697204/",
    );
  });

  it("renders Say Hello link", () => {
    const link = screen.getByRole("link", { name: /say hello/i });
    expect(link).toHaveAttribute("href", "mailto:eric.manabatseam@gmail.com");
  });

  it("renders Download CV link", () => {
    const link = screen.getByRole("link", { name: /download cv/i });
    expect(link).toHaveAttribute("href", "/resume.pdf");
    expect(link).toHaveAttribute("target", "_blank");
  });
});

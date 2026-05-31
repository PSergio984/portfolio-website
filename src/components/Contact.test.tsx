import { render, screen, fireEvent } from "@testing-library/react";
import { Contact } from "./Contact";

describe("Contact", () => {
  beforeEach(() => {
    render(<Contact />);
  });

  it("renders the contact section", () => {
    expect(document.querySelector("#contact")).toBeInTheDocument();
  });

  it("renders Email Me link", () => {
    const link = screen.getByRole("link", { name: /email me/i });
    expect(link).toHaveAttribute("href", "mailto:eric.manabatseam@gmail.com");
  });

  it("renders View Resume link", () => {
    const link = screen.getByRole("link", { name: /view resume/i });
    expect(link).toHaveAttribute("href", "/resume.pdf");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders GitHub link", () => {
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
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("opens and closes the resume modal when clicking the View Resume link", () => {
    const link = screen.getByRole("link", { name: /view resume/i });
    
    // Modal is not in the document initially
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    
    // Click to open modal
    fireEvent.click(link);
    
    // Modal is now in the document
    const modal = screen.getByRole("dialog", { name: /resume pdf viewer/i });
    expect(modal).toBeInTheDocument();
    
    // Contains iframe pointing to resume.pdf
    const iframe = screen.getByTitle("Eric Gabriel Manabat Resume");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute("src", "/resume.pdf#toolbar=0");
    
    // Click close button
    const closeBtn = screen.getByRole("button", { name: /close modal/i });
    fireEvent.click(closeBtn);
    
    // Modal is closed
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Header } from "./Header";

function mockSection(id: string, top: number) {
  const element = document.createElement("section");
  element.id = id;
  let currentTop = top;
  element.getBoundingClientRect = vi.fn(() => ({
    top: currentTop,
    bottom: currentTop + 100,
    left: 0,
    right: 0,
    width: 0,
    height: 100,
    x: 0,
    y: currentTop,
    toJSON: () => ({}),
  })) as typeof element.getBoundingClientRect;
  (element as HTMLElement & { setTop?: (value: number) => void }).setTop = (
    value: number,
  ) => {
    currentTop = value;
  };
  document.body.appendChild(element);
  return element as HTMLElement & { setTop?: (value: number) => void };
}

describe("Header", () => {
  let aboutSection: HTMLElement & { setTop?: (value: number) => void };
  let projectsSection: HTMLElement & { setTop?: (value: number) => void };
  let skillsSection: HTMLElement & { setTop?: (value: number) => void };
  let credentialsSection: HTMLElement & { setTop?: (value: number) => void };

  beforeEach(() => {
    document.body.innerHTML = "";
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      value: 1000,
    });
    aboutSection = mockSection("about", 0);
    projectsSection = mockSection("projects", 1200);
    skillsSection = mockSection("skills", 2400);
    credentialsSection = mockSection("credentials", 3600);
    mockSection("contact", 7200);
  });

  it("highlights the active section link as the page scrolls", async () => {
    render(<Header />);

    expect(screen.getByRole("link", { name: "About" })).toHaveAttribute(
      "aria-current",
      "page",
    );

    aboutSection.setTop?.(-900);
    projectsSection.setTop?.(-100);
    skillsSection.setTop?.(100);
    credentialsSection.setTop?.(1200);

    act(() => {
      window.dispatchEvent(new Event("scroll"));
    });

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Skills" })).toHaveAttribute(
        "aria-current",
        "page",
      );
    });
  });
});

import * as React from "react";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { ProjectModal } from "./project-modal";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => React.createElement("img", { ...props, alt: props.alt ?? "" }),
}));

vi.mock("@/components/button", () => ({
  Button: ({ children, href, onClick }: { children: React.ReactNode; href?: string; onClick?: () => void }) =>
    href ? <a href={href}>{children}</a> : <button onClick={onClick}>{children}</button>,
}));

describe("ProjectModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const baseProps = {
    onClose: vi.fn(),
    viewDemoLabel: "View demo",
    viewRepoLabel: "View repository",
    noDemoLabel: "No demo",
    previewLabel: "Preview",
    closeAriaLabel: "close modal",
    iframeFallbackLabel: "Open directly if needed.",
    repoPreviewCaption: "Preview generated from the repository.",
  };

  it("renders deploy preview and demo CTA when demoUrl exists", () => {
    render(
      <ProjectModal
        {...baseProps}
        project={{
          slug: "portfolio",
          title: "Portfolio",
          description: "Project description",
          tags: ["next.js"],
          githubUrl: "https://github.com/LucasLLimeira/portfolio",
          demoUrl: "https://portfolio.vercel.app",
        }}
      />,
    );

    expect(screen.getByTitle("Portfolio preview")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View demo" })).toHaveAttribute("href", "https://portfolio.vercel.app");
  });

  it("renders GitHub preview image when there is no demoUrl", () => {
    render(
      <ProjectModal
        {...baseProps}
        project={{
          slug: "portfolio",
          title: "Portfolio",
          description: "Project description",
          tags: ["next.js"],
          githubUrl: "https://github.com/LucasLLimeira/portfolio",
        }}
      />,
    );

    expect(screen.getByAltText("Portfolio repository preview")).toBeInTheDocument();
    expect(screen.queryByTitle("Portfolio preview")).not.toBeInTheDocument();
  });
});

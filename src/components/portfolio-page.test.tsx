import { act, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { PortfolioPage } from "./portfolio-page";

vi.mock("next/image", () => ({
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => <img {...props} alt={props.alt ?? ""} />,
}));

vi.mock("@/contexts/locale-context", () => ({
  useLocale: () => ({ locale: "en" }),
}));

vi.mock("@/components/header", () => ({ Header: () => <div>Header</div> }));
vi.mock("@/components/footer", () => ({ Footer: () => <div>Footer</div> }));
vi.mock("@/components/section-title", () => ({ SectionTitle: ({ title }: { title: string }) => <h2>{title}</h2> }));
vi.mock("@/components/badge", () => ({ Badge: ({ label }: { label: string }) => <button>{label}</button> }));
vi.mock("@/components/button", () => ({
  Button: ({ children, href, onClick }: { children: React.ReactNode; href?: string; onClick?: () => void }) =>
    href ? <a href={href}>{children}</a> : <button onClick={onClick}>{children}</button>,
}));
vi.mock("@/components/project-card", () => ({
  ProjectCard: ({ project }: { project: { title: string } }) => <div>{project.title}</div>,
}));
vi.mock("@/components/project-modal", () => ({ ProjectModal: () => null }));
vi.mock("@/components/education-modal", () => ({ EducationModal: () => null }));
vi.mock("@/components/cv-modal", () => ({ CvModal: () => null }));

describe("PortfolioPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal(
      "IntersectionObserver",
      class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    );
    vi.stubGlobal("fetch", vi.fn());
  });

  it("loads project cards from GitHub API response", async () => {
    const fetchMock = vi.mocked(fetch);
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        projects: [
          {
            slug: "portfolio",
            title: "Portfolio from GitHub",
            description: "Loaded remotely",
            tags: ["next.js"],
            githubUrl: "https://github.com/LucasLLimeira/portfolio",
            isPinned: true,
          },
        ],
        languageStats: [],
        fallbackUsed: false,
      }),
    } as Response);

    await act(async () => {
      render(<PortfolioPage />);
    });

    await waitFor(() => {
      expect(screen.getByText("Portfolio from GitHub")).toBeInTheDocument();
    });

    expect(fetchMock).toHaveBeenCalledWith("/api/github-data?locale=en", { cache: "no-store" });
  });
});

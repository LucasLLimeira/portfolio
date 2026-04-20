"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/button";
import type { EducationItem } from "@/types/content";

type EducationModalProps = {
  education: EducationItem | null;
  onClose: () => void;
  locale: "pt" | "en";
};

export function EducationModal({ education, onClose, locale }: EducationModalProps) {
  const [certificateAvailable, setCertificateAvailable] = useState(false);

  useEffect(() => {
    if (!education) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [education, onClose]);

  useEffect(() => {
    let mounted = true;

    const checkCertificate = async () => {
      if (!education?.certificateUrl) {
        if (mounted) setCertificateAvailable(false);
        return;
      }

      try {
        const response = await fetch(education.certificateUrl, {
          method: "HEAD",
          cache: "no-store",
        });

        if (!mounted) return;
        setCertificateAvailable(response.ok);
      } catch {
        if (mounted) setCertificateAvailable(false);
      }
    };

    void checkCertificate();

    return () => {
      mounted = false;
    };
  }, [education]);

  if (!education) return null;

  const closeAria = locale === "pt" ? "fechar modal" : "close modal";
  const openCertificateLabel = locale === "pt" ? "Abrir certificado" : "Open certificate";
  const inProgressLabel = locale === "pt" ? "Em andamento" : "In progress";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={education.title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-2xl border border-brand-300/40 bg-white p-6 shadow-2xl dark:border-brand-500/40 dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{education.title}</h3>
            <button
              type="button"
              aria-label={closeAria}
              onClick={onClose}
              className="rounded-full border border-brand-300 px-3 py-1 text-sm text-brand-700 hover:bg-brand-50 dark:border-brand-500/40 dark:text-brand-200 dark:hover:bg-slate-800"
            >
              x
            </button>
          </div>

          <p className="text-sm text-slate-500 dark:text-slate-400">{education.institution}</p>
          <p className="text-sm font-medium text-brand-700 dark:text-brand-200">{education.status}</p>

          {education.description ? (
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{education.description}</p>
          ) : null}

          {education.certificateUrl && certificateAvailable ? (
            <div className="pt-2">
              <Button href={education.certificateUrl} target="_blank" rel="noreferrer noopener" variant="ghost">
                {openCertificateLabel}
              </Button>
            </div>
          ) : (
            <div className="pt-2">
              <span className="inline-flex items-center rounded-full border border-dashed border-brand-300 px-4 py-2 text-xs text-slate-500 dark:border-brand-500/40 dark:text-slate-400">
                {inProgressLabel}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

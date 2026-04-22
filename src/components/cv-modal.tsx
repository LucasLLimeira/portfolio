"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/button";

type CvModalProps = {
  isOpen: boolean;
  cvHref: string;
  title: string;
  closeAria: string;
  previewFallback: string;
  downloadCta: string;
  onClose: () => void;
};

function CvPreview({ cvHref, title, previewFallback }: Pick<CvModalProps, "cvHref" | "title" | "previewFallback">) {
  const [previewFailed, setPreviewFailed] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-brand-200/80 bg-slate-100 dark:border-brand-500/30 dark:bg-slate-950">
      {!previewFailed ? (
        <iframe
          src={cvHref}
          title={title}
          className="h-[62vh] w-full"
          onError={() => setPreviewFailed(true)}
        />
      ) : (
        <div className="flex h-[42vh] items-center justify-center px-6 text-center text-sm text-slate-500 dark:text-slate-400">
          {previewFallback}
        </div>
      )}
    </div>
  );
}

export function CvModal({
  isOpen,
  cvHref,
  title,
  closeAria,
  previewFallback,
  downloadCta,
  onClose,
}: CvModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const onEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 py-8 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label={title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl rounded-2xl border border-brand-300/40 bg-white p-6 shadow-2xl dark:border-brand-500/40 dark:bg-slate-900"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100">{title}</h3>
            <button
              type="button"
              aria-label={closeAria}
              onClick={onClose}
              className="rounded-full border border-brand-300 px-3 py-1 text-sm text-brand-700 hover:bg-brand-50 dark:border-brand-500/40 dark:text-brand-200 dark:hover:bg-slate-800"
            >
              x
            </button>
          </div>
          <CvPreview key={cvHref} cvHref={cvHref} title={title} previewFallback={previewFallback} />

          <div className="pt-1">
            <Button href={cvHref} target="_blank" rel="noreferrer" variant="ghost">
              {downloadCta}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

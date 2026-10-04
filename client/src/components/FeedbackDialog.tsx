import { useEffect, useId, useRef, useState, type MouseEvent } from "react";
import { useLocation } from "react-router";
import { issueDraft, pathnameOnly, reportTypes, validateReport, formatReport, type ReportType } from "../lib/feedback";
import { useOrigins } from "../lib/origins";
import { releaseToken } from "../lib/seo";
import { siteConfig } from "../site-config";

const typeLabels: Record<ReportType, string> = {
  bug: "Bug",
  "content-correction": "Content correction",
  suggestion: "Suggestion",
};

function charCount(value: string): number {
  return [...value].length;
}

export function FeedbackDialog() {
  const origins = useOrigins();
  const location = useLocation();
  const titleId = useId();
  const fallbackId = useId();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const launcherRef = useRef<HTMLButtonElement | null>(null);
  const [type, setType] = useState<ReportType>("bug");
  const [description, setDescription] = useState("");
  const [expectedBehavior, setExpectedBehavior] = useState("");
  const [viewport, setViewport] = useState("");
  const [attempted, setAttempted] = useState(false);
  const [status, setStatus] = useState("");

  const pathname = pathnameOnly(location.pathname);
  const release = releaseToken();
  const validation = validateReport({ type, description, expectedBehavior, pathname, viewport, release });
  const draft = validation.ok ? issueDraft(validation.value) : null;
  const preview = validation.ok ? formatReport(validation.value) : "";
  const overLimit =
    charCount(description) > siteConfig.descriptionMax || charCount(expectedBehavior) > siteConfig.expectedMax;
  const errors = validation.ok ? [] : validation.errors;
  const showErrors = (attempted || overLimit) && errors.length > 0;

  useEffect(() => {
    const onResize = () => {
      if (dialogRef.current?.open) setViewport(`${window.innerWidth}x${window.innerHeight}`);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      launcherRef.current?.focus();
    };
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  function open(event: MouseEvent<HTMLButtonElement>) {
    launcherRef.current = event.currentTarget;
    setViewport(`${window.innerWidth}x${window.innerHeight}`);
    setStatus("");
    dialogRef.current?.showModal();
    dialogRef.current?.querySelector<HTMLElement>("[data-initial-focus]")?.focus();
  }

  function close() {
    dialogRef.current?.close();
  }

  function requireDraft(): string | null {
    setAttempted(true);
    if (!validation.ok) {
      setStatus("The report is not ready. Fix the notes above. Nothing was filed.");
      return null;
    }
    return formatReport(validation.value);
  }

  async function copyReport() {
    const body = requireDraft();
    if (!body) return;
    try {
      await navigator.clipboard.writeText(body);
      setStatus("Copied. Nothing was filed.");
    } catch {
      setStatus("Copy failed in this browser. Select the report preview, or download it. Nothing was filed.");
    }
  }

  function downloadReport() {
    const body = requireDraft();
    if (!body) return;
    const blob = new Blob([body], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "crosscomm-website-report.md";
    link.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1500);
    setStatus("Download requested. Nothing was filed. If the file did not save, copy the report.");
  }

  function explainDraft(event: MouseEvent<HTMLAnchorElement>) {
    const body = requireDraft();
    if (!body || !draft || draft.tooLong) {
      event.preventDefault();
      return;
    }
    setStatus(
      "Tried to open a GitHub draft in a new tab. Nothing was filed. Submit it on GitHub if that tab opened. If it did not, copy or download the report.",
    );
  }

  if (origins.indexable) return null;

  return (
    <>
      <button type="button" className="report-launcher" onClick={open}>
        Report a problem
      </button>
      <dialog ref={dialogRef} className="report-dialog" aria-labelledby={titleId}>
        <div className="dialog-head">
          <div>
            <p className="eyebrow">Website report</p>
            <h2 id={titleId}>Report a problem</h2>
          </div>
          <button type="button" className="btn btn-line" onClick={close}>
            Close
          </button>
        </div>
        <p className="dialog-lead">
          This prepares a report you can copy, download, or open as a GitHub draft. It does not file the report for you.
        </p>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <fieldset>
            <legend>Type</legend>
            <div className="type-choices">
              {reportTypes.map((option) => (
                <label key={option}>
                  <input
                    type="radio"
                    name="report-type"
                    value={option}
                    checked={type === option}
                    data-initial-focus={option === "bug" ? true : undefined}
                    onChange={() => setType(option)}
                  />
                  {typeLabels[option]}
                </label>
              ))}
            </div>
          </fieldset>
          <label className="field">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={6}
              aria-invalid={charCount(description) > siteConfig.descriptionMax}
            />
            <span className={charCount(description) > siteConfig.descriptionMax ? "count over" : "count"}>
              {charCount(description)} / {siteConfig.descriptionMax}
            </span>
          </label>
          <label className="field">
            <span>Expected behavior, optional</span>
            <textarea
              value={expectedBehavior}
              onChange={(event) => setExpectedBehavior(event.target.value)}
              rows={3}
              aria-invalid={charCount(expectedBehavior) > siteConfig.expectedMax}
            />
            <span className={charCount(expectedBehavior) > siteConfig.expectedMax ? "count over" : "count"}>
              {charCount(expectedBehavior)} / {siteConfig.expectedMax}
            </span>
          </label>
          <dl className="diagnostics">
            <div>
              <dt>Page</dt>
              <dd>{pathname}</dd>
            </div>
            <div>
              <dt>Viewport</dt>
              <dd>{viewport || "Measured when this dialog opens."}</dd>
            </div>
            <div>
              <dt>Release</dt>
              <dd>{release}</dd>
            </div>
          </dl>
          <p className="privacy">
            Included: report type, description, optional expected behavior, page path, viewport, and release id. Not
            included: query strings, URL hashes, form fields, cookies, logs, screenshots, or account data.
          </p>
          {showErrors ? (
            <ul className="form-errors">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          ) : null}
          {preview ? (
            <div className="preview-block">
              <h3>Report preview</h3>
              <pre tabIndex={0}>{preview}</pre>
            </div>
          ) : null}
          {draft?.tooLong ? (
            <p className="fallback" id={fallbackId}>
              This report is too long for a GitHub link. The encoded URL would exceed {siteConfig.issueUrlMax}{" "}
              characters, so the draft is not opened. The report itself was not shortened. Copy or download it and file
              it from there.
            </p>
          ) : null}
          <div className="dialog-actions">
            <button type="button" className="btn btn-line" onClick={copyReport}>
              Copy report
            </button>
            <button type="button" className="btn btn-line" onClick={downloadReport}>
              Download report
            </button>
            {draft && !draft.tooLong ? (
              <a
                className="btn btn-deep"
                href={draft.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={explainDraft}
              >
                Open issue draft in GitHub
              </a>
            ) : (
              <button
                type="button"
                className="btn btn-deep"
                onClick={() => {
                  requireDraft();
                }}
                disabled={Boolean(draft?.tooLong)}
                aria-describedby={draft?.tooLong ? fallbackId : undefined}
              >
                Open issue draft in GitHub
              </button>
            )}
          </div>
          <p className="fine">
            Opening a draft needs a GitHub login and access to {siteConfig.githubRepo}. It does not submit the issue.
            You still have to submit it on GitHub. If you do not have access, copy or download the report.
          </p>
          <p className="status" role="status">
            {status}
          </p>
        </form>
      </dialog>
    </>
  );
}

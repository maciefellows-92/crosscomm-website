import { useState, type FormEvent } from "react";
import { Breadcrumbs } from "../components/chrome";
import { siteConfig } from "../site-config";

type Brief = {
  name: string;
  email: string;
  organization: string;
  message: string;
};

const empty: Brief = { name: "", email: "", organization: "", message: "" };

function briefText(brief: Brief): string {
  const lines = [
    brief.name.trim() ? `Name: ${brief.name.trim()}` : "",
    brief.email.trim() ? `Email: ${brief.email.trim()}` : "",
    brief.organization.trim() ? `Organization: ${brief.organization.trim()}` : "",
  ].filter(Boolean);
  if (lines.length) lines.push("");
  lines.push(brief.message.trim());
  return lines.join("\n");
}

function mailtoHref(brief: Brief): string {
  return `mailto:${siteConfig.email}?subject=${encodeURIComponent("Project brief for CrossComm")}&body=${encodeURIComponent(briefText(brief))}`;
}

export function ContactPage() {
  const [brief, setBrief] = useState<Brief>(empty);
  const [notice, setNotice] = useState("");

  function update(key: keyof Brief, value: string) {
    setBrief((current) => ({ ...current, [key]: value }));
  }

  function openEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!brief.message.trim()) {
      setNotice("Write a short brief first. Nothing was sent.");
      return;
    }
    const href = mailtoHref(brief);
    if (href.length > 1900) {
      setNotice(
        `This brief is too long for an email link. Copy brief keeps the full text. Paste it into an email to ${siteConfig.email}. Nothing was sent.`,
      );
      return;
    }
    setNotice("Your email app should open with this draft. Nothing is sent until you send it there.");
    window.location.href = href;
  }

  async function copyBrief() {
    if (!brief.message.trim()) {
      setNotice("Write a short brief first. Nothing was sent.");
      return;
    }
    try {
      await navigator.clipboard.writeText(briefText(brief));
      setNotice(`Brief copied, complete. Paste it into an email to ${siteConfig.email}. Nothing was sent.`);
    } catch {
      setNotice("Copy failed. The full brief is still in the form. Nothing was sent.");
    }
  }

  return (
    <article className="wrap page contact-page">
      <Breadcrumbs />
      <header className="page-intro">
        <p className="eyebrow">Contact</p>
        <h1 tabIndex={-1}>Tell us what you want to make.</h1>
        <p className="deck">
          Email, call, or open a draft in your email app. The consultation form on crosscomm.com is the one we use for
          new work.
        </p>
      </header>
      <div className="contact-grid">
        <section className="direct">
          <h2>Direct</h2>
          <p className="big-contact">
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </p>
          <p className="big-contact">
            <a href={`tel:${siteConfig.phoneTel}`}>{siteConfig.phoneDisplay}</a>
          </p>
          <p>
            {siteConfig.offices.map((office) => `${office.city}, ${office.region}`).join(" · ")}
          </p>
        </section>
        <section>
          <h2>Email your project brief</h2>
          <p className="fine">This opens your email app with the note filled in. Nothing is sent until you send it there.</p>
          <form className="brief-form" onSubmit={openEmail}>
            <label>
              Name
              <input value={brief.name} autoComplete="name" onChange={(event) => update("name", event.target.value)} />
            </label>
            <label>
              Email
              <input
                type="email"
                value={brief.email}
                autoComplete="email"
                onChange={(event) => update("email", event.target.value)}
              />
            </label>
            <label>
              Organization
              <input
                value={brief.organization}
                autoComplete="organization"
                onChange={(event) => update("organization", event.target.value)}
              />
            </label>
            <label>
              Brief
              <textarea
                aria-required="true"
                rows={6}
                value={brief.message}
                onChange={(event) => update("message", event.target.value)}
              />
            </label>
            <div className="dialog-actions">
              <button type="submit" className="btn btn-deep">
                Open in your email app
              </button>
              <button type="button" className="btn btn-line" onClick={copyBrief}>
                Copy brief
              </button>
            </div>
            <p className="status" role="status">
              {notice}
            </p>
          </form>
        </section>
      </div>
      <section className="existing-form">
        <h2>Consultation form on crosscomm.com</h2>
        <p>This is the existing CrossComm form, not a form hosted here. It opens in a new tab.</p>
        <p>
          <a className="btn btn-line" href={siteConfig.existingContactForm} target="_blank" rel="noreferrer">
            Open the consultation form
          </a>
        </p>
      </section>
    </article>
  );
}

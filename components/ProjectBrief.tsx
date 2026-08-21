"use client";

import { useState, type FormEvent } from "react";

export type ProjectBriefCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  servicesLabel: string;
  services: readonly string[];
  situationLabel: string;
  situations: readonly string[];
  timingLabel: string;
  timings: readonly string[];
  organisationLabel: string;
  organisationPlaceholder: string;
  discoveryLabel: string;
  discovery: readonly string[];
  contextLabel: string;
  contextPlaceholder: string;
  submit: string;
  required: string;
  submitted: string;
  privacy: string;
  emailSubject: string;
  summaryLabels: {
    services: string;
    situation: string;
    timing: string;
    organisation: string;
    discovery: string;
    context: string;
  };
};

export function ProjectBrief({ copy, email }: { copy: ProjectBriefCopy; email: string }) {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("");

  function toggleService(service: string) {
    setSelectedServices((current) =>
      current.includes(service)
        ? current.filter((item) => item !== service)
        : [...current, service],
    );
    setError("");
    setStatus("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (selectedServices.length === 0) {
      setError(copy.required);
      return;
    }

    const data = new FormData(event.currentTarget);
    const organisation = String(data.get("organisation") ?? "").trim();
    const situation = String(data.get("situation") ?? "").trim();
    const timing = String(data.get("timing") ?? "").trim();
    const discovery = String(data.get("discovery") ?? "").trim();
    const context = String(data.get("context") ?? "").trim();
    const body = [
      `${copy.summaryLabels.services}: ${selectedServices.join(", ")}`,
      `${copy.summaryLabels.situation}: ${situation}`,
      `${copy.summaryLabels.timing}: ${timing}`,
      `${copy.summaryLabels.organisation}: ${organisation || "—"}`,
      `${copy.summaryLabels.discovery}: ${discovery}`,
      "",
      `${copy.summaryLabels.context}:`,
      context || "—",
    ].join("\n");

    setStatus(copy.submitted);
    window.setTimeout(() => {
      window.location.href = `mailto:${email}?subject=${encodeURIComponent(copy.emailSubject)}&body=${encodeURIComponent(body)}`;
    }, 180);
  }

  return (
    <section className="brief-section section-space" id="projectbrief">
      <div className="page-shell brief-grid">
        <div className="brief-intro">
          <p className="eyebrow"><span />{copy.eyebrow}</p>
          <h2>{copy.title}</h2>
          <p>{copy.intro}</p>
          <div className="brief-signal sonar-force-motion" aria-hidden="true">
            <i />
            <i />
            <i />
            <span className="sonar-sweep" />
            <span className="sonar-return sonar-return-one" />
            <span className="sonar-return sonar-return-two" />
            <span className="sonar-return sonar-return-three" />
            <span className="sonar-return sonar-return-four" />
            <span className="sonar-return sonar-return-five" />
            <span className="sonar-return sonar-return-six" />
            <b className="sonar-core" />
          </div>
        </div>

        <form className="brief-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend><span>01</span>{copy.servicesLabel}</legend>
            <div className="brief-options">
              {copy.services.map((service) => {
                const selected = selectedServices.includes(service);

                return (
                  <button
                    aria-pressed={selected}
                    className={selected ? "selected" : ""}
                    key={service}
                    onClick={() => toggleService(service)}
                    type="button"
                  >
                    <i aria-hidden="true">{selected ? "✓" : "+"}</i>
                    {service}
                  </button>
                );
              })}
            </div>
            <p aria-live="polite" className="brief-error">{error}</p>
          </fieldset>

          <div className="brief-fields">
            <label>
              <span><b>02</b>{copy.situationLabel}</span>
              <select defaultValue={copy.situations[0]} name="situation">
                {copy.situations.map((situation) => <option key={situation}>{situation}</option>)}
              </select>
            </label>
            <label>
              <span><b>03</b>{copy.timingLabel}</span>
              <select defaultValue={copy.timings[0]} name="timing">
                {copy.timings.map((timing) => <option key={timing}>{timing}</option>)}
              </select>
            </label>
          </div>

          <div className="brief-fields">
            <label>
              <span><b>04</b>{copy.organisationLabel}</span>
              <input maxLength={120} name="organisation" placeholder={copy.organisationPlaceholder} type="text" />
            </label>
            <label>
              <span><b>05</b>{copy.discoveryLabel}</span>
              <select defaultValue={copy.discovery[0]} name="discovery">
                {copy.discovery.map((source) => <option key={source}>{source}</option>)}
              </select>
            </label>
          </div>

          <label>
            <span><b>06</b>{copy.contextLabel}</span>
            <textarea maxLength={2000} name="context" placeholder={copy.contextPlaceholder} rows={5} />
          </label>

          <p aria-live="polite" className="brief-status" role="status">{status}</p>
          <div className="brief-submit">
            <p>{copy.privacy}</p>
            <button type="submit">{copy.submit}<span aria-hidden="true">↗</span></button>
          </div>
        </form>
      </div>
    </section>
  );
}

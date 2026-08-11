import React, { useState } from "react";
import "./FAQs.css";

const FAQ_ITEMS = [
  {
    q: "Is on-the-spot registration allowed?",
    a: "No. Registrations must be completed in advance. Once the event caps are reached, registrations will be closed.",
  },
  {
    q: "Will I receive a participation certificate?",
    a: "Absolutely. All registered participants who attend and perform will receive a digital certificate.",
  },
  {
    q: "How will I know my event time and venue?",
    a: "Final timings and venue details will be shared one day prior to the competition via the official WhatsApp group. Joining the group after registration is mandatory.",
  },
  {
    q: "What if a teammate drops out after registration?",
    a: "If a teammate drops out after registration, inform the Organizing Committee at the earliest. A replacement may be allowed if done before event day.",
  },
  {
    q: "What kind of behavior can get someone disqualified?",
    a: "Any personal, offensive, or disruptive conduct will lead to immediate disqualification. Politeness and composure are expected at all times. The Organizing Committee's decision is final and binding.",
  },
];

export default function InvictusFAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <div className="invictus-page" id="faq">
      <div className="paper-overlay">

        {/* ================= HEADER ================= */}
        <header className="invictus-header">

          <h1 className="invictus-title">
            The Invictus Chronicle
          </h1>

          <p className="invictus-motto">
            STRATEGY&nbsp;&nbsp;·&nbsp;&nbsp; LEADERSHIP&nbsp;&nbsp;·&nbsp;&nbsp;
            VICTORY
          </p>

          <div className="header-line" />
          <div className="header-line small" />

        </header>

        {/* ================= BULLETIN LABEL ================= */}
        <div className="bulletin-label">
          FIELD BULLETIN — FREQUENTLY ASKED QUESTIONS
        </div>

        <p className="intro-text">
          Before you march into competition, consult the official bulletin
          below. Tap any dispatch to hear the Commander's word directly.
        </p>

        {/* ================= FAQ ================= */}
        <main className="faq-container">

          {FAQ_ITEMS.map((item, index) => {
            const isOpen = open === index;

            return (
              <section className="faq-item" key={index}>

                {/* QUESTION */}
                <button
                  className="question-button"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span className="question-text">

                    <span className="question-number">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span className="question-title">
                      {item.q}
                    </span>

                  </span>

                  <span className="plus">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* COMMANDER + ANSWER */}
                <div className="commander-row">

                  {/* COMMANDER IMAGE */}
                  <button
                    className="commander-button"
                    onClick={() => toggle(index)}
                    aria-label="Show Commander's answer"
                  >
                    <img
                      src="/commander.jpg"
                      alt="The Commander"
                      className="commander-image"
                    />
                  </button>

                  {/* CLOSED MESSAGE */}
                  {!isOpen && (
                    <button
                      className="tap-message"
                      onClick={() => toggle(index)}
                    >
                      TAP FOR THE COMMANDER'S ANSWER →
                    </button>
                  )}

                  {/* ANSWER BUBBLE */}
                  {isOpen && (
                    <div className="answer-wrapper">

                      <div className="speech-pointer" />

                      <div className="answer-box">

                        <p className="answer-text">
                          {item.a}
                        </p>

                        <p className="commander-signature">
                          — THE COMMANDER
                        </p>

                      </div>

                    </div>
                  )}

                </div>

              </section>
            );
          })}

        </main>

        {/* ================= FOOTER ================= */}
        <footer className="invictus-footer">


          <p>
            #eXpressToInspire
          </p>

        </footer>

      </div>
    </div>
  );
}
"use client";

import { useState } from "react";
import Link from "next/link";

interface FaqItem {
  num: string;
  question: string;
  answer: string;
}

const faqItems: FaqItem[] = [
  {
    num: "01.",
    question: "What is Croft?",
    answer:
      "Croft is a data intelligence startup building an intelligent platform for optimising business revenue and profitability through machine learning. We combine data from diverse sources to deliver predictions no single data provider can match.",
  },
  {
    num: "02.",
    question: "What makes Croft\u2019s platform unique?",
    answer:
      "Our competitive advantage is our unique combination of 100+ data sources across 33 countries. This creates intelligence that is extremely difficult for competitors to replicate.",
  },
  {
    num: "03.",
    question: "What capability tiers does Croft offer?",
    answer:
      "Four tiers on one platform: Risk Signals (entry point, no integration needed), Demand Forecasting (ERP integration), Predictive Guidance (ML-powered recommendations), and Network Platform (cross-organisational intelligence).",
  },
  {
    num: "04.",
    question: "How does Croft integrate with existing systems?",
    answer:
      "Through our RESTful API. Our platform integrates into your existing ERP and SCM infrastructure. You can start receiving predictions and intelligence within minutes of integration.",
  },
  {
    num: "05.",
    question: "Where is Croft based?",
    answer:
      "Helsinki, Finland. We are a pre-seed stage company founded by Reza Faezi and Aleksi Pesonen.",
  },
];

export default function FaqPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function handleToggle(index: number) {
    setOpenIndex(openIndex === index ? null : index);
  }

  return (
    <section style={{ padding: "140px 0 80px", background: "var(--dark)" }}>
      <div className="container">
        <div className="faq-head">
          <h2>FAQs</h2>
          <Link href="/contact" className="btn-outline">
            Contact Us &rarr;
          </Link>
        </div>
        <div className="faq-pills">
          <button className="faq-pill active">Croft FAQ</button>
          <button className="faq-pill">Platform</button>
          <button className="faq-pill">Data Sources</button>
          <button className="faq-pill">Enterprise AI</button>
          <button className="faq-pill">Pricing</button>
        </div>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <div
              key={index}
              className={`faq-row${openIndex === index ? " open" : ""}`}
            >
              <span className="faq-num">{item.num}</span>
              <button className="faq-q" onClick={() => handleToggle(index)}>
                {item.question}
                <span className="faq-plus">+</span>
              </button>
              <div className="faq-a">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

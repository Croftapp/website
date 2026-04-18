"use client";

import { useState } from "react";
import MarkdownRenderer from "./MarkdownRenderer";

interface Props {
  enContent: string;
  fiContent?: string;
}

export default function LanguageToggle({ enContent, fiContent }: Props) {
  const [lang, setLang] = useState<"en" | "fi">("en");

  if (!fiContent) {
    return <MarkdownRenderer content={enContent} />;
  }

  return (
    <>
      <div className="lang-toggle">
        <button
          className={lang === "en" ? "active" : ""}
          onClick={() => setLang("en")}
        >
          English
        </button>
        <button
          className={lang === "fi" ? "active" : ""}
          onClick={() => setLang("fi")}
        >
          Suomeksi
        </button>
      </div>
      <MarkdownRenderer content={lang === "en" ? enContent : fiContent} />
    </>
  );
}

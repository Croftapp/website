"use client";

import ReactMarkdown from "react-markdown";

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="insights-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
}

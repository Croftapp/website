"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollNavProps {
  items: { id: string; label: string }[];
}

export default function ScrollNav({ items }: ScrollNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const blocks = items
      .map((item) => document.getElementById(item.id))
      .filter(Boolean) as HTMLElement[];

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { threshold: 0.45, rootMargin: "-80px 0px -40% 0px" }
    );

    blocks.forEach((block) => observerRef.current?.observe(block));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [items]);

  function handleClick(id: string) {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  return (
    <nav className="pf-nav">
      {items.map((item) => (
        <a
          key={item.id}
          className={`pf-nav-link${activeId === item.id ? " active" : ""}`}
          data-target={item.id}
          onClick={() => handleClick(item.id)}
        >
          {item.label}
        </a>
      ))}
    </nav>
  );
}

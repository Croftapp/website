"use client";

export default function ConvergenceSVG() {
  return (
    <svg
      className="conv-svg"
      viewBox="0 0 820 400"
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="dotGlow">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g filter="url(#glow)">
        <path
          id="cl1"
          className="conv-line cl-1"
          d="M 82,0 C -30,150 400,300 410,360"
        />
        <path
          id="cl2"
          className="conv-line cl-2"
          d="M 246,0 C 180,130 405,280 410,360"
        />
        <path
          id="cl3"
          className="conv-line cl-3"
          d="M 410,0 L 410,360"
        />
        <path
          id="cl4"
          className="conv-line cl-4"
          d="M 574,0 C 640,130 415,280 410,360"
        />
        <path
          id="cl5"
          className="conv-line cl-5"
          d="M 738,0 C 850,150 420,300 410,360"
        />
      </g>

      <line
        x1="410"
        y1="360"
        x2="410"
        y2="400"
        stroke="rgba(78,205,196,0.3)"
        strokeWidth="1.5"
      />
      <circle cx="410" cy="380" r="3.5" fill="rgba(78,205,196,0.8)" />
      <circle cx="410" cy="380" r="9" fill="rgba(78,205,196,0.12)" />

      <g filter="url(#dotGlow)">
        <circle r="2.5" fill="rgba(78,205,196,0.9)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="0s">
            <mpath href="#cl1" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="rgba(78,205,196,0.9)">
          <animateMotion dur="4s" repeatCount="indefinite" begin="1.2s">
            <mpath href="#cl2" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="rgba(78,205,196,0.9)">
          <animateMotion dur="3.5s" repeatCount="indefinite" begin="0.6s">
            <mpath href="#cl3" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="rgba(78,205,196,0.9)">
          <animateMotion dur="4s" repeatCount="indefinite" begin="1.8s">
            <mpath href="#cl4" />
          </animateMotion>
        </circle>
        <circle r="2.5" fill="rgba(78,205,196,0.9)">
          <animateMotion dur="5s" repeatCount="indefinite" begin="2.4s">
            <mpath href="#cl5" />
          </animateMotion>
        </circle>
      </g>
    </svg>
  );
}

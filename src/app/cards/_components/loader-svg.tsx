import { SVGProps } from "react";

export default function LoaderSvg(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" {...props}>
      <radialGradient
        id="a11"
        cx=".66"
        fx=".66"
        cy=".3125"
        fy=".3125"
        gradientTransform="scale(1.5)"
      >
        <stop offset="0" stopColor="#f1f5f9"></stop>
        <stop offset=".3" stopColor="#f1f5f9" stopOpacity=".9"></stop>
        <stop offset=".6" stopColor="#f1f5f9" stopOpacity=".6"></stop>
        <stop offset=".8" stopColor="#f1f5f9" stopOpacity=".3"></stop>
        <stop offset="1" stopColor="#f1f5f9" stopOpacity="0"></stop>
      </radialGradient>
      <circle
        style={{ transformOrigin: "center" }}
        fill="none"
        stroke="url(#a11)"
        strokeWidth="15"
        strokeLinecap="round"
        strokeDasharray="200 1000"
        strokeDashoffset="0"
        cx="100"
        cy="100"
        r="70"
      >
        <animateTransform
          type="rotate"
          attributeName="transform"
          calcMode="spline"
          dur="2"
          values="360;0"
          keyTimes="0;1"
          keySplines="0 0 1 1"
          repeatCount="indefinite"
        ></animateTransform>
      </circle>
      <circle
        style={{ transformOrigin: "center" }}
        fill="none"
        opacity=".2"
        stroke="#f1f5f9"
        strokeWidth="15"
        strokeLinecap="round"
        cx="100"
        cy="100"
        r="70"
      ></circle>
    </svg>
  );
}

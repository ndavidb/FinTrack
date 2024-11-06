import { SVGProps } from "react";

export interface SafariProps extends SVGProps<SVGSVGElement> {
  url?: string;
  src?: string;
  width?: number;
  height?: number;
}

export default function Safari({
                                 src,
                                 url = "fintrack.app",
                                 width = 1203,
                                 height = 753,
                                 className = "",
                                 ...props
                               }: SafariProps) {
  return (
      <div className="w-full overflow-hidden rounded-lg shadow-lg">
        <svg
            width="100%"
            height="100%"
            viewBox={`0 0 ${width} ${height}`}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={className}
            {...props}
        >
          <g>
            {/* Browser Frame */}
            <path
                d="M0 0H1203V741C1203 747.627 1197.63 753 1191 753H12C5.37258 753 0 747.627 0 741V0Z"
                className="fill-white dark:fill-gray-800"
            />

            {/* Top Bar */}
            <rect
                x="0"
                y="0"
                width={width}
                height="52"
                className="fill-gray-100 dark:fill-gray-700"
            />

            {/* Traffic Lights */}
            <circle cx="27" cy="26" r="6" className="fill-red-400" />
            <circle cx="47" cy="26" r="6" className="fill-yellow-400" />
            <circle cx="67" cy="26" r="6" className="fill-green-400" />

            {/* URL Bar */}
            <rect
                x="286"
                y="17"
                width="660"
                height="24"
                rx="4"
                className="fill-gray-200 dark:fill-gray-600"
            />

            {/* URL Text */}
            <text
                x="580"
                y="33"
                className="fill-gray-500 text-xs"
                textAnchor="middle"
            >
              {url}
            </text>

            {/* Main Content Area */}
            <foreignObject x="0" y="52" width={width} height={height - 52}>
              <div
                  style={{
                    width: "100%",
                    height: "100%",
                    overflow: "hidden",
                  }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                    src={src}
                    alt="Website preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                />
              </div>
            </foreignObject>
          </g>
        </svg>
      </div>
  );
}
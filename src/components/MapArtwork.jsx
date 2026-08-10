export default function MapArtwork({ side }) {
  const allied = side === "allied";

  return (
    <svg
      viewBox="0 0 900 620"
      className={`map-art map-${side}`}
      aria-label={`${allied ? "Allied" : "Axis"} theatre map`}
      role="img"
    >
      <defs>
        <filter id={`rough-${side}`}>
          <feTurbulence type="fractalNoise" baseFrequency=".008" numOctaves="2" seed="7" />
          <feDisplacementMap in="SourceGraphic" scale="2.5" />
        </filter>
        <pattern id={`grid-${side}`} width="55" height="55" patternUnits="userSpaceOnUse">
          <path d="M55 0H0V55" fill="none" stroke="currentColor" strokeWidth="1" opacity=".18" />
        </pattern>
      </defs>

      {/* faint old military map grid */}
      <rect width="900" height="620" fill={`url(#grid-${side})`} opacity=".25" />

      <g
        className="country-borders"
        filter={`url(#rough-${side})`}
        fill="rgba(210,197,164,.18)"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinejoin="round"
      >
        {allied ? (
          <>
            {/* Great Britain */}
            <path d="M165 72 L146 91 L151 117 L136 139 L146 161 L132 188 L143 210 L132 235 L151 250 L171 231 L183 205 L177 182 L191 160 L181 136 L190 113 L176 91 Z" />
            {/* United States - continental outline */}
            <path d="M105 355 L124 332 L155 326 L178 309 L208 313 L230 330 L259 329 L283 345 L305 347 L321 363 L345 369 L362 389 L354 411 L330 414 L316 428 L291 424 L274 439 L248 431 L224 437 L201 426 L179 428 L158 413 L137 415 L124 396 L105 390 L93 372 Z" />
            {/* Soviet Union - broad recognizable outline */}
            <path d="M340 112 L378 90 L425 96 L462 82 L510 94 L545 86 L580 101 L625 98 L669 119 L716 126 L754 151 L780 176 L764 197 L728 204 L707 222 L667 220 L638 240 L601 228 L570 245 L532 232 L501 245 L469 227 L435 235 L406 215 L377 220 L356 199 L366 178 L344 160 Z" />
          </>
        ) : (
          <>
            {/* Germany */}
            <path d="M350 188 L376 171 L404 176 L423 191 L441 190 L454 212 L443 234 L427 248 L409 242 L395 258 L373 246 L356 252 L343 234 L349 216 L336 203 Z" />
            {/* Italy */}
            <path d="M390 283 L414 292 L425 310 L417 330 L429 349 L419 371 L404 388 L397 411 L383 427 L372 413 L378 391 L365 374 L373 352 L365 334 L376 316 L369 300 Z" />
            {/* Japan */}
            <path d="M693 240 L711 227 L726 239 L719 257 L733 269 L721 283 L727 302 L712 313 L704 331 L690 319 L694 299 L682 286 L690 268 L681 254 Z" />
            <path d="M748 335 L762 328 L775 339 L770 355 L756 362 L744 351 Z" />
            {/* Northern Italy / Central Europe context */}
            <path d="M414 162 L444 151 L469 163 L481 182 L465 198 L443 190 L423 191 Z" />
          </>
        )}
      </g>

      {/* boundary emphasis */}
      <g
        className="country-inner-borders"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity=".55"
      >
        {allied ? (
          <>
            <path d="M350 112 L390 132 L425 122 L462 143 L500 126 L538 145 L580 130 L620 153 L660 145 L700 169" />
            <path d="M128 355 L175 366 L218 354 L258 375 L300 366 L340 389" />
          </>
        ) : (
          <>
            <path d="M354 213 L382 205 L414 215 L438 205" />
            <path d="M383 303 L402 318 L410 340 L397 359 L405 380" />
          </>
        )}
      </g>

      <g className="map-labels">
        {allied ? (
          <>
            <text x="112" y="57">GREAT BRITAIN</text>
            <text x="184" y="475">UNITED STATES</text>
            <text x="505" y="72">SOVIET UNION</text>
          </>
        ) : (
          <>
            <text x="337" y="155">GERMANY</text>
            <text x="360" y="455">ITALY</text>
            <text x="680" y="218">JAPAN</text>
          </>
        )}
      </g>

      <g opacity=".13" fill="currentColor">
        <circle cx="80" cy="540" r="70" />
        <circle cx="540" cy="530" r="85" />
        <circle cx="825" cy="100" r="60" />
      </g>
    </svg>
  );
}

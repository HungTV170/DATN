import * as React from "react"
const SvgComponent = (props) => (
<>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    width="100%"
    height={290}
    viewBox="0 0 470 290"
    {...props}
  >
    <defs>
      <path
        id="a"
        d="M221.677 31.582c-55.54 19.895-112.156 36.51-167.848 55.993C33.02 94.854 8.92 106.19 5.062 129.52c-2.513 15.198 5.634 31.108 17.898 38.96 5.99 3.835 13.34 6.531 16.472 13.261 4.87 10.459-3.88 22.449-13.113 28.531-9.236 6.083-20.5 10.905-24.704 21.695-1.121 2.876-1.61 5.944-1.615 9.05v.082c.006 4.547 1.05 9.169 2.674 13.386 10.06 26.125 39.391 37.567 65.477 36.17 26.086-1.398 50.827-12.414 76.417-18.085 43.668-9.678 88.389-3.63 133.098 2.418 45.256 6.122 90.501 12.244 134.63 2.054 13.65-3.153 27.4-8.086 37.944-17.999 11.883-11.174 18.63-28.03 19.648-45.048.069-1.15.106-2.31.112-3.477v-.557c-.067-15.128-5.551-31.08-17.856-37.794-7.833-4.274-17.195-4.1-25.7-1.775-5.43 1.485-10.766 3.811-16.368 3.85-5.601.04-11.763-3-13.386-8.812-1.707-6.11 2.182-12.416 6.642-16.586 9.073-8.477 21.203-12.714 29.44-22.137 7.927-9.07 11.265-22.586 8.575-34.734-2.692-12.149-11.326-22.552-22.189-26.73-14.224-5.471-29.105-.465-44.051 4.542-14.139 4.736-28.34 9.474-42.1 5.336-2.1-.63-4.312-1.606-5.418-3.643-1.08-1.989-.835-4.511-.214-6.719 3.468-12.355 16.938-20.22 17.528-33.12.322-7.01-3.504-13.572-8.325-18.26C327.188 4.247 316.599.782 305.483.782c-28.103 0-59.605 22.132-83.806 30.8z"
      />
      <path
        id="c"
        d="M39.89.625c-2.162 6.638-7.77 12.79-13.571 16.612-9.236 6.082-20.5 10.904-24.704 21.694C.494 41.807.005 44.875 0 47.98v.082c.006 4.547 1.05 9.17 2.674 13.386 10.06 26.126 39.391 37.568 65.477 36.17 26.086-1.397 50.827-12.414 76.417-18.085 43.668-9.678 88.389-3.629 133.098 2.419 45.256 6.122 90.501 12.244 134.63 2.054 13.65-3.154 27.4-8.086 37.944-18 11.883-11.174 18.63-28.03 19.648-45.048.069-1.15.106-2.31.112-3.477v-.557c-.025-5.484-.761-11.079-2.277-16.3H39.89z"
      />
      <path
        id="g"
        d="M.99 2.778v5.157c0 1.457 1.467 2.638 3.277 2.638s3.278-1.181 3.278-2.638V2.778c0-1.457-1.467-2.637-3.278-2.637C2.457.141.99 1.321.99 2.778z"
      />
      <path
        id="i"
        d="M.577 2.778v5.157c0 1.457 1.468 2.638 3.279 2.638 1.81 0 3.278-1.181 3.278-2.638V2.778c0-1.457-1.468-2.637-3.278-2.637S.576 1.321.576 2.778z"
      />
      <path
        id="k"
        d="M.39 2.037c0 1.08.88 1.956 1.966 1.956a1.963 1.963 0 0 0 1.968-1.956c0-1.08-.88-1.956-1.968-1.956A1.961 1.961 0 0 0 .39 2.037z"
      />
      <path
        id="m"
        d="M.39 2.466c0 1.08.88 1.956 1.966 1.956a1.961 1.961 0 0 0 1.968-1.956A1.96 1.96 0 0 0 2.356.512 1.96 1.96 0 0 0 .39 2.466z"
      />
      <path
        id="e"
        d="M1.963.022C.893.022.026.898.026 1.977c0 1.08.867 1.956 1.937 1.956H16.45a1.946 1.946 0 0 0 1.935-1.956A1.946 1.946 0 0 0 16.45.022H1.963z"
      />
      <path
        id="o"
        d="M5.214 5.34c-.85 3.38 1.072 5.145 5.14 11.15L.464 55.893l44.419 11.492 9.888-39.401c6.384-3.286 8.919-3.909 9.77-7.295.793-3.159-1.093-6.383-4.206-7.189L12.294 1.071a5.696 5.696 0 0 0-1.437-.185c-2.598 0-4.972 1.783-5.643 4.453z"
      />
      <path
        id="q"
        d="M5 6.465c-1.055 4.052 1.213 6.332 4.666 11.2l-9.2 35.38 2.075.52 9.442-36.306c-3.886-5.53-5.717-7.165-4.909-10.276.758-2.91 3.791-4.675 6.762-3.933l45.868 11.453c2.971.742 4.772 3.714 4.015 6.624-.81 3.118-3.222 3.687-9.328 6.72L44.95 64.154l2.076.518 9.2-35.38c5.404-2.654 8.514-3.59 9.57-7.646 1.047-4.032-1.447-8.15-5.563-9.177L14.365 1.016a7.818 7.818 0 0 0-1.9-.234C9.025.782 5.885 3.056 5 6.465z"
      />
      <path
        id="s"
        d="M5.916.737C2.89.737.428 3.265.428 6.37c0 3.326 2.16 4.498 7.25 9.07v32.236h43.2V15.44c5.077-4.56 7.25-5.74 7.25-9.07 0-3.105-2.462-5.633-5.488-5.633H5.916z"
      />
      <path
        id="u"
        d="M7.721.63C3.638.63.314 4.073.314 8.3c0 4.249 2.667 5.935 7.065 9.878v30.697h2.058V17.21c-4.961-4.49-7.062-5.648-7.062-8.91 0-3.05 2.398-5.535 5.346-5.535h45.511c2.949 0 5.347 2.484 5.347 5.534 0 3.269-2.108 4.422-7.062 8.911v31.665h2.06V18.178c4.389-3.939 7.061-5.626 7.061-9.879 0-4.227-3.32-7.668-7.406-7.668H7.722z"
      />
      <path
        id="C"
        d="M4.278.171C2.09.171.314 1.931.314 4.097v43c0 2.168 1.776 3.926 3.964 3.926H69.79c2.187 0 3.963-1.758 3.963-3.926v-43C73.753 1.93 71.977.17 69.79.17H4.278z"
      />
      <path
        id="w"
        d="M.102 2.593A2.386 2.386 0 0 0 2.26 5.177a2.376 2.376 0 0 0 2.591-2.138A2.382 2.382 0 0 0 2.47.445 2.376 2.376 0 0 0 .102 2.593z"
      />
      <path
        id="y"
        d="M.007 2.613a2.381 2.381 0 0 0 2.155 2.582 2.375 2.375 0 0 0 2.593-2.138A2.379 2.379 0 0 0 2.374.464c-1.216 0-2.253.92-2.367 2.149z"
      />
      <path
        id="A"
        d="M.79 3.73c-.144.275.15.627.337.37C3.783.462 7.604.373 9.772 4.237c.244.43.852-.108.639-.557C9.353 1.496 7.533.36 5.676.36 3.852.36 1.994 1.456.79 3.73z"
      />
      <path
        id="E"
        d="M8.699 4.235 2.878 2.667c-.528-.144-1.074.182-1.219.725-.143.547.167 1.102.693 1.243l5.821 1.572-1.076 4.048-5.821-1.572a1 1 0 0 0-1.217.729c-.145.544.164 1.1.692 1.24l5.822 1.573-.9 3.377 7.313 1.973c4.037 1.088 8.21-1.407 9.32-5.573.753-2.832-.102-5.71-1.996-7.605a7.403 7.403 0 0 0-3.307-1.914L9.69.511 8.7 4.235z"
      />
      <path
        id="G"
        d="M1.203 6.693a7.827 7.827 0 0 0 5.536 9.596l7.57 2.024 1.534-5.714 2.531-9.428-7.569-2.025a7.849 7.849 0 0 0-9.602 5.548z"
      />
    </defs>
    <g fill="none" fillRule="evenodd">
      <path fill="#FFF" d="M-448-158H918v800H-448z" />
      <g transform="translate(0 -.39)">
        <mask id="b" fill="#fff">
          <use xlinkHref="#a" />
        </mask>
        <path
          fill="#F6F6F7"
          d="M-5.995 296.763h481.99V-5.213H-5.995z"
          mask="url(#b)"
        />
      </g>
      <g transform="translate(0 192.645)">
        <mask id="d" fill="#fff">
          <use xlinkHref="#c" />
        </mask>
        <path
          fill="#EDEDF0"
          d="M-20.194 115.101h507.548v-79H-20.194z"
          mask="url(#d)"
        />
      </g>
      <path
        stroke="#2D3F5B"
        strokeLinecap="round"
        strokeWidth={4}
        d="M42.92 105.015c1.69-.15 3.386-.39 5.08-.454 1.496-.056 3.045.109 4.354.832 2.559 1.415 3.61 4.459 6.173 5.892 3.477 1.945 7.237 2.323 11.14 2.395 4.592.085 9.185.091 13.777.069 9.192-.045 18.386-.2 27.579.004 1.455.032 2.97.052 4.292-.562 2.606-1.208 2.6-4.556-.086-5.63-1.088-.434-2.291-.441-3.463-.441l-32.929-.022c-2.27-.001-5.629.548-5.724 3.443-.215 6.553.078 15.199.713 21.722.17 1.76.492 3.722 1.92 4.769.896.657 2.057.81 3.166.904 6.696.573 13.43-.22 20.15-.185 6.721.034 13.7.992 19.326 4.657 10.875 7.087 11.581 26.256-1.336 31.914-6.591 2.887-14.242 2.35-21.267 2.257-7.79-.103-12.714.024-20.504-.132-1.647-.034-3.648-.288-4.304-1.797-.574-1.324.355-2.913 1.64-3.573 1.285-.663 2.802-.642 4.248-.603 32.437.865 62.03 4.399 94.49 2.362 15.62-.979 26.11-9.971 29.058-25.472 2.41-12.67-.035-28.363-10.01-37.409-1.853-1.68-3.952-3.08-6.24-4.098-9.326-4.147-21.037-3.107-28.714 3.924-3.952 3.619-6.283 8.75-7.291 14.006-1.948 10.149-2.077 21.397 1.549 31.197 4.503 12.17 15.295 17.937 27.852 19.106 22.936 2.138 46.167 2.247 68.908-1.419 6.817-1.1 14.77-3.416 19.496-8.795 11.362-12.935 9.584-40.905-1.435-53.582-9.245-10.635-26.641-9.576-36.17.345-4.034 4.198-6.308 9.85-7.244 15.591-2.07 12.71-.474 27.655 8.267 37.863 5.498 6.42 14.934 9.316 22.9 11.018 5.7 1.217 11.59 1.935 17.404 1.17 5.668-.749 11.264-3.322 17.003-1.433 3.896 1.282 7.194 5.378 6.09 9.328-1.146 4.102-6.015 5.773-10.238 6.335-17.139 2.28-34.126-2.651-51.125 1.61-3.002.753-5.983 1.835-8.431 3.728-2.449 1.894-4.32 4.697-4.543 7.785-.835 11.582 23.435 6.912 30.629 10.509"
        className="fio-500"
      />
      <g transform="translate(389.862 230.813)">
        <mask id="f" fill="#fff">
          <use xlinkHref="#e" />
        </mask>
        <path
          fill="#4B4B62"
          d="M-5.969 9.929H24.38V-5.973H-5.969z"
          className="fio"
          mask="url(#f)"
        />
      </g>
      <path
        stroke="#2D3F5B"
        strokeLinecap="round"
        strokeWidth={4}
        d="M332.999 252.51c-7.766-.244-14.938 4.491-22.688 4.744-2.34.077-4.8.01-6.847-1.128-2.662-1.483-3.966-4.531-3.511-7.501.564-3.683 3.808-5.906 6.02-8.612 3.643-4.453 2.47-9.05-2.76-11.169-5.66-2.293-11.803-3.685-17.833-4.585"
        className="fio"
      />
      <g className="full-torradeira">
        <g transform="translate(332.51 261.987)">
          <mask id="h" fill="#fff">
            <use xlinkHref="#g" />
          </mask>
          <path
            fill="#4B4B62"
            d="M-5.006 16.566h18.547V-5.855H-5.006z"
            mask="url(#h)"
          />
        </g>
        <g transform="translate(384.066 261.987)">
          <mask id="j" fill="#fff">
            <use xlinkHref="#i" />
          </mask>
          <path
            fill="#4B4B62"
            d="M-5.418 16.566h18.547V-5.855H-5.418z"
            mask="url(#j)"
          />
        </g>
        <g transform="translate(396.056 246.4)">
          <mask id="l" fill="#fff">
            <use xlinkHref="#k" />
          </mask>
          <path
            fill="#4B4B62"
            d="M-5.605 9.989h15.923V-5.913H-5.605z"
            mask="url(#l)"
          />
        </g>
        <g transform="translate(396.056 253.793)">
          <mask id="n" fill="#fff">
            <use xlinkHref="#m" />
          </mask>
          <path
            fill="#4B4B62"
            d="M-5.605 10.418h15.923V-5.483H-5.605z"
            mask="url(#n)"
          />
        </g>
        <g className="pao-atras">
          <g transform="translate(340.903 168.665)">
            <mask id="p" fill="#fff">
              <use xlinkHref="#o" />
            </mask>
            <path
              fill="#FFDA7F"
              d="M-5.53 73.379h76.248V-5.109H-5.53z"
              mask="url(#p)"
            />
          </g>
          <g transform="translate(340.903 167.466)">
            <mask id="r" fill="#fff">
              <use xlinkHref="#q" />
            </mask>
            <path
              fill="#E6A95F"
              d="M-5.53 70.667h77.56v-75.88H-5.53z"
              mask="url(#r)"
            />
          </g>
        </g>
        <g className="pao-frente">
          <g transform="translate(326.515 181.854)">
            <mask id="t" fill="#fff">
              <use xlinkHref="#s" />
            </mask>
            <path
              fill="#FFDA7F"
              d="M-5.568 53.67h69.691V-5.259H-5.568z"
              mask="url(#t)"
            />
          </g>
          <g transform="translate(325.316 180.655)">
            <mask id="v" fill="#fff">
              <use xlinkHref="#u" />
            </mask>
            <path
              fill="#E6A95F"
              d="M-5.68 54.87h72.314V-5.363H-5.68z"
              mask="url(#v)"
            />
          </g>
          <g transform="translate(344.301 196.242)">
            <mask id="x" fill="#fff">
              <use xlinkHref="#w" />
            </mask>
            <path
              fill="#633"
              d="m-4.153-6.995 16.451 3.198-3.191 16.424-16.453-3.198z"
              className="olho-esq"
              mask="url(#x)"
            />
          </g>
          <g transform="translate(361.087 196.242)">
            <mask id="z" fill="#fff">
              <use xlinkHref="#y" />
            </mask>
            <path
              fill="#633"
              d="m-4.248-6.976 16.451 3.198-3.192 16.423-16.452-3.197z"
              className="olho-dir"
              mask="url(#z)"
            />
          </g>
          <g transform="translate(350.495 205.834)">
            <mask id="B" fill="#fff">
              <use xlinkHref="#A" />
            </mask>
            <path
              fill="#633"
              d="m-3.14-7.546 21.133 4.108L14.8 12.985-6.333 8.878z"
              className="boca"
              mask="url(#B)"
            />
          </g>
        </g>
        <g className="torradeira" transform="translate(325.316 217.624)">
          <mask id="D" fill="#fff">
            <use xlinkHref="#C" />
          </mask>
          <path
            fill="#C81414"
            d="M-5.68 57.017h85.428v-62.84H-5.68z"
            mask="url(#D)"
          />
        </g>
      </g>
      <path
        stroke="#fdba55"
        strokeLinecap="round"
        strokeWidth={1.8}
        d="m278.964 208.006 2.957-2.949m-12.046 1.632-1.998-3.669m7.196 2.733.479-3.309m-11.709 28.064-3.043 2.862m12.088-1.28 1.891 3.724m-7.113-2.94-.575 3.293"
        className="raios"
      />
      <g transform="translate(272.561 214.226)">
        <mask id="F" fill="#fff">
          <use xlinkHref="#E" />
        </mask>
        <path
          fill="#2D3F5B"
          d="M10.383-14.007 34.351 9.962 12.875 31.438l-23.97-23.969z"
          className="tomada"
          mask="url(#F)"
        />
      </g>
      <g transform="translate(246.184 207.033)">
        <mask id="H" fill="#fff">
          <use xlinkHref="#G" />
        </mask>
        <path
          fill="#2D3F5B"
          d="M10.807-12.875 32.391 8.709l-21.598 21.6-21.586-21.585z"
          className="tomada"
          mask="url(#H)"
        />
      </g>
    </g>
  </svg>
    <h4 className="error-title">
    Woops! <br/>Something went wrong :(
    </h4>
    <h6 className="error-subtitle">
    Have you tried turning it off and on again?
    </h6>
</>
)
export default SvgComponent

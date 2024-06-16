import React from 'react';

const CardComponent = ({ title, type }: { title: string; type: string }) => {
  // Assuming your title is stored in a variable

  const [, secondPart] = title.split(' | ');

  return (
    <div className="h-[224px] bg-gradient-to-r from-pink-100 to-pink-200 px-4 py-4 sm:h-[224px] sm:px-5 sm:py-4 md:h-[180px] lg:h-[224px]">
      <div className="flex h-full flex-col items-center justify-center rounded-sm border-2 border-b-8 border-r-8 border-black bg-slate-50">
        <div className="flex h-10 flex-col items-start justify-center sm:h-20">
          <p className="sm:text-md flex-wrap whitespace-normal text-wrap border-black text-center font-serif text-xs capitalize text-pink-500 sm:text-lg">
            {secondPart} {/* Displaying the second part of the title */}
          </p>
          {!secondPart && (
            <p className="sm:text-md flex-wrap whitespace-normal text-wrap border-black text-center font-serif text-xs capitalize text-pink-500 sm:text-lg">
              {title} {/* Displaying the second part of the title */}
            </p>
          )}
        </div>
        <div className="my-auto flex h-20 flex-col items-center justify-center">
          {type === 'video' && (
            <svg
              fill="blue"
              className="text-pink-500"
              height="80px"
              width="151px"
              version="1.1"
              id="Capa_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="-14.4 -14.4 88.80 88.80"
              xmlSpace="preserve"
              stroke="black"
              strokeWidth="4.00"
            >
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
                stroke="#CCCCCC"
                strokeWidth="1.6800000000000002"
              ></g>
              <g id="SVGRepo_iconCarrier">
                <g>
                  <path d="M45.563,29.174l-22-15c-0.307-0.208-0.703-0.231-1.031-0.058C22.205,14.289,22,14.629,22,15v30 c0,0.371,0.205,0.711,0.533,0.884C22.679,45.962,22.84,46,23,46c0.197,0,0.394-0.059,0.563-0.174l22-15 C45.836,30.64,46,30.331,46,30S45.836,29.36,45.563,29.174z M24,43.107V16.893L43.225,30L24,43.107z"></path>
                  <path d="M30,0C13.458,0,0,13.458,0,30s13.458,30,30,30s30-13.458,30-30S46.542,0,30,0z M30,58C14.561,58,2,45.439,2,30 S14.561,2,30,2s28,12.561,28,28S45.439,58,30,58z"></path>
                </g>
              </g>
            </svg>
          )}
          {type === 'notion' && (
            <svg
              viewBox="0 0 24 24"
              height="50px"
              fill="black"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <path
                  d="M7 0h16v20H5V0h2zm14 18V2H7v16h14zM9 4h10v2H9V4zm10 4H9v2h10V8zM9 12h7v2H9v-2zm10 10H3V4H1v20h18v-2z"
                  fill="#000000"
                ></path>{' '}
              </g>
            </svg>
          )}
          {type === 'folder' && (
            <svg
              fill="black"
              height="50px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              viewBox="0 0 491.52 491.52"
              xmlSpace="preserve"
            >
              <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></g>
              <g id="SVGRepo_iconCarrier">
                {' '}
                <g>
                  {' '}
                  <g>
                    {' '}
                    <path d="M207.05,102.4l-53.53-51.2H0v389.12h491.52V102.4H207.05z M20.48,419.84V71.68H145.3l53.53,51.2h272.21v296.96H20.48z"></path>{' '}
                  </g>{' '}
                </g>{' '}
                <g>
                  {' '}
                  <g>
                    {' '}
                    <rect
                      x="194.56"
                      y="368.64"
                      width="235.52"
                      height="20.48"
                    ></rect>{' '}
                  </g>{' '}
                </g>{' '}
                <g>
                  {' '}
                  <g>
                    {' '}
                    <rect
                      x="296.96"
                      y="317.44"
                      width="133.12"
                      height="20.48"
                    ></rect>{' '}
                  </g>{' '}
                </g>{' '}
              </g>
            </svg>
          )}
        </div>
      </div>
    </div>
  );
};

export default CardComponent;

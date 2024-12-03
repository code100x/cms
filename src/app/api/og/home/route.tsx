import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  async function loadGoogleFont(font: string) {
    const url = `https://fonts.googleapis.com/css2?family=${font}:wght@600&display=swap`;
    const css = await (await fetch(url)).text();
    const resource = css.match(
      /src: url\((.+)\) format\('(opentype|truetype)'\)/,
    );

    if (resource) {
      const response = await fetch(resource[1]);
      if (response.status == 200) {
        return await response.arrayBuffer();
      }
    }

    throw new Error('failed to load font data');
  }

  const fontData = await loadGoogleFont('Gabarito');

  return new ImageResponse(
    (
      <div tw="text-white bg-black w-full py-4 px-10 h-full flex items-start justify-center flex-col">
        <div tw="opacity-10 absolute -bottom-24 -right-14 flex flex-col items-center justify-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="294"
            height="294"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
            <path d="M5 21h14" />
          </svg>
        </div>
        <div tw="flex flex-col">
          <div tw="flex mb-8 rounded-xl w-60 border-white p-4 items-center">
            <img
              tw="w-20 h-20 rounded-full"
              src={
                'https://appx-wsb-gcp.akamai.net.in/subject/2023-01-17-0.17044360120951185.jpg'
              }
            />
            <h3 tw="ml-4 text-4xl border-l-2 px-4 border-blue-500">100xDevs</h3>
          </div>
          <div tw="flex flex-col">
            <div tw="flex">
              <span
                style={{ fontFamily: 'main-bold' }}
                tw="font-extrabold text-7xl text-[#3b82f6]"
              >
                100xDevs,{' '}
              </span>
              <span tw=" text-7xl">because</span>
            </div>
            <span tw="font-bold text-7xl">10x ain't enough!</span>
          </div>

          <div tw="text-2xl mt-10">
            Take your development skills from 0 to 100 and join the 100xdevs
            community
          </div>
          <div tw="text-3xl rounded-xl mt-20 text-blue-400 w-52 flex items-center h-20 justify-center">
            <span tw="mr-2">Enroll Now</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="34"
              height="34"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path d="M18 8L22 12L18 16" />
              <path d="M2 12H22" />
            </svg>
          </div>
        </div>

        <div
          style={{
            background: 'linear-gradient(135deg, #60a5fa  100%, #1d4ed8  100%)',
            width: '20rem',
            height: '20rem',
            filter: 'blur(180px)',
            borderRadius: '50%',
            display: 'flex',
            position: 'absolute',
            bottom: '-100px',
            left: '-40px',
            opacity: '0.2',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'main',
          }}
        ></div>
        <div
          style={{
            background: 'linear-gradient(135deg, #60a5fa  100%, #1d4ed8  100%)',
            width: '20rem',
            height: '20rem',
            filter: 'blur(180px)',
            borderRadius: '50%',
            display: 'flex',
            position: 'absolute',
            top: '33%',
            right: '-40px',
            opacity: '0.8',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'main',
          }}
        ></div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: 'main',
          data: fontData,
          style: 'normal',
          weight: 400,
        },
      ],
    },
  );
}

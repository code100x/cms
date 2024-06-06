'use client';
export const Gate = () => {
  return (
    <div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <div className="justify-center flex">
        This website is temporarily down, Please access the course on <br />
      </div>
      <br />

      <div className="justify-center flex">
        <button
          onClick={() => {
            window.location.href = 'https://harkirat.classx.co.in/';
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          harkirat.classx.co.in
        </button>
      </div>
    </div>
  );
};

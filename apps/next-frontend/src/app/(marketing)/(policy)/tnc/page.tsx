import { tncContent } from '../../../../components/landing/footer/tnc/tnc-content';

const TermsAndConditionsPage = () => {
  return (
    <main className="-mt-6 mb-12 flex flex-col items-start justify-center px-4 md:px-36">
      <h1 className="mx-auto mb-4 w-full text-center text-3xl font-semibold text-neutral-800 dark:text-neutral-200 md:mb-6 md:max-w-screen-2xl md:text-4xl">
        Terms & Conditions
      </h1>
      {tncContent.map((item) => {
        return (
          <div
            className="my-4 text-lg font-normal text-neutral-700 dark:text-neutral-300"
            key={item.id}
          >
            <p>{item.description}</p>
            {item.points?.map((point) => {
              return (
                <p className="my-2" key={point.id}>
                  {point.id}
                  {'. '}
                  {point.description}
                </p>
              );
            })}
          </div>
        );
      })}
    </main>
  );
};

export default TermsAndConditionsPage;

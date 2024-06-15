import { privacyPolicyContent } from '../../../../components/landing/footer/privacy-policy/privacy-policy';

const PrivacyPolicyPage = () => {
  return (
    <main className="-mt-6 mb-12 flex flex-col items-start justify-center px-4 md:px-36">
      <h1 className="mx-auto mb-4 w-full text-center text-3xl font-semibold text-neutral-800 md:mb-6 md:max-w-screen-2xl md:text-4xl dark:text-neutral-200">
        Privacy Policy
      </h1>
      {privacyPolicyContent.map((item) => {
        return (
          <div
            className="my-3 text-lg font-normal text-neutral-700 dark:text-neutral-300"
            key={item.id}
          >
            <p className="">{item.description}</p>
          </div>
        );
      })}
    </main>
  );
};

export default PrivacyPolicyPage;

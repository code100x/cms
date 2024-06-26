const RefundAndCancellationPage = () => {
  return (
    <main className="-mt-6 mb-12 flex h-[60vh] flex-col items-start px-4 md:px-36 lg:h-[70vh]">
      <h1 className="mx-auto mb-4 w-full text-center text-3xl font-semibold text-neutral-800 md:mb-6 md:max-w-screen-2xl md:text-4xl dark:text-neutral-200">
        Refund/Cancellation Policy
      </h1>

      <p className="my-3 text-lg font-normal text-neutral-700 dark:text-neutral-300">
        You are entitled to a refund in the case of the purchased course not
        being assigned to you within the expiration date from your date of
        purchase or if you have paid twice for the same course. Under any other
        circumstance, we will not consider any requests for refund as this is a
        digital course purchase.
      </p>
    </main>
  );
};

export default RefundAndCancellationPage;

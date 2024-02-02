const RefundAndCancellationPage = () => {
  return (
    <main className="flex flex-col items-start -mt-6 mb-12 px-4 md:px-36 h-[60vh] lg:h-[70vh]">
      <h1 className="text-3xl md:text-4xl font-semibold text-neutral-800 dark:text-neutral-200 mb-4 md:mb-6 w-full text-center md:max-w-screen-2xl mx-auto">
        Refund/Cancellation Policy
      </h1>

      <p className="my-3 text-neutral-700 dark:text-neutral-300 font-normal text-lg">
        You are entitled to a refund in the case of the purchased course not
        being assigned to you within the expiration date from your date of
        purchase or if you have paid twice for the same course. Under any other
        circumstance, we will not consider any requests for refund as this is a
        digital course purchase.
      </p>
    </main>
  )
}

export default RefundAndCancellationPage

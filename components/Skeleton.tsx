export default function Skeleton() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <h2 className="sr-only">Loading weather data</h2>
      <div className="lg:col-span-2">
        <div className="animate-pulse">
          <div className="h-60 bg-indigo-200/70 backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl flex flex-col items-center justify-center">
            <div className="flex space-x-2 mb-4">
              <div className="w-4 h-4 bg-indigo-950 dark:bg-neutral-50 rounded-full animate-[bounceDots_1.4s_infinite]"></div>
              <div className="w-4 h-4 bg-indigo-950 dark:bg-neutral-50 rounded-full animate-[bounceDots_1.4s_infinite_0.2s]"></div>
              <div className="w-4 h-4 bg-indigo-950 dark:bg-neutral-50 rounded-full animate-[bounceDots_1.4s_infinite_0.4s]"></div>
            </div>
            <p className="text-xl">Loading...</p>
          </div>
        </div>
        <div className="mt-8 animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
        </div>
        <div className="mt-16 animate-pulse grid grid-cols-3 md:grid-cols-7 gap-4 text-center">
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
        </div>
      </div>
      <div className="animate-pulse">
        <div className="h-full bg-indigo-200/70  backdrop-blur-xl dark:bg-neutral-800 border border-transparent shadow dark:shadow-none dark:border-neutral-600 rounded-xl"></div>
      </div>
    </section>
  );
}

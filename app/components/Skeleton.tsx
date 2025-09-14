export default function Skeleton() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2">
        <div className="animate-pulse">
          <div className="h-60 bg-neutral-800 border-neutral-600 rounded-xl"></div>
        </div>
        <div className="mt-8 animate-pulse grid grid-cols-2 md:grid-cols-4 gap-4 my-4">
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
        </div>
        <div className="mt-16 animate-pulse grid grid-cols-3 md:grid-cols-7 gap-4 text-center">
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
          <div className="h-32 bg-neutral-800 border-neutral-600 rounded-xl"></div>
        </div>
      </div>
      <div className="animate-pulse">
        <div className="h-full bg-neutral-800 border-neutral-600 rounded-xl"></div>
      </div>
    </div>
  );
}

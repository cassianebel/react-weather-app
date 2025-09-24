export default function Panel({ children }: { children: React.ReactNode }) {
  return (
    <li className="bg-indigo-200/40 backdrop-blur-xl dark:bg-neutral-800 border border-transparent dark:border-neutral-600 shadow dark:shadow-none rounded-xl p-2 transition-colors duration-300">
      {children}
    </li>
  );
}

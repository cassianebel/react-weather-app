export default function Panel({ children }: { children: React.ReactNode }) {
  return (
    <li className="bg-indigo-200 dark:bg-neutral-800 border border-indigo-300 dark:border-neutral-600 rounded-xl p-2 transition-colors duration-300">
      {children}
    </li>
  );
}

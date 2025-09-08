export default function Panel({ children }: { children: React.ReactNode }) {
  return (
    <li className="bg-neutral-800 border border-neutral-600 rounded-xl p-2">
      {children}
    </li>
  );
}

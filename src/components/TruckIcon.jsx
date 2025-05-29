export default function TruckIcon({ className = "w-10 h-10 text-pink-600" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      className={className}
    >
      <path d="M3 6a1 1 0 011-1h11a1 1 0 011 1v3h2.586A2 2 0 0120 10.414l1.586 1.586A2 2 0 0122 13.414V17a1 1 0 01-1 1h-1a3 3 0 01-6 0H9a3 3 0 01-6 0H2a1 1 0 01-1-1V7a1 1 0 011-1h1zm13 1H4v9h1a3 3 0 016 0h4a3 3 0 016 0h1v-3.586l-1.586-1.586A2 2 0 0018.586 11H16V7zM7 18a1 1 0 102 0 1 1 0 00-2 0zm10 0a1 1 0 102 0 1 1 0 00-2 0z" />
    </svg>
  );
}


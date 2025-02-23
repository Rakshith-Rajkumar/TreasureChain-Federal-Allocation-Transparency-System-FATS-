import Link from "next/link";
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 py-10 text-white">
      <Link href="/api/auth/login?returnTo=/treasury" className="inline-block px-8 py-3 text-lg font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors duration-200">
      Login
      </Link>
    </div>
  );
}

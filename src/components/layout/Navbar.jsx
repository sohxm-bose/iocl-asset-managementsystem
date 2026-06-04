import {
  Bell,
  Search,
  User,
  LogOut,
} from "lucide-react";

export default function Navbar() {
  const user = {
    name: "IS Administrator",
  };

  return (
    <header className="h-16 bg-white shadow-sm border-b px-6 flex items-center justify-between">
      {/* Search */}
      <div className="flex items-center bg-slate-100 rounded-lg px-4 py-2 w-96">
        <Search
          size={18}
          className="text-slate-500"
        />

        <input
          type="text"
          placeholder="Search assets..."
          className="ml-3 bg-transparent outline-none w-full"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">
        <button className="relative">
          <Bell size={22} />

          <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            5
          </span>
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
            <User size={18} />
          </div>

          <div>
            <p className="font-medium">
              {user.name}
            </p>

            <p className="text-xs text-slate-500">
              Information Systems
            </p>
          </div>
        </div>

        <button className="hover:text-red-500">
          <LogOut size={20} />
        </button>
      </div>
    </header>
  );
}
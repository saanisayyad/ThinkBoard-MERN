import { FilePlus2Icon, NotebookPenIcon } from "lucide-react";
import { Link } from "react-router";

const Navbar = () => {
  return (
    <header className="relative z-20 border-b border-white/5 bg-slate-950/70 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4">

        <div className="flex items-center justify-between">

          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            {/* Logo icon */}
            <div
              className="relative flex items-center justify-center
              w-10 h-10 rounded-xl
              bg-gradient-to-br from-cyan-400/20
              via-blue-500/20 to-purple-500/20
              border border-cyan-400/20
              group-hover:border-cyan-400/40
              transition-all duration-300"
            >
              <NotebookPenIcon
                className="size-5 text-cyan-400
                group-hover:scale-110
                transition-transform duration-300"
              />

              <div className="absolute inset-0 rounded-xl bg-cyan-400/10 blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Brand */}
            <div>
              <h1
                className="text-xl sm:text-2xl font-bold
                tracking-tight text-white"
              >
                Think<span
                  className="text-transparent bg-clip-text
                  bg-gradient-to-r from-cyan-400
                  via-blue-400 to-purple-500"
                >
                  Board
                </span>
              </h1>

              <p className="hidden sm:block text-[10px] uppercase tracking-[0.2em] text-slate-600">
                Capture your thoughts
              </p>
            </div>
          </Link>

          {/* New Note */}
          <Link
            to="/create"
            className="group relative inline-flex items-center gap-2
            px-4 sm:px-5 py-2.5
            rounded-full
            overflow-hidden
            font-semibold text-sm
            text-white
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-purple-500
            shadow-lg shadow-cyan-500/10
            hover:shadow-cyan-500/25
            hover:-translate-y-0.5
            transition-all duration-300"
          >

            <FilePlus2Icon
              className="size-4
              group-hover:rotate-6
              transition-transform duration-300"
            />

            <span>New Note</span>

          </Link>

        </div>
      </div>
    </header>
  );
};

export default Navbar;
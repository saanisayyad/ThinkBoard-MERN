import { NotebookIcon, PlusIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
    <div className="mt-10 flex justify-center">

      <div className="relative w-full max-w-lg group">

        {/* Glow */}
        <div
          className="absolute -inset-1 rounded-3xl
          bg-gradient-to-r from-cyan-500/20
          via-blue-500/10 to-purple-500/20
          blur-xl opacity-50
          group-hover:opacity-80
          transition duration-500"
        />

        {/* Card */}
        <div
          className="relative flex flex-col items-center
          justify-center text-center
          p-10 sm:p-12
          rounded-3xl
          border border-white/10
          bg-white/[0.04]
          backdrop-blur-2xl
          shadow-2xl"
        >

          {/* Icon */}
          <div
            className="relative flex items-center justify-center
            w-24 h-24 mb-7
            rounded-full
            bg-gradient-to-br from-cyan-400/10
            via-blue-500/10 to-purple-500/10
            border border-cyan-400/20"
          >

            <div className="absolute inset-0 rounded-full bg-cyan-400/10 blur-xl" />

            <NotebookIcon className="relative size-10 text-cyan-400" />

          </div>

          {/* Heading */}
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            No notes yet
          </h3>

          {/* Description */}
          <p className="text-slate-500 leading-relaxed max-w-sm mb-8">
            Ready to organize your thoughts? Create your first note and
            start building your personal collection.
          </p>

          {/* Button */}
          <Link
            to="/create"
            className="group/btn inline-flex items-center gap-2
            px-6 py-3
            rounded-full
            font-semibold text-sm
            bg-gradient-to-r
            from-cyan-500
            via-blue-500
            to-purple-500
            text-white
            shadow-lg shadow-cyan-500/10
            hover:shadow-cyan-500/25
            hover:-translate-y-0.5
            transition-all duration-300"
          >
            <PlusIcon className="size-4 transition-transform duration-300 group-hover/btn:rotate-90" />
            Create Your First Note
          </Link>

        </div>
      </div>

    </div>
  );
};

export default NotesNotFound;
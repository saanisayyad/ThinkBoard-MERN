import { PenSquareIcon, Trash2Icon, CalendarDaysIcon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/util";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault();

    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/note/${id}`);

      setNotes((prev) => prev.filter((note) => note._id !== id));

      toast.success("Note deleted successfully");
    } catch (error) {
      toast.error("Failed to delete the note");
    }
  };

  return (
    <Link
      to={`/note/${note._id}`}
      className="group block h-full"
    >
      <article
        className="relative h-full min-h-[230px]
        overflow-hidden
        rounded-3xl
        border border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        shadow-xl
        transition-all duration-500
        hover:-translate-y-2
        hover:border-cyan-400/20
        hover:shadow-2xl"
      >

        {/* Top gradient accent */}
        <div
          className="absolute top-0 left-0 right-0 h-1
          bg-gradient-to-r
          from-cyan-400
          via-blue-500
          to-purple-500
          opacity-50
          group-hover:opacity-100
          transition-opacity duration-500"
        />

        {/* Background glow */}
        <div
          className="absolute -top-24 -right-24
          w-48 h-48
          rounded-full
          bg-cyan-500/5
          blur-3xl
          group-hover:bg-cyan-500/10
          transition-all duration-500"
        />

        <div className="relative flex flex-col h-full p-6">

          {/* Header */}
          <div className="flex items-start justify-between gap-4 mb-4">

            <h3
              className="text-xl font-semibold
              text-white
              leading-snug
              line-clamp-2
              group-hover:text-cyan-300
              transition-colors duration-300"
            >
              {note.title}
            </h3>

            {/* Edit icon */}
            <div
              className="shrink-0
              w-9 h-9
              flex items-center justify-center
              rounded-full
              border border-white/10
              bg-white/[0.04]
              text-slate-500
              group-hover:text-cyan-400
              group-hover:border-cyan-400/20
              transition-all duration-300"
            >
              <PenSquareIcon className="size-4" />
            </div>

          </div>

          {/* Content */}
          <p
            className="text-slate-400
            text-sm
            leading-relaxed
            line-clamp-4"
          >
            {note.content}
          </p>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-white/10 via-white/5 to-transparent my-5" />

          {/* Footer */}
          <div className="flex items-center justify-between">

            {/* Date */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CalendarDaysIcon className="size-3.5" />
              <span>
                {formatDate(new Date(note.createdAt))}
              </span>
            </div>

            {/* Delete */}
            <button
              onClick={(e) => handleDelete(e, note._id)}
              className="w-9 h-9
              flex items-center justify-center
              rounded-full
              border border-white/10
              bg-white/[0.03]
              text-slate-500
              hover:text-red-400
              hover:bg-red-500/10
              hover:border-red-400/20
              transition-all duration-300"
              title="Delete note"
            >
              <Trash2Icon className="size-4" />
            </button>

          </div>

        </div>
      </article>
    </Link>
  );
};

export default NoteCard;
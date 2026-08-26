import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router";
import api from "../lib/axios";

const NoteDetail = () => {
  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await api.get(`/note/${id}`);
        setNote(res.data);
      } catch (error) {
        toast.error("Failed to fetch the note");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this note?")) return;

    try {
      await api.delete(`/note/${id}`);
      toast.success("Note deleted!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to delete note");
    }
  };

  const handleSave = async () => {
    if (!note.title.trim() || !note.content.trim()) {
      toast.error("All fields required");
      return;
    }

    setSaving(true);

    try {
      await api.put(`/note/${id}`, note);
      toast.success("Note updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update note");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <LoaderIcon className="animate-spin size-10 text-cyan-400" />
          <p className="text-slate-500 text-sm">Loading your note...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-10">

        <div className="max-w-2xl mx-auto">

          {/* Top navigation */}
          <div className="flex items-center justify-between mb-8">

            <Link
              to="/"
              className="group inline-flex items-center gap-2 px-4 py-2.5
              rounded-full border border-white/10
              bg-white/[0.04] backdrop-blur-xl
              text-slate-300 hover:text-white
              hover:border-cyan-400/30 hover:bg-cyan-400/5
              transition-all duration-300"
            >
              <ArrowLeftIcon className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
              Back to Notes
            </Link>

            <button
              onClick={handleDelete}
              className="group inline-flex items-center gap-2 px-4 py-2.5
              rounded-full border border-red-400/20
              bg-red-500/5 text-red-400
              hover:bg-red-500/10
              hover:border-red-400/40
              transition-all duration-300"
            >
              <Trash2Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
              Delete
            </button>

          </div>

          {/* Heading */}
          <div className="text-center mb-8">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4
            rounded-full border border-cyan-400/20
            bg-cyan-400/5 text-cyan-300 text-sm font-medium">

              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />

              Editing Note
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Refine your{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                thoughts.
              </span>
            </h1>

            <p className="mt-3 text-slate-500">
              Make changes to your note and save them when you're ready.
            </p>

          </div>

          {/* Form card */}
          <div className="relative group">

            {/* Glow */}
            <div
              className="absolute -inset-1 rounded-3xl
              bg-gradient-to-r from-cyan-500/20
              via-blue-500/10 to-purple-500/20
              blur-xl opacity-50
              group-hover:opacity-80 transition duration-500"
            />

            <div
              className="relative rounded-3xl
              border border-white/10
              bg-white/[0.04]
              backdrop-blur-2xl
              p-6 sm:p-8
              shadow-2xl"
            >

              {/* Title */}
              <div className="mb-7">

                <label className="block mb-3">
                  <span className="text-sm font-semibold text-slate-300">
                    Title
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Note title"
                  className="w-full px-4 py-3.5
                  rounded-2xl
                  bg-slate-900/70
                  border border-white/10
                  text-white
                  placeholder:text-slate-600
                  outline-none
                  focus:border-cyan-400/50
                  focus:ring-2 focus:ring-cyan-400/10
                  transition-all duration-300"
                  value={note.title}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      title: e.target.value,
                    })
                  }
                />

              </div>

              {/* Content */}
              <div className="mb-7">

                <div className="flex items-center justify-between mb-3">

                  <label>
                    <span className="text-sm font-semibold text-slate-300">
                      Content
                    </span>
                  </label>

                  <span className="text-xs text-slate-600">
                    {note.content.length} characters
                  </span>

                </div>

                <textarea
                  placeholder="Write your note here..."
                  className="w-full min-h-64
                  px-4 py-4
                  rounded-2xl
                  bg-slate-900/70
                  border border-white/10
                  text-white
                  placeholder:text-slate-600
                  outline-none
                  resize-none
                  focus:border-cyan-400/50
                  focus:ring-2 focus:ring-cyan-400/10
                  transition-all duration-300
                  leading-relaxed"
                  value={note.content}
                  onChange={(e) =>
                    setNote({
                      ...note,
                      content: e.target.value,
                    })
                  }
                />

              </div>

              {/* Bottom actions */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                <p className="text-xs text-slate-600">
                  Changes are saved when you click the button.
                </p>

                <button
                  disabled={saving}
                  onClick={handleSave}
                  className="inline-flex items-center justify-center gap-2
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
                  active:translate-y-0
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                  transition-all duration-300"
                >
                  {saving ? (
                    <>
                      <LoaderIcon className="size-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </button>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NoteDetail;
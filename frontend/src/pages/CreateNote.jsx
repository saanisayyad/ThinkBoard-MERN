import { ArrowLeftIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import api from "../lib/axios";

const CreateNote = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      toast.error("All fields required");
      return;
    }

    setLoading(true);

    try {
      await api.post("/note", {
        title,
        content,
      });

      toast.success("Note created successfully");
      navigate("/");
    } catch (error) {
      if (error.response?.status === 429) {
        toast.error("Slow down! You are creating notes too fast", {
          duration: 4000,
        });
      } else {
        toast.error("Failed to create note");
      }
    } finally {
      setLoading(false);
    }
  };

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

          {/* Back button */}
          <Link
            to="/"
            className="group inline-flex items-center gap-2 mb-8 px-4 py-2.5 rounded-full
            border border-white/10 bg-white/[0.04] backdrop-blur-xl
            text-slate-300 hover:text-white
            hover:border-cyan-400/30 hover:bg-cyan-400/5
            transition-all duration-300"
          >
            <ArrowLeftIcon className="size-5 transition-transform duration-300 group-hover:-translate-x-1" />
            Back to Notes
          </Link>

          {/* Heading */}
          <div className="text-center mb-8">

            <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full
            border border-cyan-400/20 bg-cyan-400/5 text-cyan-300 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              New Note
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
              Create something{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                amazing.
              </span>
            </h1>

            <p className="mt-3 text-slate-500">
              Capture your thoughts and ideas in a beautiful note.
            </p>

          </div>

          {/* Form Card */}
          <div className="relative group">

            {/* Glow */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r
            from-cyan-500/20 via-blue-500/10 to-purple-500/20
            blur-xl opacity-50 group-hover:opacity-80 transition duration-500" />

            <div className="relative rounded-3xl border border-white/10
            bg-white/[0.04] backdrop-blur-2xl p-6 sm:p-8
            shadow-2xl">

              <form onSubmit={handleSubmit}>

                {/* Title */}
                <div className="mb-7">

                  <label className="block mb-3">
                    <span className="text-sm font-semibold text-slate-300">
                      Title
                    </span>
                  </label>

                  <input
                    type="text"
                    placeholder="Give your note a title..."
                    className="w-full px-4 py-3.5 rounded-2xl
                    bg-slate-900/70 border border-white/10
                    text-white placeholder:text-slate-600
                    outline-none
                    focus:border-cyan-400/50
                    focus:ring-2 focus:ring-cyan-400/10
                    transition-all duration-300"
                    value={title}
                    onChange={(e) => {
                      setTitle(e.target.value);
                    }}
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
                      {content.length} characters
                    </span>
                  </div>

                  <textarea
                    placeholder="Start writing your thoughts..."
                    className="w-full min-h-64 px-4 py-4 rounded-2xl
                    bg-slate-900/70 border border-white/10
                    text-white placeholder:text-slate-600
                    outline-none resize-none
                    focus:border-cyan-400/50
                    focus:ring-2 focus:ring-cyan-400/10
                    transition-all duration-300 leading-relaxed"
                    value={content}
                    onChange={(e) => {
                      setContent(e.target.value);
                    }}
                  />

                </div>

                {/* Bottom section */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                  <p className="text-xs text-slate-600">
                    Your thoughts, your space.
                  </p>

                  <button
                    type="submit"
                    disabled={loading}
                    className="relative overflow-hidden
                    px-6 py-3 rounded-full
                    font-semibold text-sm
                    bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500
                    text-white
                    shadow-lg shadow-cyan-500/10
                    hover:shadow-cyan-500/25
                    hover:-translate-y-0.5
                    active:translate-y-0
                    disabled:opacity-50 disabled:cursor-not-allowed
                    transition-all duration-300"
                  >
                    {loading ? "Creating..." : "Create Note"}
                  </button>

                </div>

              </form>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreateNote;
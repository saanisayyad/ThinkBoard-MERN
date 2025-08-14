// import { ArrowLeftIcon } from "lucide-react";
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
      if (error.response.status === 429) {
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
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Link
            to={"/"}
            className="bg-gray-600 flex items-center mb-5 gap-1 max-w-max p-2 rounded-3xl hover:scale-105 duration-300"
          >
            {/* <ArrowLeftIcon className="size-5" /> */}
            Back To Notes
          </Link>

          <div className="bg-gray-600 p-6 rounded-3xl hover:shadow-2xl duration-300">
            <div className="">
              <h2 className="mb-4 text-2xl max-w-max mx-auto underline">
                Create New Note
              </h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="label">
                    <span className="text-2xl px-2">Title</span>
                  </label>
                  </div>
                <input
                  type="text"
                  placeholder="Note Title"
                  className="bg-gray-500 px-3 py-1 rounded-2xl mb-4 focus:outline-none w-[50%]"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}

                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                  />
                <div className="mb-2">
                  <label className="label">
                    <span className="text-2xl px-2">Content</span>
                  </label>
                </div>
                <textarea
                  type="text"
                  placeholder="Write your note here..."
                  className="bg-gray-500 px-3 py-1 rounded-2xl mb-4 focus:outline-none w-[100%] h-32"
                  value={content}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}

                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSubmit(e);
                    }
                  }}
                />
                <div className="max-w-max mx-auto">
                  <button
                    type="submit"
                    className="border-3 border-gray-500 px-2 py-1 rounded-3xl cursor-pointer hover:scale-105 duration-300 "
                    disabled={loading}
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

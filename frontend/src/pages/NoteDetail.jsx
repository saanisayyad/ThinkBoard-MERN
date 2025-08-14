import { ArrowLeftIcon, LoaderIcon, Trash2Icon } from "lucide-react";
import { useEffect } from "react";
import { useState } from "react";
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
        toast.error("Failed to fetch the notes");
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, [id]);

  const handleDelete = async () => {
    if(!window.confirm('Are you sure you want to delete this note?')) return

    try {
      await api.delete(`/note/${id}`)
      toast.success('Note deleted!!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to delete note')
    }
  };
  const handleSave = async () => {
    if(!note.title.trim() || !note.content.trim()){
      toast.error('All fields required')
      return
    }

    setSaving(true)

    try {
      await api.put(`/note/${id}`, note)
      toast.success('Note updated successfully!!')
      navigate('/')
    } catch (error) {
      toast.error('Failed to update note')
    }finally{
      setSaving(false)
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoaderIcon className="animate-spin size-10" />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center justify-between mb-5">
            <Link to="/" className="bg-gray-600 flex items-center gap-1 max-w-max p-2 rounded-3xl hover:scale-105 duration-300">
              <ArrowLeftIcon className="h-5 w-5" />
              Back to Notes
            </Link>
            <button onClick={handleDelete} className="bg-gray-600 flex items-center gap-1 max-w-max p-2 rounded-3xl hover:scale-105 duration-300">
              <Trash2Icon className="h-5 w-5" />
              Delete Note
            </button>
          </div>
          <div>
            <div className="bg-gray-600 p-6 rounded-3xl hover:shadow-2xl duration-300">
              <h2 className="mb-4 text-2xl max-w-max mx-auto underline">
                Update Note
              </h2>
              <div className="form mb-4">
                <label className="label">
                  <span className="text-2xl px-2">Title</span>
                </label>
                </div>
                <input
                  type="text"
                  placeholder="Note title"
                  className="bg-gray-500 px-3 py-1 rounded-2xl mb-4 focus:outline-none w-[50%]"
                  value={note.title}
                  onChange={(e) => setNote({...note, title: e.target.value})}

                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSave(e);
                    }
                  }}
                />
              <div className="form mb-2">
                <label className="label">
                  <span className="text-2xl px-2">Content</span>
                </label>
                </div>
                <textarea
                  type="text"
                  placeholder="Write your note here..."
                  className="bg-gray-500 px-3 py-1 rounded-2xl mb-4 focus:outline-none w-[100%] h-32"
                  value={note.content}
                  onChange={(e) => setNote({...note, content: e.target.value})}

                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSave(e);
                    }
                  }}
                />
              <div className="max-w-max mx-auto">
                <button className="border-3 border-gray-500 px-2 py-1 rounded-3xl cursor-pointer hover:scale-105 duration-300 " disabled={saving} onClick={handleSave}>
                  {saving ? 'saving...' : 'Save Changes'}
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

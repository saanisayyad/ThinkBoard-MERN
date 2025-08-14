import { PenSquareIcon, Trash2Icon } from "lucide-react";
import { Link } from "react-router";
import { formatDate } from "../lib/util";
import api from "../lib/axios";
import toast from "react-hot-toast";

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault()

    if(!window.confirm('Are you sure you want to delete this note?')) return

    try {
        await api.delete(`/note/${id}`)
        setNotes((prev) => prev.filter(note => note._id !== id))
        toast.success('Note deleted successfully')
    } catch (error) {
        toast.error('Failed to delete the note')
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className="rounded-3xl bg-gray-400 hover:shadow-2xl transition-all duration-300 border-t-4 border-gray-800"
    >
      <div className="p-5">
        <h3 className="text-xl mb-2">{note.title}</h3>
        <p className="line-clamp-3">{note.content}</p>
        <div className=" justify-between items-center mt-4 flex">
          <span className="text-sm">
            {formatDate(new Date(note.createdAt))}
          </span>
          <div className="flex items-center gap-3">
            <PenSquareIcon className="size-4 hover:scale-110 duration-300" />
            <button
              className=""
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon className="size-4 hover:scale-110 duration-300" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;

import { NotebookIcon } from "lucide-react";
import { Link } from "react-router";

const NotesNotFound = () => {
  return (
      <div className="mt-10">
    <div className="bg-gray-400 flex flex-col items-center justify-center p-10 space-y-6 max-w-md mx-auto text-center rounded-3xl">
      <div className="bg-gray-500 rounded-full p-8">
        <NotebookIcon className="size-10 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">No notes yet</h3>
      <p className="text-base-content/70">
        Ready to organize your thoughts? Create your first note to get started on your journey.
      </p>
      <Link to="/create" className="bg-gray-500 hover:scale-105 duration-300 p-2 rounded-3xl">
        Create Your First Note
      </Link>
    </div>
    </div>
  );
};
export default NotesNotFound;
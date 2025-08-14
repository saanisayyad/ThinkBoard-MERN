import { Link } from "react-router";


const Navbar = () => {
  return <header className="bg-gray-800 backdrop-blur-md">
    <div className="mx-auto max-w-6xl p-4">
        <div className="flex items-center justify-between">
            <h1 className="text-3xl font-mono text-gray-400">
                ThinkBoard
            </h1>
            <div className="bg-gray-400 p-2 rounded-3xl hover:scale-105 duration-300">
                <Link to='/create' className="flex gap-1 items-center">
                {/* <PlusIcon className="size-5"/> */}
                <span className="">
                    New Note
                </span>
            </Link>
            </div>
        </div>
    </div>
  </header>;
};

export default Navbar;

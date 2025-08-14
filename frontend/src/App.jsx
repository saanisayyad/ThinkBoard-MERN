import { Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";
import CreateNote from "./pages/CreateNote";
import NoteDetail from "./pages/NoteDetail";

const App = () => {
  
  return (
    <div className="bg-gray-500">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreateNote />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};

export default App;

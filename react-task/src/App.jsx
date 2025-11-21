
import DropDown from "./components/DropDown";
import Home from "./components/Home";
import MultiDocument from "./components/MultiDocument";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Notification from "./components/Notification";
import Chart from "./components/Chart";
import DateAndTime from "./components/DateAndTime";
import AIForm from "./components/AIForm";

const App = () => {
  return (
    <div>
      <Navbar />
      <div className="p-6 text-3xl">
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/date-time" element={<DateAndTime/>} />
          <Route path="/Drop-down" element={<DropDown/>} />
          <Route path="/multi-document" element={<MultiDocument/>} />
          <Route path="/notification" element={<Notification/>} />
          <Route path="/chart" element={<Chart/>} />
          <Route path="/form" element={<AIForm/>} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

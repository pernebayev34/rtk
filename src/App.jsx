import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Layout from "./components/layout";

const App = () => {
  return (
    <div>
      <Layout />
      <ToastContainer position="top-right" />
    </div>
  );
};

export default App;

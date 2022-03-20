import Footer from "./Footer";
import Navbar from "./Navbar";
import Visualizer from "./Visualizer";
import DesignComponents from "./DesignComponents";

export default function App() {
  return (
    <div className="App">
      <DesignComponents />
      <Navbar/>
      <Visualizer/>
      <Footer/>
    </div>
  );
}

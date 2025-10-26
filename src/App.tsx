import "./App.scss";
import { NavBar, ParallaxBackground } from "./components";
import {
  Header,
  Footer,
  About,
  Skills /*, Testimonial*/,
  Work,
} from "./containers";

function App() {
  return (
    <div className="app">
      <NavBar />
      <ParallaxBackground intensity={150} />
      <Header />
      <About />
      <Work />
      <Skills />
      {/* <Testimonial /> */}
      <ParallaxBackground />
      <Footer />
    </div>
  );
}

export default App;

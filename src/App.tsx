import "./App.scss";
import { NavBar } from "./components";
import { Header, Footer, About, Skills, Testimonial, Work } from "./containers";

function App() {
  return (
    <div className="app">
      <NavBar />
      <Header />
      <About />
      <Work />
      <Skills />
      <Testimonial />
      <Footer />
    </div>
  );
}

export default App;

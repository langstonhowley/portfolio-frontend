import './App.css';

import ReactDOM from "react-dom/client";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import Links from './screens/Links';
import Home from './screens/home/Home';
import Projects from './screens/projects/Projects';
import OnlineResume from './screens/online-resume/OnlineResume';
import NotFound from './screens/not-found/NotFound';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Links />}>
            <Route index element={<Home />} />
            <Route path="projects" element={<Projects />} />
            <Route path="resume" element={<OnlineResume />} />
            <Route path="*" element={<NotFound/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

export default App;

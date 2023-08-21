import Home from "./pages/Home";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { library } from '@fortawesome/fontawesome-svg-core'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import './style.scss';
import {Route, Routes} from "react-router-dom"
import Start from "./pages/Start";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" Component={ Start } />
        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/chat" Component={Home} />
      </Routes>
    </div>
  );
}

export default App;
library.add(fab, fas, far)
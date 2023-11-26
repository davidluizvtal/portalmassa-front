import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import "./styles/global.css";
import { AuthProvider } from "./store/contexts/auth";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

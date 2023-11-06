import { BrowserRouter } from "react-router-dom";
import { Router } from "./routes";
import { AuthProvider } from "./store/contexts/auth";
import "./styles/global.css";

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

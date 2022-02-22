import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import ProtectedRoute from "./auth/protected-route.js";
import LandingPage from "./components/LandingPage.jsx";
import Home from "./components/Home.jsx";
import DetailRecipe from "./components/DetailRecipe.jsx";
import Form from "./components/Form.jsx";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Auth0ProviderWithHistory>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/home" element={<Home />} />
            <Route path="/:id" element={<DetailRecipe />} />
            <Route path="/form" element={<ProtectedRoute component={Form} />} />
          </Routes>
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </div>
  );
}

export default App;

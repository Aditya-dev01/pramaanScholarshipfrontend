import { BrowserRouter } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { ScholarshipProvider } from "./context/ScholarshipContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ScholarshipProvider>
          <AppRoutes />
        </ScholarshipProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

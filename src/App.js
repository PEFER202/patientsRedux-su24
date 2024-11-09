import "./App.css";
import { Provider } from "react-redux";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import store from "./redux/store";
import { loadWithDelay } from "./utils/loadWithDelay";
import { lazy, Suspense } from "react";

function App() {
  const LoginForm = lazy(() =>
    loadWithDelay(() => import("./components/login"), 2000)
  );
  const PatientManagement = lazy(() =>
    loadWithDelay(() => import("./components/patientManagement"), 2000)
  );
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              {" "}
              <Route path="/" element={<LoginForm />} />{" "}
              <Route path="/applicants" element={<PatientManagement />} />{" "}
            </Routes>
          </Suspense>
        </div>
      </Router>
    </Provider>
  );
}

export default App;

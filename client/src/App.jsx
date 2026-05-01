import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import Dashboard from "./pages/dashboard/Dashboard.jsx";
import Projects from "./pages/projects/Projects";
import Tasks from "./pages/tasks/Tasks";
import RegisterMember from "./pages/admin/RegisterMember.jsx";

import PrivateRoute from "./routes/PrivateRoute";
import AdminRoute from "./routes/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* protected */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />

        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />

        {/* admin-only */}
        <Route
          path="/admin/register-member"
          element={
            <AdminRoute>
              <RegisterMember />
            </AdminRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
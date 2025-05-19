import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AuthProvider, useAuth } from './AuthContext';
import Home from './pages/Home';
import DatasetList from './pages/DatasetList';
import CreateDataset from './pages/CreateDataset';
import DatasetDetails from './pages/DatasetDetails';
import Login from './pages/Login';
import Navbar from './components/Navbar';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { hospital } = useAuth();
  const location = useLocation();
  if (!hospital) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children;
}

function AppRoutes() {
  const { hospital, login, logout } = useAuth();
  return (
    <>
      {hospital && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            hospital ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={login} />
            )
          }
        />
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />
        <Route
          path="/datasets"
          element={
            <RequireAuth>
              <DatasetList />
            </RequireAuth>
          }
        />
        <Route
          path="/datasets/:id"
          element={
            <RequireAuth>
              <DatasetDetails />
            </RequireAuth>
          }
        />
        <Route
          path="/create"
          element={
            <RequireAuth>
              <CreateDataset />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {hospital && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={logout}
            className="bg-gray-800 border border-gray-700 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Logout ({hospital.name})
          </button>
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}
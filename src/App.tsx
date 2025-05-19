import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useUser } from './contexts/UserContext';
import Home from './pages/Home';
import DatasetList from './pages/DatasetList';
import CreateDataset from './pages/CreateDataset';
import DatasetDetails from './pages/DatasetDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import Navbar from './components/Navbar';

function RequireAuth({ children }: { children: JSX.Element }) {
  const { user, loading } = useUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}

function AppRoutes() {
  const { user, logout } = useUser();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route
          path="/login"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Login onLogin={() => {}} />
            )
          }
        />
        <Route
          path="/register"
          element={
            user ? (
              <Navigate to="/" replace />
            ) : (
              <Register />
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
      {user && (
        <div className="fixed bottom-4 right-4">
          <button
            onClick={handleLogout}
            className="bg-gray-800 border border-gray-700 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
          >
            Logout ({user.username})
          </button>
        </div>
      )}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

import Header from './components/Header';
import Footer from './components/Footer';

import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Inquiry from './pages/Inquiry';

import Login from './pages/Login';

import AppLogin from './pages/app/AppLogin';
import AppRecorder from './pages/app/AppRecorder';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminClients from './pages/admin/AdminClients';
import AdminReport from './pages/admin/AdminReport';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const PublicLayout = ({ children }) => {
    return (
      <div
        className={`w-full min-h-screen antialiased ${
          isDarkMode
            ? 'bg-[#0B0F19] text-gray-100'
            : 'bg-gray-50 text-gray-800'
        }`}
      >
        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />

        <main className="page-container max-w-6xl mx-auto px-6 mt-12 min-h-screen">
          {children}
        </main>

        <Footer isDarkMode={isDarkMode} />
      </div>
    );
  };

  return (
    <Routes>
      {/* 공개 홈페이지 */}
      <Route
        path="/"
        element={<Navigate to="/home" replace />}
      />

      <Route
        path="/home"
        element={
          <PublicLayout>
            <Home isDarkMode={isDarkMode} />
          </PublicLayout>
        }
      />

      <Route
        path="/about"
        element={
          <PublicLayout>
            <About isDarkMode={isDarkMode} />
          </PublicLayout>
        }
      />

      <Route
        path="/products"
        element={
          <PublicLayout>
            <Products isDarkMode={isDarkMode} />
          </PublicLayout>
        }
      />

      <Route
        path="/inquiry"
        element={
          <PublicLayout>
            <Inquiry isDarkMode={isDarkMode} />
          </PublicLayout>
        }
      />

      {/* 웹 관리자 로그인 */}
      <Route
        path="/login"
        element={
          <Login
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        }
      />

      {/* 웹 관리자 페이지 */}
      <Route
        element={
          <ProtectedRoute
            loginPath="/login"
            requiredKey="cns_web_login"
            roleKey="cns_web_role"
            requiredRoles={['admin']}
          />
        }
      >
        <Route
          path="/admin"
          element={
            <AdminDashboard
              mode="web"
              basePath="/admin"
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />

        <Route
          path="/admin/clients"
          element={
            <AdminClients
              mode="web"
              basePath="/admin"
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />

        <Route
          path="/admin/report/:clientId"
          element={
            <AdminReport
              mode="web"
              basePath="/admin"
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />
      </Route>

      {/* 앱 로그인 */}
      <Route
        path="/app"
        element={<Navigate to="/app/login" replace />}
      />

      <Route
        path="/app/login"
        element={
          <AppLogin
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        }
      />

      {/* 앱 녹음 화면 */}
      <Route
        element={
          <ProtectedRoute
            loginPath="/app/login"
            requiredKey="cns_app_login"
            roleKey="cns_app_role"
            requiredRoles={['admin', 'recorder']}
          />
        }
      >
        <Route
          path="/app/record"
          element={
            <AppRecorder
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />
      </Route>

      {/* 앱 관리자 페이지 */}
      <Route
        element={
          <ProtectedRoute
            loginPath="/app/login"
            requiredKey="cns_app_login"
            roleKey="cns_app_role"
            requiredRoles={['admin']}
          />
        }
      >
        <Route
          path="/app/admin"
          element={
            <AdminDashboard
              mode="app"
              basePath="/app/admin"
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />

        <Route
          path="/app/admin/clients"
          element={
            <AdminClients
              mode="app"
              basePath="/app/admin"
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />

        <Route
          path="/app/admin/report/:clientId"
          element={
            <AdminReport
              mode="app"
              basePath="/app/admin"
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />
        <Route
          path="/register"
          element={
            <Register
              isDarkMode={isDarkMode}
              setIsDarkMode={setIsDarkMode}
            />
          }
        />
      </Route>

      {/* 없는 주소는 홈페이지로 */}
      <Route
        path="*"
        element={<Navigate to="/home" replace />}
      />
    </Routes>
  );
};

export default App;
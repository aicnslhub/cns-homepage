import { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import ProtectedRoute from './components/ProtectedRoute';

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
  const [isDarkMode, setIsDarkMode] = useState(true);

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
          <Home
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        }
      />

      <Route
        path="/about"
        element={
          <About
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        }
      />

      <Route
        path="/products"
        element={
          <Products
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        }
      />

      <Route
        path="/inquiry"
        element={
          <Inquiry
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
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
      </Route>

      {/* 없는 주소는 공개 홈페이지로 이동 */}
      <Route
        path="*"
        element={<Navigate to="/home" replace />}
      />
    </Routes>
  );
};

export default App;
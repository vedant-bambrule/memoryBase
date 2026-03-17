import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Documents } from './pages/Documents';
import { Employees } from './pages/Employees';
import { Assistant } from './pages/Assistant';
import { Login } from './pages/Login';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route index element={<Dashboard />} />
                        <Route path="documents" element={<Documents />} />
                        <Route path="employees" element={<Employees />} />
                        <Route path="assistant" element={<Assistant />} />
                        <Route path="assistant/:documentId" element={<Assistant />} />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

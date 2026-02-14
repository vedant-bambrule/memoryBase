import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Documents } from './pages/Documents';
import { Employees } from './pages/Employees';
import { Assistant } from './pages/Assistant';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="documents" element={<Documents />} />
                    <Route path="employees" element={<Employees />} />
                    <Route path="assistant" element={<Assistant />} />
                    <Route path="assistant/:documentId" element={<Assistant />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Placeholder routes for future implementation */}
        <Route path="/simulation" element={<div className="p-8"><h1 className="text-2xl font-bold">Simulation Page (Coming Soon)</h1></div>} />
        <Route path="/history" element={<div className="p-8"><h1 className="text-2xl font-bold">History Page (Coming Soon)</h1></div>} />
      </Routes>

    </Router>
  );
}

export default App;

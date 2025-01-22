
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Quote, Activity } from 'lucide-react';
import QuotePage from './pages/QuotePage';
import HealthCheckPage from './pages/HealthCheckPage';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <nav className="p-4 bg-black/20 backdrop-blur-sm">
          <div className="container mx-auto flex justify-center gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Quote size={20} />
              <span>Quotes</span>
            </Link>
            <Link 
              to="/health" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <Activity size={20} />
              <span>Health Check</span>
            </Link>
          </div>
        </nav>

        <main className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<QuotePage />} />
            <Route path="/health" element={<HealthCheckPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
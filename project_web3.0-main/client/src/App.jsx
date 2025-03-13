import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Navbar, Footer } from './components';
import { Welcome, Services } from './components';
import { Web3Provider } from './context/Web3Context';
import Dashboard from "./pages/Dashboard";
import Vault from "./pages/Vault";
import Staking from "./pages/Staking";
import Portfolio from "./pages/Portfolio";

const App = () => {
  return (
    <Web3Provider>
      <Router>
        <div className="min-h-screen">
          <Navbar />
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/vault" element={<Vault />} />
            <Route path="/staking" element={<Staking />} />
            <Route path="/portfolio" element={<Portfolio />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </Web3Provider>
  );
};

export default App;

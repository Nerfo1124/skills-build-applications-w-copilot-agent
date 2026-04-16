import { useState } from 'react';
import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const navigationItems = [
  { label: 'Users', path: '/users' },
  { label: 'Teams', path: '/teams' },
  { label: 'Activities', path: '/activities' },
  { label: 'Leaderboard', path: '/leaderboard' },
  { label: 'Workouts', path: '/workouts' },
];

function App() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const logoSrc = `${process.env.PUBLIC_URL}/octofitapp-small.png`;

  return (
    <div className="app-shell bg-body-tertiary min-vh-100">
      <nav className="navbar navbar-expand-lg navbar-dark app-navbar shadow-sm sticky-top">
        <div className="container py-2">
          <NavLink className="navbar-brand fw-semibold" to="/users">
            <span className="brand-mark">
              <img className="brand-logo" src={logoSrc} alt="OctoFit logo" />
            </span>
            <span>
              <span className="d-block brand-title">OctoFit Tracker</span>
              <span className="d-block brand-subtitle">Fitness dashboard</span>
            </span>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsNavOpen(previousState => !previousState)}
            aria-controls="octofitNav"
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className={`collapse navbar-collapse ${isNavOpen ? 'show' : ''}`} id="octofitNav">
            <div className="navbar-nav ms-auto gap-lg-2">
              {navigationItems.map(item => (
                <NavLink
                  key={item.path}
                  className="nav-link"
                  to={item.path}
                  onClick={() => setIsNavOpen(false)}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container py-4">
        <div className="row mb-4">
          <div className="col-12">
            <div className="app-hero rounded-4 p-4 p-md-5 shadow-sm">
              <div className="row g-4 align-items-center">
                <div className="col-lg-8">
                  <p className="text-uppercase small fw-semibold mb-2 text-primary">React + Django REST</p>
                  <h1 className="display-6 fw-bold mb-3">OctoFit frontend conectado al backend</h1>
                  <p className="mb-0 text-secondary">
                    Navega entre usuarios, equipos, actividades, leaderboard y workouts usando
                    react-router-dom, tablas consistentes y detalles en modales con Bootstrap.
                  </p>
                </div>
                <div className="col-lg-4">
                  <div className="card border-0 shadow-sm app-summary-card">
                    <div className="card-body">
                      <div className="d-flex align-items-center gap-3 mb-3">
                        <img className="hero-logo" src={logoSrc} alt="OctoFit robot mascot" />
                        <div>
                          <p className="text-uppercase small fw-semibold text-primary mb-1">OctoFit identity</p>
                          <h2 className="h5 card-title mb-0">Energetic, clear and API-driven</h2>
                        </div>
                      </div>
                      <h2 className="h5 card-title mb-3">Módulos disponibles</h2>
                      <div className="d-flex flex-wrap gap-2">
                        {navigationItems.map(item => (
                          <NavLink key={item.path} className="btn btn-outline-primary btn-sm" to={item.path}>
                            {item.label}
                          </NavLink>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Routes>
          <Route path="/" element={<Navigate to="/users" replace />} />
          <Route path="/users" element={<Users />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/workouts" element={<Workouts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

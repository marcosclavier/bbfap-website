import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';
import Nav from './components/Nav';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import ContactPage from './pages/ContactPage';
import ConseillerFinancierRiveSud from './pages/ConseillerFinancierRiveSud';
import ConseillerFinancierMontreal from './pages/ConseillerFinancierMontreal';

// Code-split: the admin editor (and its TipTap bundle) loads only on /admin,
// never in the public site bundle.
const AdminPage = lazy(() => import('./pages/AdminPage'));

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const { pathname } = useLocation();
  // The /admin editor is a standalone full-screen app — hide the public nav/footer.
  const isAdmin = pathname.startsWith('/admin');

  if (isAdmin) {
    return (
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-gray-500">Chargement…</div>}>
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Suspense>
    );
  }

  return (
    <>
      <ScrollToTop />
      <Nav />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/a-propos" element={<AboutPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/blogue" element={<BlogPage />} />
          <Route path="/blogue/:slug" element={<BlogPostPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/conseiller-financier-rive-sud" element={<ConseillerFinancierRiveSud />} />
          <Route path="/conseiller-financier-montreal" element={<ConseillerFinancierMontreal />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

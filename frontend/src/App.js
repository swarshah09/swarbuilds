import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import "@/App.css";
import { AuthProvider } from "@/lib/auth";
import { Toaster } from "@/components/ui/sonner";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";
import CursorGlow from "@/components/CursorGlow";
import BackToTop from "@/components/BackToTop";
import LoadingScreen from "@/components/LoadingScreen";

const Home = lazy(() => import("@/pages/Home"));
const CaseStudy = lazy(() => import("@/pages/CaseStudy"));
const BlogList = lazy(() => import("@/pages/BlogList"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const AdminLogin = lazy(() => import("@/pages/AdminLogin"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));

function Shell({ children }) {
  return (
    <div className="App relative">
      <CursorGlow />
      <Nav />
      <main className="relative z-10">{children}</main>
      <StickyCTA />
      <BackToTop />
      <Footer />
    </div>
  );
}

function AdminShell({ children }) {
  return (
    <div className="App relative min-h-screen">
      <main className="relative z-10">{children}</main>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<LoadingScreen />}>
          <Routes>
            <Route path="/" element={<Shell><Home /></Shell>} />
            <Route path="/case-studies/:slug" element={<Shell><CaseStudy /></Shell>} />
            <Route path="/blog" element={<Shell><BlogList /></Shell>} />
            <Route path="/blog/:slug" element={<Shell><BlogPost /></Shell>} />
            <Route path="/admin/login" element={<AdminShell><AdminLogin /></AdminShell>} />
            <Route path="/admin" element={<AdminShell><AdminDashboard /></AdminShell>} />
          </Routes>
        </Suspense>
      </BrowserRouter>
      <Toaster theme="dark" position="bottom-right" />
    </AuthProvider>
  );
}

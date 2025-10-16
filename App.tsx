import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { SignupPage } from "./components/SignupPage";
import { DashboardSidebar } from "./components/DashboardSidebar";
import { Dashboard } from "./components/Dashboard";
import { ChatShield } from "./components/ChatShield";
import { VoiceShield } from "./components/VoiceShield";
import { MoneyShield } from "./components/MoneyShield";
import { CommunityShield } from "./components/CommunityShield";
import { TruthQuest } from "./components/TruthQuest";
import { MILBoard } from "./components/MILBoard";
import { Settings } from "./components/Settings";
import { AboutPage } from "./components/AboutPage";
import { PricingPage } from "./components/PricingPage";
import { PlaceholderPage } from "./components/PlaceholderPage";
import { Avatar, AvatarFallback, AvatarImage } from "./components/ui/avatar";
import { Button } from "./components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./components/ui/sheet";
import { Toaster } from "./components/ui/sonner";
import { motion } from "motion/react";

type Page = "landing" | "login" | "signup" | "app" | "about" | "pricing" | "features" | "api" | "blog" | "careers" | "privacy" | "terms" | "security";
type Module = "dashboard" | "chatshield" | "voiceshield" | "moneyshield" | "communityshield" | "truthquest" | "milboard" | "settings";

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("landing");
  const [activeModule, setActiveModule] = useState<Module>("dashboard");
  const [isDark, setIsDark] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check system preference on mount
    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(isDarkMode);
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDark = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleGetStarted = () => {
    setCurrentPage("signup");
  };

  const handleLogin = () => {
    setCurrentPage("app");
    setActiveModule("dashboard");
  };

  const handleSignup = (userData?: { name: string; email: string; password: string; profileType: string }) => {
    console.log("User signed up:", userData);
    // In a real app, this would save to database/backend
    if (userData) {
      localStorage.setItem("truthshield_user", JSON.stringify({
        name: userData.name,
        email: userData.email,
        profileType: userData.profileType
      }));
    }
    setCurrentPage("app");
    setActiveModule("dashboard");
  };

  const handleModuleChange = (module: Module) => {
    setActiveModule(module as Module);
    setIsMobileMenuOpen(false);
  };

  const handleNavigateToModule = (module: string) => {
    console.log("handleNavigateToModule called with:", module);
    const moduleMap: Record<string, Module> = {
      'chatshield': 'chatshield',
      'voiceshield': 'voiceshield',
      'moneyshield': 'moneyshield',
      'communityshield': 'communityshield',
      'truthquest': 'truthquest',
      'milboard': 'milboard'
    };
    
    const targetModule = moduleMap[module.toLowerCase()];
    if (targetModule) {
      console.log("Setting active module to:", targetModule);
      setActiveModule(targetModule);
    } else {
      console.error("Module not found:", module);
    }
  };

  const renderModule = () => {
    switch (activeModule) {
      case "dashboard":
        return <Dashboard onNavigateToModule={handleNavigateToModule} />;
      case "chatshield":
        return <ChatShield />;
      case "voiceshield":
        return <VoiceShield />;
      case "moneyshield":
        return <MoneyShield />;
      case "communityshield":
        return <CommunityShield />;
      case "truthquest":
        return <TruthQuest />;
      case "milboard":
        return <MILBoard />;
      case "settings":
        return <Settings />;
      default:
        return <Dashboard onNavigateToModule={handleNavigateToModule} />;
    }
  };

  // Landing Page
  if (currentPage === "landing") {
    return (
      <div className="min-h-screen">
        <Navbar 
          isDark={isDark} 
          onToggleDark={toggleDark} 
          showAuth 
          onLoginClick={() => setCurrentPage("login")}
        />
        <LandingPage 
          onGetStarted={handleGetStarted}
          onNavigate={(page) => setCurrentPage(page as Page)}
        />
      </div>
    );
  }

  // About Page
  if (currentPage === "about") {
    return (
      <div className="min-h-screen">
        <Navbar isDark={isDark} onToggleDark={toggleDark} />
        <AboutPage onBack={() => setCurrentPage("landing")} />
      </div>
    );
  }

  // Pricing Page
  if (currentPage === "pricing") {
    return (
      <div className="min-h-screen">
        <Navbar isDark={isDark} onToggleDark={toggleDark} />
        <PricingPage 
          onBack={() => setCurrentPage("landing")}
          onGetStarted={handleGetStarted}
        />
      </div>
    );
  }

  // Placeholder Pages
  if (["features", "api", "blog", "careers", "privacy", "terms", "security"].includes(currentPage)) {
    const pageTitles: Record<string, { title: string; description?: string }> = {
      features: { title: "Features", description: "Explore all TruthShield features in detail." },
      api: { title: "API Documentation", description: "Integrate TruthShield into your applications." },
      blog: { title: "Blog", description: "Stay updated with the latest in misinformation detection." },
      careers: { title: "Careers", description: "Join our mission to combat misinformation." },
      privacy: { title: "Privacy Policy", description: "Learn how we protect your data." },
      terms: { title: "Terms of Service", description: "Review our terms and conditions." },
      security: { title: "Security", description: "Understanding our security measures." }
    };

    const pageInfo = pageTitles[currentPage] || { title: currentPage };

    return (
      <div className="min-h-screen">
        <Navbar isDark={isDark} onToggleDark={toggleDark} />
        <PlaceholderPage 
          title={pageInfo.title}
          description={pageInfo.description}
          onBack={() => setCurrentPage("landing")}
        />
      </div>
    );
  }

  // Login Page
  if (currentPage === "login") {
    return (
      <div className="min-h-screen">
        <Navbar isDark={isDark} onToggleDark={toggleDark} />
        <div className="pt-16 sm:pt-20">
          <LoginPage 
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentPage("signup")}
          />
        </div>
      </div>
    );
  }

  // Signup Page
  if (currentPage === "signup") {
    return (
      <div className="min-h-screen">
        <Navbar isDark={isDark} onToggleDark={toggleDark} />
        <div className="pt-16 sm:pt-20">
          <SignupPage 
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentPage("login")}
          />
        </div>
      </div>
    );
  }

  // Main App (Dashboard & Modules)
  return (
    <>
      <Toaster />
      <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <DashboardSidebar activeModule={activeModule} onModuleChange={handleModuleChange} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navigation */}
        <motion.nav
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="glass-panel border-b border-border/50 px-4 sm:px-6 lg:px-8 py-4 sticky top-0 z-40"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Mobile Menu Button */}
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="lg:hidden rounded-xl">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-64 p-0">
                  <DashboardSidebar activeModule={activeModule} onModuleChange={handleModuleChange} />
                </SheetContent>
              </Sheet>

              <h2 className="text-xl sm:text-2xl capitalize">
                {activeModule === "chatshield" ? "ChatShield" :
                 activeModule === "voiceshield" ? "VoiceShield" :
                 activeModule === "moneyshield" ? "MoneyShield" :
                 activeModule === "communityshield" ? "CommunityShield" :
                 activeModule === "truthquest" ? "TruthQuest" :
                 activeModule === "milboard" ? "MILBoard" :
                 activeModule}
              </h2>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={toggleDark}
                variant="ghost"
                size="icon"
                className="rounded-xl hover:bg-white/10"
              >
                {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>

              <Avatar className="w-9 h-9 sm:w-10 sm:h-10 cursor-pointer hover:ring-2 ring-purple-500 transition-all">
                <AvatarImage src="https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=400" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </motion.nav>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto">
          <div className="max-w-7xl mx-auto">
            {renderModule()}
          </div>
        </main>
      </div>
    </div>
    </>
  );
}

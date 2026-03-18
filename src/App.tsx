import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/layout/AppLayout";
import Index from "./pages/Index";
import FundFlowPage from "./pages/FundFlowPage";
import AlertsPage from "./pages/AlertsPage";
import InvestigationPage from "./pages/InvestigationPage";
import ReportsPage from "./pages/ReportsPage";
import SettingsPage from "./pages/SettingsPage";
import AuthPage from "./pages/AuthPage";
import ForensicsPage from "./pages/ForensicsPage";
import AIBriefingPage from "./pages/AIBriefingPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/fund-flow" element={<FundFlowPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/investigation" element={<InvestigationPage />} />
            <Route path="/forensics" element={<ForensicsPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Route>
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/intel/briefing" element={<AIBriefingPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

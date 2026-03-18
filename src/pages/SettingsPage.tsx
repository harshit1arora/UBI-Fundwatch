import { motion } from "framer-motion";
import { User, ShieldCheck, Mail, KeyRound, Bell, CheckCircle2, Save } from "lucide-react";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function SettingsPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.tab || "profile");

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    }
  }, [location.state]);

  const showSaveSuccess = () => {
    toast.success("Settings Saved", {
      description: "Your preferences have been updated successfully.",
      icon: <CheckCircle2 className="w-4 h-4 text-success" />,
    });
  };

  return (
    <div className="p-6 lg:p-8 max-w-5xl mx-auto space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Account Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">Manage your profile, security, and application preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Settings Sidebar */}
        <aside className="w-full md:w-64 shrink-0 space-y-1">
          {[
            { id: "profile", icon: User, label: "My Profile" },
            { id: "security", icon: ShieldCheck, label: "Security Settings" },
            { id: "preferences", icon: Mail, label: "Preferences" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-primary text-primary-foreground shadow-card"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </aside>

        {/* Content Area */}
        <div className="flex-1 bg-card rounded-2xl border shadow-card p-6 md:p-8 overflow-hidden">
          {activeTab === "profile" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">Profile Information</h3>
                <p className="text-sm text-muted-foreground mt-1">Update your personal details and investigator credentials.</p>
              </div>

              <div className="flex items-center gap-6 pb-6 border-b">
                <div className="w-20 h-20 rounded-full bg-primary-light border-2 border-primary/20 flex flex-col items-center justify-center text-primary">
                  <span className="text-2xl font-bold">AK</span>
                </div>
                <div>
                  <button className="px-4 py-2 bg-secondary text-secondary-foreground text-sm font-medium rounded-lg hover:bg-secondary/80 transition-colors">
                    Upload Avatar
                  </button>
                  <p className="text-xs text-muted-foreground mt-2">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Full Name</label>
                  <input type="text" defaultValue="Ashish Kumar" className="w-full bg-secondary border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Email Address</label>
                  <input type="email" defaultValue="ashish.k@ubifundwatch.com" className="w-full bg-secondary border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Investigator ID</label>
                  <input type="text" disabled defaultValue="INV-48291A" className="w-full bg-secondary/50 text-muted-foreground border-none rounded-xl px-4 py-3 text-sm cursor-not-allowed" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Internal Department</label>
                  <select className="w-full bg-secondary border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none">
                    <option>Fraud & Risk Management</option>
                    <option>Compliance</option>
                    <option>Anti-Money Laundering (AML)</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <button onClick={showSaveSuccess} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-elevated">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "security" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">Security Settings</h3>
                <p className="text-sm text-muted-foreground mt-1">Ensure your account is secure using 2FA and strong passwords.</p>
              </div>

              <div className="space-y-5 py-6 border-y">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="p-2 border rounded-lg bg-secondary"><KeyRound className="w-5 h-5 text-primary" /></div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Two-Factor Authentication (2FA)</h4>
                      <p className="text-xs text-muted-foreground mt-1">Currently enabled via Authenticator App</p>
                    </div>
                  </div>
                  <button className="px-3 py-1.5 border border-primary/20 text-primary rounded-lg text-sm font-medium hover:bg-primary/10 transition-colors">
                    Configure
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-sm">Change Password</h4>
                <div className="space-y-4 max-w-md">
                  <input type="password" placeholder="Current Password" className="w-full bg-secondary border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                  <input type="password" placeholder="New Password" className="w-full bg-secondary border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                  <input type="password" placeholder="Confirm New Password" className="w-full bg-secondary border-none rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-primary/50 outline-none" />
                </div>
              </div>

              <div className="pt-4">
                <button onClick={showSaveSuccess} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-elevated">
                  Update Password
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === "preferences" && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
              <div>
                <h3 className="text-lg font-bold">Notification & Display Preferences</h3>
                <p className="text-sm text-muted-foreground mt-1">Control how and when you receive alerts from the system.</p>
              </div>

              <div className="space-y-4 max-w-2xl">
                {[
                  { label: "High Risk Alerts", desc: "Immediate push & email notification for score > 80", defaultChecked: true },
                  { label: "Daily Summary Report", desc: "Receive a consolidated report every morning", defaultChecked: true },
                  { label: "New Login Alerts", desc: "Notify me when my account is accessed from a new device", defaultChecked: true },
                  { label: "UI Sounds", desc: "Play brief sound on new incoming high-risk alert", defaultChecked: false },
                ].map((pref, i) => (
                  <label key={i} className="flex items-start justify-between cursor-pointer p-4 rounded-xl border bg-secondary/30 hover:bg-secondary/50 transition-colors">
                    <div className="pr-4">
                      <p className="font-semibold text-sm text-foreground">{pref.label}</p>
                      <p className="text-xs text-muted-foreground mt-1">{pref.desc}</p>
                    </div>
                    <div className="relative inline-block w-11 h-6 shrink-0 mt-1">
                      <input type="checkbox" defaultChecked={pref.defaultChecked} className="peer sr-only" />
                      <div className="w-11 h-6 bg-border peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </div>
                  </label>
                ))}
              </div>

              <div className="pt-4">
                <button onClick={showSaveSuccess} className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-bold text-sm hover:opacity-90 transition-all shadow-elevated">
                  <Save className="w-4 h-4" /> Save Preferences
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

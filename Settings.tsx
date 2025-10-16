import { motion } from "motion/react";
import { Settings as SettingsIcon, User, Bell, Shield, Key, Download, Trash2, Briefcase, GraduationCap, Users, Globe } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Separator } from "./ui/separator";
import { useState } from "react";
import { toast } from "sonner";

const profileTypes = [
  {
    id: "individual",
    icon: User,
    title: "Individual",
    description: "Personal use and fact-checking",
    color: "from-purple-500 to-blue-500"
  },
  {
    id: "educator",
    icon: GraduationCap,
    title: "Educator",
    description: "Teaching media literacy",
    color: "from-blue-500 to-cyan-500"
  },
  {
    id: "journalist",
    icon: Briefcase,
    title: "Journalist",
    description: "Professional news verification",
    color: "from-cyan-500 to-green-500"
  },
  {
    id: "organization",
    icon: Globe,
    title: "Organization",
    description: "Business or NGO use",
    color: "from-green-500 to-yellow-500"
  }
];

export function Settings() {
  const [fullName, setFullName] = useState("John Doe");
  const [email, setEmail] = useState("john@example.com");
  const [bio, setBio] = useState("Truth seeker and fact-checker");
  const [profileType, setProfileType] = useState("individual");
  const [organization, setOrganization] = useState("");

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleChangeAvatar = () => {
    toast.info("Avatar upload feature coming soon!");
  };

  const handleChangePassword = () => {
    toast.info("Password change feature coming soon!");
  };

  const handleDownloadData = () => {
    toast.info("Preparing your data download...");
  };

  const handleDeleteAccount = () => {
    if (confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      toast.error("Account deletion has been cancelled for demo purposes.");
    }
  };

  const selectedProfile = profileTypes.find(p => p.id === profileType) || profileTypes[0];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="p-3 rounded-xl gradient-bg">
            <SettingsIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl">Settings</h1>
            <p className="text-muted-foreground">
              Manage your account and preferences
            </p>
          </div>
        </div>
      </motion.div>

      {/* Profile Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
      >
        <Card className="p-6 sm:p-8 glass-panel">
          <div className="flex items-center gap-3 mb-6">
            <User className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl">Profile</h2>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://images.unsplash.com/photo-1581065178047-8ee15951ede6?w=400" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-2">
                <Button 
                  variant="outline" 
                  className="rounded-xl glass-panel border-2"
                  onClick={handleChangeAvatar}
                >
                  Change Avatar
                </Button>
                <p className="text-xs text-muted-foreground">JPG, PNG or GIF. Max 2MB.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullname">Full Name</Label>
                <Input
                  id="fullname"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="glass-panel border-2 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="glass-panel border-2 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <Input
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="glass-panel border-2 rounded-xl"
              />
            </div>

            {/* Profile Type Selection */}
            <div className="space-y-3">
              <Label>Profile Type</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Select the profile type that best describes how you use TruthShield
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {profileTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Card
                      className={`p-4 cursor-pointer transition-all border-2 ${
                        profileType === type.id
                          ? "border-purple-500 bg-purple-50 dark:bg-purple-950/30"
                          : "border-border hover:border-purple-300 dark:hover:border-purple-700"
                      }`}
                      onClick={() => setProfileType(type.id)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${type.color} flex-shrink-0`}>
                          <type.icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="mb-1 text-sm">{type.title}</h4>
                          <p className="text-xs text-muted-foreground">{type.description}</p>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 transition-all flex-shrink-0 mt-1 ${
                            profileType === type.id
                              ? "border-purple-500 bg-purple-500"
                              : "border-border"
                          }`}
                        >
                          {profileType === type.id && (
                            <svg
                              className="w-full h-full text-white p-0.5"
                              fill="none"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Organization field (only shown if organization profile type is selected) */}
            {profileType === "organization" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                className="space-y-2"
              >
                <Label htmlFor="organization">Organization Name</Label>
                <Input
                  id="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  placeholder="Enter your organization name"
                  className="glass-panel border-2 rounded-xl"
                />
              </motion.div>
            )}

            <Button 
              onClick={handleSaveProfile}
              className="gradient-bg text-white hover:opacity-90 transition-opacity rounded-xl"
            >
              Save Changes
            </Button>
          </div>
        </Card>
      </motion.div>

      {/* Notifications */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="p-6 sm:p-8 glass-panel">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl">Notifications</h2>
          </div>

          <div className="space-y-4">
            {[
              { label: "Email Notifications", description: "Receive email updates about your activity" },
              { label: "Misinformation Alerts", description: "Get notified about trending misinformation" },
              { label: "Weekly Digest", description: "Receive a weekly summary of your verifications" },
              { label: "Community Updates", description: "Stay updated on community fact-checking activity" }
            ].map((item, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl glass-panel"
              >
                <div className="flex-1 min-w-0 mr-4">
                  <p className="mb-1">{item.label}</p>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
                <Switch defaultChecked={index < 2} />
              </div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Privacy & Security */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-6 sm:p-8 glass-panel">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-5 h-5" />
            <h2 className="text-xl sm:text-2xl">Privacy & Security</h2>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl glass-panel">
              <div className="flex-1 min-w-0 mr-4">
                <p className="mb-1">Two-Factor Authentication</p>
                <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl glass-panel">
              <div className="flex-1 min-w-0 mr-4">
                <p className="mb-1">Privacy Mode</p>
                <p className="text-sm text-muted-foreground">Hide your activity from other users</p>
              </div>
              <Switch />
            </div>

            <Separator className="my-4" />

            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-xl glass-panel border-2"
                onClick={handleChangePassword}
              >
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
              <Button 
                variant="outline" 
                className="w-full justify-start rounded-xl glass-panel border-2"
                onClick={handleDownloadData}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Your Data
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Danger Zone */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-6 sm:p-8 glass-panel border-red-200 dark:border-red-800">
          <div className="flex items-center gap-3 mb-6">
            <Trash2 className="w-5 h-5 text-red-600 dark:text-red-400" />
            <h2 className="text-xl sm:text-2xl text-red-600 dark:text-red-400">Danger Zone</h2>
          </div>

          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-red-100/50 dark:bg-red-900/20 border border-red-200 dark:border-red-800">
              <p className="mb-2 text-red-900 dark:text-red-100">Delete Account</p>
              <p className="text-sm text-red-800 dark:text-red-200 mb-4">
                Once you delete your account, there is no going back. Please be certain.
              </p>
              <Button
                variant="destructive"
                className="rounded-xl"
                onClick={handleDeleteAccount}
              >
                Delete My Account
              </Button>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

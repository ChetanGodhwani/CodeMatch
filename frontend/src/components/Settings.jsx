import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  Bell,
  Shield,
  Palette,
  Globe,
  Moon,
  Sun,
  ChevronRight,
  LogOut,
  Trash2,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUser } from "../utils/userSlice";

const ToggleRow = ({
  icon: Icon,
  title,
  description,
  defaultChecked = false,
}) => {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between py-4">
      <div className="flex items-start gap-3">
        <div className="bg-base-200 p-2 rounded-lg mt-0.5">
          <Icon className="w-4 h-4 text-base-content/70" />
        </div>
        <div>
          <p className="font-medium text-sm">{title}</p>
          {description && (
            <p className="text-xs text-base-content/50 mt-0.5 max-w-xs">
              {description}
            </p>
          )}
        </div>
      </div>
      <input
        type="checkbox"
        className="toggle toggle-primary"
        checked={checked}
        onChange={() => setChecked((v) => !v)}
      />
    </div>
  );
};

const LinkRow = ({ icon: Icon, title, description, onClick }) => (
  <button onClick={onClick} className="w-full flex items-center justify-between py-4 hover:bg-base-200/50 rounded-lg px-2 -mx-2 transition-colors text-left">
    <div className="flex items-start gap-3">
      <div className="bg-base-200 p-2 rounded-lg mt-0.5">
        <Icon className="w-4 h-4 text-base-content/70" />
      </div>
      <div>
        <p className="font-medium text-sm">{title}</p>
        {description && (
          <p className="text-xs text-base-content/50 mt-0.5">{description}</p>
        )}
      </div>
    </div>
    <ChevronRight className="w-4 h-4 text-base-content/30" />
  </button>
);

const Settings = () => {
  const [selectedTheme, setSelectedTheme] = useState("system");
  const [radius, setRadius] = useState(50);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const themes = [
    { id: "light", label: "Light", icon: Sun },
    { id: "dark", label: "Dark", icon: Moon },
    { id: "system", label: "System", icon: Globe },
  ];

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-extrabold mb-1">Settings</h1>
        <p className="text-sm text-base-content/60 mb-8">
          Manage your account, appearance, and preferences.
        </p>

        {/* Profile summary card */}
        <div className="card bg-gradient-to-br from-primary to-secondary text-primary-content p-6 mb-6 relative overflow-hidden">
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
          <div className="relative z-10 flex items-center gap-4">
            <div className="avatar placeholder">
              <div className="bg-white/20 text-white rounded-full w-14 backdrop-blur flex items-center justify-center">
                <User className="w-6 h-6" />
              </div>
            </div>
            <div>
              <p className="font-bold">Your Profile</p>
              <p className="text-sm text-primary-content/80">
                Manage how developers see you
              </p>
            </div>
          </div>
        </div>

        {/* Appearance */}
        <div className="card bg-base-100 border border-base-300 p-5 mb-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-base-content/50 mb-4 flex items-center gap-2">
            <Palette className="w-4 h-4" /> Appearance
          </h2>

          <div className="grid grid-cols-3 gap-3 mb-2">
            {themes.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setSelectedTheme(id)}
                className={`flex flex-col items-center gap-2 rounded-xl border-2 py-4 transition-colors ${
                  selectedTheme === id
                    ? "border-primary bg-primary/5"
                    : "border-base-300 hover:border-base-content/20"
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    selectedTheme === id
                      ? "text-primary"
                      : "text-base-content/50"
                  }`}
                />
                <span
                  className={`text-xs font-medium ${
                    selectedTheme === id
                      ? "text-primary"
                      : "text-base-content/60"
                  }`}
                >
                  {label}
                </span>
              </button>
            ))}
          </div>

          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-base-content/70">
                Card corner radius
              </span>
              <span className="text-xs text-base-content/40">{radius}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={radius}
              onChange={(e) => setRadius(e.target.value)}
              className="range range-primary range-xs"
            />
          </div>
        </div>

        {/* Notifications */}
        <div className="card bg-base-100 border border-base-300 p-5 mb-6 divide-y divide-base-200">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-base-content/50 mb-1 flex items-center gap-2">
            <Bell className="w-4 h-4" /> Notifications
          </h2>
          <ToggleRow
            icon={Bell}
            title="New matches"
            description="Get notified when a developer is interested"
            defaultChecked
          />
          <ToggleRow
            icon={Bell}
            title="Messages"
            description="Get notified about new messages"
            defaultChecked
          />
          <ToggleRow
            icon={Bell}
            title="Weekly digest"
            description="A summary of your activity every week"
          />
        </div>

        {/* Privacy & Account */}
        <div className="card bg-base-100 border border-base-300 p-5 mb-6 divide-y divide-base-200">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-base-content/50 mb-1 flex items-center gap-2">
            <Shield className="w-4 h-4" /> Privacy & Account
          </h2>
          <LinkRow
            icon={Shield}
            title="Blocked users"
            description="Manage developers you've blocked"
          />
          <LinkRow
            icon={User}
            title="Edit profile"
            description="Update your photo, bio, and skills"
          />
          <LinkRow
            icon={LogOut}
            title="Log out"
            description="Sign out of this device"
            onClick={handleLogout}
          />
        </div>

        {/* Danger zone */}
        <div className="card bg-error/5 border border-error/30 p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-error/70 mb-3 flex items-center gap-2">
            <Trash2 className="w-4 h-4" /> Danger Zone
          </h2>
          <button className="btn btn-outline btn-error btn-sm">
            Delete account
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default Settings;

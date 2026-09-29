import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Users, Inbox, Send, Home, Settings, Menu, X } from "lucide-react";


const navItems = [
  { section: "Discover", items: [{ to: "/", label: "Feed", icon: Home }] },
  {
    section: "Network",
    items: [
      { to: "/user/connections", label: "Connections", icon: Users },
      { to: "/requests/received", label: "Requests", icon: Inbox, badge: true },
      { to: "/requests/sent", label: "Sent", icon: Send },
    ],
  },
  {
    section: "Account",
    items: [{ to: "/settings", label: "Settings", icon: Settings }],
  },
];

const NavLinks = ({ requestCount, onNavigate }) => (
  <div className="flex flex-col gap-6">
    {navItems.map(({ section, items }) => (
      <div key={section}>
        <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40 px-3 mb-2">
          {section}
        </p>
        <div className="flex flex-col gap-1">
          {items.map(({ to, label, icon: Icon, badge }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onNavigate}
              className={({ isActive }) =>
                `group flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? "bg-gradient-to-r from-primary/15 to-secondary/10 text-primary shadow-sm"
                    : "text-base-content/70 hover:bg-base-200 hover:translate-x-0.5"
                }`
              }
            >
              <Icon className="w-4.5 h-4.5 shrink-0" />
              <span className="flex-1">{label}</span>
              {badge && requestCount > 0 && (
                <span className="badge badge-primary badge-sm">
                  {requestCount}
                </span>
              )}
            </NavLink>
          ))}
        </div>
      </div>
    ))}
  </div>
);

// Moved outside SideBar so it isn't redefined on every render
const SidebarContent = ({ user, requestCount, onNavigate }) => (
  <>
    {user && (
      <div className="flex items-center gap-3 p-3 mb-6 rounded-xl bg-base-200/60 border border-base-300">
        <div className="avatar">
          <div className="w-10 rounded-full">
            <img src={user.photoUrl} alt={user.firstName} />
          </div>
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold truncate">
            {user.firstName} {user.lastName}
          </p>
          <p className="text-xs text-base-content/50 truncate">
            {user.emailId}
          </p>
        </div>
      </div>
    )}
    <NavLinks requestCount={requestCount} onNavigate={onNavigate} />
  </>
);

const SideBar = () => {
  const [open, setOpen] = useState(false);
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests);
  const requestCount = requests?.length || 0;

  return (
    <>
      {/* Hamburger trigger — always visible, any screen size */}
      <button
        onClick={() => setOpen(true)}
        className="btn btn-ghost btn-circle fixed top-3.5 left-2 z-[60]"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Drawer — always used, regardless of viewport */}
      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setOpen(false)}
          />
          <div className="relative w-72 bg-base-100 h-full px-4 py-6 shadow-2xl animate-in slide-in-from-left duration-300">
            <button
              onClick={() => setOpen(false)}
              className="btn btn-ghost btn-circle btn-sm absolute top-4 right-4"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="mt-8">
              <SidebarContent
                user={user}
                requestCount={requestCount}
                onNavigate={() => setOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SideBar;

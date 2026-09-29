import axios from "axios";
import { Bell, LogOut, Settings, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";


const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="navbar sticky top-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300 px-4 md:px-8">
      <div className="flex-1">
        <Link
          to="/"
          className="btn btn-ghost text-2xl font-extrabold tracking-tight normal-case"
        >
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent ml-6">
            Dev
          </span>
          <span>Tinder</span>
        </Link>
      </div>

      <div className="flex items-center gap-3">
        {/* Notifications */}
        <button className="btn btn-ghost btn-circle">
          <div className="indicator">
            <Bell className="w-5 h-5" />
            <span className="badge badge-xs badge-primary indicator-item"></span>
          </div>
        </button>

        {/* Profile dropdown */}
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar placeholder ring-offset-base-100 ring-offset-2 hover:ring-2 hover:ring-primary transition-all"
          >
            {user?.photoUrl ? (
              <div className="w-10 rounded-full">
                <img
                  alt="User Photo"
                  src={user.photoUrl}
                  className="object-cover"
                />
              </div>
            ) : (
              <div className="w-10 rounded-full bg-base-300 flex items-center justify-center">
                <User className="w-5 h-5 opacity-60" />
              </div>
            )}
          </div>
          <ul
            tabIndex={-1}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-56 p-2 shadow-xl border border-base-300"
          >
            <li className="menu-title px-2 pt-1 pb-2 text-xs opacity-60">
              {user ? `Signed in as ${user.firstName}` : "Not signed in"}
            </li>
            <li>
              <Link to="/profile" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Profile
                <span className="badge badge-primary badge-sm ml-auto">
                  New
                </span>
              </Link>
            </li>
            <li>
              <Link to="/settings" className="flex items-center gap-2">
                <Settings className="w-4 h-4" />
                Settings
              </Link>
            </li>
            <div className="divider my-1"></div>
            <li>
              <a
                onClick={handleLogout}
                className="flex items-center gap-2 text-error"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

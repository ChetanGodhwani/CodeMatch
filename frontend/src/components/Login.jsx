import { useState } from "react";
import axios from "axios";
import { Mail, Lock, Eye, EyeOff, User, Code2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data || "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {
      console.log(err);
      setError(
        err?.response?.data || "Something went wrong. Please try again.",
      );
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleLogin();
  };
  const inputClasses =
    "flex items-center gap-2 rounded-lg border-2 border-gray-400 bg-white px-3 py-2.5";

  return (
    <div className="min-h-[85vh] flex items-center justify-center px-4 py-10 bg-gradient-to-br from-base-200 via-base-100 to-base-200">
      <div className="w-full max-w-4xl grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-2xl border border-base-300 bg-base-100">
        {/* Left branding panel — hidden on mobile */}
        <div className="hidden md:flex flex-col justify-between bg-gradient-to-br from-primary to-secondary text-primary-content p-10 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-56 h-56 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute bottom-0 left-0 w-40 h-40 rounded-full bg-white/10 blur-2xl" />

          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-xl font-extrabold tracking-tight">
                DevTinder
              </span>
            </div>
            <h1 className="text-3xl font-extrabold leading-tight mb-3">
              Swipe. Match.
              <br />
              Ship together.
            </h1>
            <p className="text-primary-content/80 text-sm leading-relaxed max-w-xs">
              Find developers who match your stack, your energy, and your
              side-project ambitions.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap gap-2">
            {[
              "Html",
              "CSS",
              "Java",
              "JavaScript",
              "React",
              "Node",
              "MongoDB",
              "Express.js",
              "SQL",
              "And many more.....",
            ].map((tag) => (
              <span
                key={tag}
                className="badge badge-outline border-white/30 text-primary-content/90 text-xs py-3"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Form panel */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="p-8 sm:p-10 flex flex-col justify-center"
        >
          {/* Header (mobile-only logo since desktop has the left panel) */}
          <div className="mb-6">
            <h2 className="text-2xl font-extrabold md:hidden mb-1">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Dev
              </span>
              Tinder
            </h2>
            <h3 className="text-xl font-bold">
              {isLoginForm ? "Welcome back" : "Create your account"}
            </h3>
            <p className="text-sm text-base-content/60 mt-1">
              {isLoginForm
                ? "Log in to keep building"
                : "Join the feed — takes less than a minute"}
            </p>
          </div>

          <div className="flex flex-col gap-4" onKeyDown={handleKeyDown}>
            <AnimatePresence mode="popLayout">
              {!isLoginForm && (
                <motion.div
                  key="name-fields"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="flex flex-col gap-4 overflow-hidden"
                >
                  {/* First Name */}
                  <div className="flex flex-col gap-1">
                    <label className="label py-0" htmlFor="firstName">
                      <span className="label-text font-medium">First Name</span>
                    </label>
                    <label className={inputClasses} htmlFor="firstName">
                      <User className="w-4 h-4 opacity-50 shrink-0" />
                      <input
                        id="firstName"
                        type="text"
                        placeholder="Your Name"
                        className="grow bg-transparent outline-none"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                      />
                    </label>
                  </div>

                  {/* Last Name */}
                  <div className="flex flex-col gap-1">
                    <label className="label py-0" htmlFor="lastName">
                      <span className="label-text font-medium">Last Name</span>
                    </label>
                    <label className={inputClasses} htmlFor="lastName">
                      <User className="w-4 h-4 opacity-50 shrink-0" />
                      <input
                        id="lastName"
                        type="text"
                        placeholder="Your Last Name"
                        className="grow bg-transparent outline-none"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </label>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="label py-0" htmlFor="emailId">
                <span className="label-text font-medium">Email</span>
              </label>
              <label className={inputClasses} htmlFor="emailId">
                <Mail className="w-4 h-4 opacity-50 shrink-0" />
                <input
                  id="emailId"
                  type="email"
                  placeholder="you@example.com"
                  className="grow bg-transparent outline-none"
                  value={emailId}
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </label>
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="label py-0" htmlFor="password">
                <span className="label-text font-medium">Password</span>
              </label>
              <label className={inputClasses} htmlFor="password">
                <Lock className="w-4 h-4 opacity-50 shrink-0" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="grow bg-transparent outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="opacity-50 hover:opacity-100 shrink-0"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </label>
            </div>
          </div>

          {/* Error message */}
          <AnimatePresence>
            {error && (
              <motion.p
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-error text-sm text-center mt-3"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            className="btn btn-primary mt-5 shadow-md shadow-primary/30"
            onClick={isLoginForm ? handleLogin : handleSignUp}
            disabled={loading || !emailId || !password}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : isLoginForm ? (
              "Login"
            ) : (
              "Sign Up"
            )}
          </button>

          <div className="divider text-xs text-base-content/40">OR</div>

          <p
            className="text-center text-sm text-base-content/70 cursor-pointer hover:text-base-content transition-colors"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm ? (
              <>
                New here?{" "}
                <span className="link link-primary font-medium">
                  Sign up here
                </span>
              </>
            ) : (
              <>
                Existing user?{" "}
                <span className="link link-primary font-medium">
                  Login here
                </span>
              </>
            )}
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;

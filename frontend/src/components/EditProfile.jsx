import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import {
  User,
  Link2,
  Calendar,
  VenetianMask,
  FileText,
  Code2,
} from "lucide-react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [about, setAbout] = useState(user.about);
  const [skills, setSkills] = useState(
    Array.isArray(user.skills) ? user.skills.join(", ") : user.skills || "",
  );
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          photoUrl,
          age,
          gender,
          about,
          skills,
        },
        { withCredentials: true },
      );
      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="min-h-[85vh] flex flex-col lg:flex-row items-center justify-center gap-8 px-4 py-10">
        {/* Form */}
        <div className="card w-full max-w-md bg-base-100 shadow-xl border border-base-300">
          <div className="card-body">
            {/* Header */}
            <div className="text-center mb-2">
              <h2 className="text-2xl font-extrabold">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Dev
                </span>
                Tinder
              </h2>
              <p className="text-sm text-base-content/60 mt-1">
                Edit your profile
              </p>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              {/* First + Last name side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="label py-0" htmlFor="firstName">
                    <span className="label-text font-medium">First Name</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <User className="w-4 h-4 opacity-50" />
                    <input
                      id="firstName"
                      type="text"
                      placeholder="Elon"
                      className="grow"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="label py-0" htmlFor="lastName">
                    <span className="label-text font-medium">Last Name</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <input
                      id="lastName"
                      type="text"
                      placeholder="Musk"
                      className="grow"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              {/* Photo URL */}
              <div className="flex flex-col gap-1">
                <label className="label py-0" htmlFor="photoUrl">
                  <span className="label-text font-medium">Photo URL</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <Link2 className="w-4 h-4 opacity-50" />
                  <input
                    id="photoUrl"
                    type="text"
                    placeholder="https://example.com/photo.jpg"
                    className="grow"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </label>
              </div>

              {/* Age + Gender side by side */}
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-1">
                  <label className="label py-0" htmlFor="age">
                    <span className="label-text font-medium">Age</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <Calendar className="w-4 h-4 opacity-50" />
                    <input
                      id="age"
                      type="number"
                      placeholder="28"
                      className="grow"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </label>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="label py-0" htmlFor="gender">
                    <span className="label-text font-medium">Gender</span>
                  </label>
                  <label className="input input-bordered flex items-center gap-2">
                    <VenetianMask className="w-4 h-4 opacity-50" />
                    <select
                      id="gender"
                      className="grow bg-transparent focus:outline-none"
                      value={gender}
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>
              </div>

              {/* About */}
              <div className="flex flex-col gap-1">
                <label className="label py-0" htmlFor="about">
                  <span className="label-text font-medium">About</span>
                </label>
                <label className="textarea textarea-bordered flex items-start gap-2 py-2">
                  <FileText className="w-4 h-4 opacity-50 mt-1" />
                  <textarea
                    id="about"
                    placeholder="Tell other devs a bit about yourself..."
                    className="grow resize-none bg-transparent focus:outline-none"
                    rows={3}
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </label>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-1">
                <label className="label py-0" htmlFor="skills">
                  <span className="label-text font-medium">
                    Skills{" "}
                    <span className="opacity-50 font-normal">
                      (comma separated)
                    </span>
                  </span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <Code2 className="w-4 h-4 opacity-50" />
                  <input
                    id="skills"
                    type="text"
                    placeholder="React, Node.js, MongoDB"
                    className="grow"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                  />
                </label>
              </div>

              <button className="btn btn-primary mt-2" onClick={saveProfile}>
                Save Profile
              </button>
            </div>
          </div>
        </div>

        {/* Live preview — reuses your existing UserCard component */}
        <div className="hidden lg:flex flex-col items-center gap-3">
          <p className="text-xs font-semibold uppercase tracking-wide text-base-content/40">
            Live Preview
          </p>
          <UserCard
            user={{
              firstName,
              lastName,
              photoUrl,
              age,
              gender,
              about,
              skills: skills
                ? skills
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean)
                : [],
            }}
            hideActions
          />
        </div>
      </div>
      {showToast && (
        <div className="toast toast-top toast-center z-[100]">
          <div className="alert bg-base-100 border border-success/30 shadow-xl rounded-xl gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
            <CheckCircle2 className="w-5 h-5 text-success" />
            <span className="font-semibold text-sm">
              Profile updated successfully
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;

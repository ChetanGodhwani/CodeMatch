import axios from "axios";
import { X, Code2, MapPin } from "lucide-react";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ user, hideActions = false, onIgnore, onInterested }) => {
  const { _id, firstName, lastName, photoUrl, age, gender, about, skills } =
    user;
  const dispatch = useDispatch();

  const handleSendRequest = async (status, userId) => {
    try {
      await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
        { withCredentials: true },
      );
      dispatch(removeUserFromFeed(userId));
    } catch (err) {
      console.log(err);
    }
  };

  const handleIgnoreClick = () => {
    if (onIgnore) onIgnore();
    else handleSendRequest("ignored", _id);
  };

  const handleInterestedClick = () => {
    if (onInterested) onInterested();
    else handleSendRequest("interested", _id);
  };

  return (
    <div className="card w-96 bg-base-100 shadow-xl border border-base-300 overflow-hidden">
      {/* Photo with gradient overlay + name/age on top of image */}
      <figure className="relative h-96">
        <img
          src={photoUrl}
          alt={firstName}
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
          <h2 className="text-2xl font-bold flex items-baseline gap-2">
            {firstName} {lastName}
            {age && (
              <span className="text-lg font-normal opacity-90">{age}</span>
            )}
          </h2>
          {gender && (
            <p className="flex items-center gap-1 text-sm opacity-80 mt-1">
              <MapPin className="w-3.5 h-3.5" />
              {gender}
            </p>
          )}
        </div>
      </figure>

      <div className="card-body gap-4">
        {/* About */}
        {about && (
          <p className="text-sm text-base-content/70 leading-relaxed">
            {about}
          </p>
        )}

        {/* Skills */}
        {skills?.length > 0 && (
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wide text-base-content/50 mb-2">
              Skills
            </h3>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="badge badge-outline badge-primary font-medium"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        {!hideActions && (
          <div className="card-actions justify-center gap-6 mt-2">
            <button
              className="btn btn-circle btn-lg btn-outline btn-error hover:scale-110 transition-transform"
              onClick={handleIgnoreClick}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="btn btn-circle btn-lg btn-outline btn-success hover:scale-110 transition-transform"
              onClick={handleInterestedClick}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <Code2 className="w-6 h-6" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserCard;
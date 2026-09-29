import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";
import { MapPin, Inbox, X, Check } from "lucide-react";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true },
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-base-200 p-5 rounded-full mb-4">
          <Inbox className="w-10 h-10 text-base-content/40" />
        </div>
        <h2 className="text-xl font-bold">No pending requests</h2>
        <p className="text-base-content/60 text-sm mt-1 max-w-xs">
          When other developers want to connect with you, their requests will
          show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold">
          Pending{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Requests
          </span>
        </h1>
        <p className="text-base-content/60 text-sm mt-1">
          {requests.length} developer{requests.length !== 1 && "s"} want to
          connect with you
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.fromUserId;

          return (
            <div
              key={_id}
              className="flex items-center gap-4 p-4 rounded-xl bg-base-100 border border-base-300 shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
            >
              <img
                alt={firstName}
                className="w-16 h-16 rounded-full object-cover shrink-0 ring-2 ring-base-200"
                src={photoUrl}
              />

              <div className="flex-1 min-w-0 text-left">
                <h2 className="font-bold text-lg truncate">
                  {firstName} {lastName}
                </h2>
                {age && gender && (
                  <p className="flex items-center gap-1 text-xs text-base-content/50 mt-0.5">
                    <MapPin className="w-3 h-3" />
                    {age}, {gender}
                  </p>
                )}
                {about && (
                  <p className="text-sm text-base-content/70 mt-1 truncate">
                    {about}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  className="btn btn-circle btn-outline btn-error hover:scale-110 transition-transform"
                  title="Ignore"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  <X className="w-5 h-5" />
                </button>
                <button
                  className="btn btn-circle btn-primary hover:scale-110 transition-transform"
                  title="Accept"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  <Check className="w-5 h-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;

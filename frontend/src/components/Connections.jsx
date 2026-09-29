import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { MessageCircle, MapPin, Users } from "lucide-react";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (connections.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-base-200 p-5 rounded-full mb-4">
          <Users className="w-10 h-10 text-base-content/40" />
        </div>
        <h2 className="text-xl font-bold">No connections yet</h2>
        <p className="text-base-content/60 text-sm mt-1 max-w-xs">
          Once you match with other developers, they'll show up here.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold">
          Your{" "}
          <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Connections
          </span>
        </h1>
        <p className="text-base-content/60 text-sm mt-1">
          {connections.length} developer{connections.length !== 1 && "s"} you've matched with
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            connection;

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

              <button className="btn btn-primary btn-sm gap-2 shrink-0">
                <MessageCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Message</span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
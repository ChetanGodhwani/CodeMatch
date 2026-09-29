import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed, removeUserFromFeed } from "../utils/feedSlice";
import { useEffect, useRef } from "react";
import UserCard from "./UserCard";
import { Users } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import SwipeableCard from "./SwipeableCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const cardRefs = useRef({}); // { [userId]: SwipeableCard imperative handle }

  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", { withCredentials: true });
      dispatch(addFeed(res?.data));
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  const handleSwipe = async (status, userId) => {
    dispatch(removeUserFromFeed(userId)); // optimistic, feels instant
    delete cardRefs.current[userId]; // clean up so the map doesn't grow forever
    try {
      await axios.post(
        `${BASE_URL}/request/send/${status}/${userId}`,
        {},
        { withCredentials: true }
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!feed) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  if (feed.length <= 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="bg-base-200 p-5 rounded-full mb-4">
          <Users className="w-10 h-10 text-base-content/40" />
        </div>
        <h2 className="text-xl font-bold">You're all caught up</h2>
        <p className="text-base-content/60 text-sm mt-1 max-w-xs">
          No new developers to discover right now — check back later.
        </p>
      </div>
    );
  }

  const stack = [...feed.slice(0, 3)].reverse();
  const topUserId = feed[0]._id; // always the real current top, from Redux

  return (
    <div className="relative w-96 h-[36rem] mx-auto my-10">
      <AnimatePresence>
        {stack.map((user, idx, arr) => {
          const isTop = idx === arr.length - 1;
          return (
            <SwipeableCard
              key={user._id}
              ref={(el) => {
                if (el) cardRefs.current[user._id] = el;
                else delete cardRefs.current[user._id];
              }}
              isTop={isTop}
              onSwipe={(status) => handleSwipe(status, user._id)}
            >
              <UserCard
                user={user}
                hideActions={!isTop}
                onIgnore={() => cardRefs.current[topUserId]?.swipe("ignored")}
                onInterested={() => cardRefs.current[topUserId]?.swipe("interested")}
              />
            </SwipeableCard>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

export default Feed;
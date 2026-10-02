const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");

cron.schedule(
  "0 8 * * *",
  async () => {
    try {
      const yesterday = subDays(new Date(), 1);

      const yesterdayStart = startOfDay(yesterday);
      const yesterdayEnd = endOfDay(yesterday);

      const pendingRequests = await ConnectionRequestModel.find({
        status: "interested",
        createdAt: { $gte: yesterdayStart, $lt: yesterdayEnd },
      }).populate("fromUserId toUserId");

      const listOfEmails = [
        ...new Set(pendingRequests.map((req) => req.toUserId.emailId)),
      ];

      for (const email of listOfEmails) {
        try {
          const res = await sendEmail.run(
            "You have connection requests waiting for you!",
            "You have some pending connection requests on CodeMatch. Log in to see who is interested in connecting with you and accept or reject the requests.",
          );

          console.log(res);
        } catch (err) {
          console.log(err.message);
        }
      }
    } catch (err) {
      console.log(err.message);
    }
  },
  {
    timezone: "Asia/Kolkata",
  },
);
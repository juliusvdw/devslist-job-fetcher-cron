const CronJob = require("cron").CronJob;

const getJobs = require("./getJobs");

//Create Cron Job to fetch jobs every 2 hours
const jobCron = new CronJob(
  "0 */2 * * *",
  () => {
    getJobs();
  },
  null,
  true,
  "America/Los_Angeles"
);

module.exports = jobCron;

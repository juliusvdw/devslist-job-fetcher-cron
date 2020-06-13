const axios = require("axios");
const Parser = require("rss-parser");
const parser = new Parser();

//Import model
const Job = require("../models/Job");

//Get stackOverflow Jobs
const getStackJobs = async () => {
  try {
    let feed = await parser.parseURL(
      "http://stackoverflow.com/jobs/feed?r=true&ms=Junior&mxs=Manager"
    );

    let jobs = [...feed.items];
    jobs = jobs.slice(0, 200);

    let job = {};

    jobs.forEach(async (jobItem) => {
      //see whether job exists in the db
      const doesExist = await Job.findOne({ id: jobItem.guid });

      if (doesExist === null) {
        // //manipulate title
        let title = jobItem.title.split(" ").slice(0, 6).join(" ");
        if (title.length > 40) {
          title = `${title.slice(0, 40)}...`;
        }

        // //manipulate company name by taking the part after 'at' in the title
        let sliceIndex = jobItem.title.split(" ").indexOf("at");
        let company = jobItem.title
          .split(" ")
          .slice(sliceIndex + 1)
          .join(" ");
        company = company.split("()").join(" ");

        //add to categories
        let categories = [...jobItem.categories];
        const keys = title.toLowerCase().split(" ");
        keys.forEach((word) => {
          if (word === "senior" || word === "junior" || word === "devops") {
            if (categories.indexOf(word) === -1) {
              categories.push(word);
            }
          }
        });

        //Create Job to be added to db
        job = {
          title: title,
          description: jobItem.content,
          company: company,
          date: jobItem.isoDate,
          link: jobItem.link,
          categories: categories,
          id: jobItem.guid,
          source: "www.stackoverflow.com",
        };

        await Job.create(job);
      } else {
        console.log("Job already exists");
      }
    });
    console.log("Stack Overflow jobs added");
  } catch (err) {
    console.log(err.message);
  }
};

//get Remotive jobs
const getRemotiveJobs = async () => {
  try {
    let feed = await axios.get(
      "https://remotive.io/api/remote-jobs?category=software-dev&limit=200"
    );
    let jobs = await feed.data.jobs;

    let job = {};

    jobs.forEach(async (jobItem) => {
      //see whether job exists in db
      const doesExist = await Job.findOne({ id: jobItem.id });

      if (doesExist === null) {
        //add to key tags to categories
        let categories = [...jobItem.tags];
        const keys = jobItem.title.toLowerCase().split(" ");
        keys.forEach((word) => {
          if (word === "senior" || word === "junior" || word === "devops") {
            if (categories.indexOf(word) === -1) {
              categories.push(word);
            }
          }
        });

        //create job to add to the db
        job = {
          title: jobItem.title,
          description: jobItem.description,
          company: jobItem.company_name,
          date: jobItem.publication_date,
          link: jobItem.url,
          categories: categories,
          id: String(jobItem.id),
          source: "www.remotive.io",
        };

        await Job.create(job);
      } else {
        console.log("Job already exists");
      }
    });
    console.log("Remotive Jobs added");
  } catch (err) {
    console.log(err.message);
  }
};

//Get WWR jobs
const getWwrJobs = async () => {
  try {
    let feed = await parser.parseURL(
      "https://weworkremotely.com/categories/remote-programming-jobs.rss"
    );

    let jobs = [...feed.items];
    let job = {};

    jobs.forEach(async (jobItem) => {
      //see whether job exists in the db
      const doesExist = await Job.findOne({ id: jobItem.guid });

      if (doesExist === null) {
        //manipulate company name
        let company = jobItem.title.slice(0, jobItem.title.indexOf(":"));

        //manipulate title
        let title = jobItem.title.slice(jobItem.title.indexOf(":") + 1);

        //add key tags to categories
        let categories = [];
        const keys = jobItem.content.toLowerCase().split(" ");
        keys.forEach((word) => {
          if (
            word === "javascript" ||
            word === "java" ||
            word === "ui" ||
            word === "ux" ||
            word === "python" ||
            word === "laravel" ||
            word === "senior" ||
            word === "junior" ||
            word === "php" ||
            word === "machine" ||
            word === "data" ||
            word === "engineer" ||
            word === "systems " ||
            word === "react" ||
            word === "node" ||
            word === "remote" ||
            word === "html" ||
            word === "css" ||
            word === "typescript" ||
            word === "applications" ||
            word === "websites" ||
            word === "security" ||
            word === "financial" ||
            word === "mobile" ||
            word === "ios" ||
            word === "android" ||
            word === "ruby" ||
            word === "django" ||
            word === "mysql" ||
            word === "nosql" ||
            word === "developer"
          ) {
            if (categories.indexOf(word) === -1) {
              categories.push(word);
            }
          }
        });

        //Create Job to be added to db
        job = {
          title: title,
          description: jobItem.content,
          categories: categories,
          company: company,
          date: jobItem.isoDate,
          link: jobItem.link,
          id: jobItem.guid,
          source: "www.weworkremotely.com",
        };

        await Job.create(job);
      } else {
        console.log("Job already exists");
      }
    });
    console.log("WWR  jobs added");
  } catch (err) {
    console.log(err.message);
  }
};

const getCareerJetJobs = async () => {
  try {
    let feed = await parser.parseURL(
      "http://rss.careerjet.co.za/rss?s=remote%20software%20developer&l=USA&lid=55&affid=5f40a472a5571bc359c2e6bbf51b2f4b&psz=50&snl=500"
    );

    let jobs = [...feed.items];

    let job = {};

    jobs.forEach(async (jobItem) => {
      //see whether job exists in the db
      const doesExist = await Job.findOne({ id: jobItem.guid });

      if (doesExist === null) {
        // //manipulate title
        let title = jobItem.title.split(" ").slice(0, 6).join(" ");
        if (title.length > 40) {
          title = `${title.slice(0, 40)}...`;
        }

        // //manipulate company name by taking the part after 'at' in the title
        let company = jobItem.content.slice(0, jobItem.content.indexOf("-"));

        //add key tags to categories
        let categories = [];
        const keys = jobItem.content.toLowerCase().split(" ");
        keys.forEach((word) => {
          if (
            word === "javascript" ||
            word === "java" ||
            word === "ui" ||
            word === "ux" ||
            word === "python" ||
            word === "laravel" ||
            word === "mongodb" ||
            word === "mongo" ||
            word === "microservices" ||
            word === "senior" ||
            word === "junior" ||
            word === "php" ||
            word === "machine" ||
            word === "data" ||
            word === "engineer" ||
            word === "systems " ||
            word === "react" ||
            word === "node" ||
            word === "remote" ||
            word === "html" ||
            word === "css" ||
            word === "typescript" ||
            word === "applications" ||
            word === "websites" ||
            word === "security" ||
            word === "financia" ||
            word === "mobile" ||
            word === "ios" ||
            word === "android" ||
            word === "ruby" ||
            word === "django" ||
            word === "mysql" ||
            word === "nosql" ||
            word === "developer"
          ) {
            if (categories.indexOf(word) === -1) {
              categories.push(word);
            }
          }
        });

        //Create Job to be added to db
        job = {
          title: title,
          description: jobItem.content,
          company: company,
          date: jobItem.isoDate,
          link: jobItem.link,
          categories: categories,
          id: jobItem.guid,
          source: "www.careerjet.com",
        };

        await Job.create(job);
      } else {
        console.log("Job already exists");
      }
    });
    console.log("careerJet jobs added");
  } catch (err) {
    console.log(err.message);
  }
};

//create and export getJobs funciton

const getJobs = async () => {
  try {
    await getStackJobs();
    await getRemotiveJobs();
    await getWwrJobs();
    await getCareerJetJobs();
  } catch (err) {
    console.log(err);
  }
  console.log("jobs added");
};

module.exports = getJobs;

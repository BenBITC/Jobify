import { StatusCodes } from "http-status-codes";
import JobModel from "../models/JobModel.js";
import mongoose from "mongoose";
import day from "dayjs";
import { JOB_SORT_BY } from "../utils/constants.js";

export const getAllJobs = async (req, res) => {
  const { search, jobStatus, jobType, sort } = req.query;

  // Generate Query Criteria
  const queryObject = {
    createdBy: req.user.userId,
  };
  if (search) {
    queryObject.$or = [
      { position: { $regex: search, $options: "i" } },
      { company: { $regex: search, $options: "i" } },
    ];
  }
  if (jobStatus && jobStatus !== "All") {
    queryObject.jobStatus = jobStatus;
  }
  if (jobType && jobType !== "All") {
    queryObject.jobType = jobType;
  }

  // Apply Sorting and Pagination
  const sortOptions = {
    [JOB_SORT_BY.NEWEST_FIRST]: "-createdAt",
    [JOB_SORT_BY.OLDEST_FIRST]: "createdAt",
    [JOB_SORT_BY.ASCENDING_POSITION]: "position",
    [JOB_SORT_BY.DESCENDING_POSITION]: "-position",
    [JOB_SORT_BY.ASCENDING_COMPANY]: "company",
    [JOB_SORT_BY.DESCENDING_COMPANY]: "-company",
  };
  const sortKey = sortOptions[sort] || sortOptions[JOB_SORT_BY.NEWEST_FIRST];

  const page = Number(req.query.page) || 1;
  const pageLimit = Number(req.query.pageLimit) || 10;
  const skippedResults = (page - 1) * pageLimit;

  // Send Query to database and return the result
  const jobs = await JobModel.find(queryObject)
    .sort(sortKey)
    .skip(skippedResults)
    .limit(pageLimit);

  const totalJobs = await JobModel.countDocuments(queryObject);
  const totalPages = Math.ceil(totalJobs / pageLimit);

  res
    .status(StatusCodes.OK)
    .json({ totalJobs, totalPages, currentPage: page, jobs });
};

export const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await JobModel.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

export const getJob = async (req, res) => {
  const job = await JobModel.findById(req.params.id);
  res.status(StatusCodes.OK).json({ job });
};

export const updateJob = async (req, res) => {
  const updatedJob = await JobModel.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(StatusCodes.OK).json({ message: `Job modified`, updatedJob });
};

export const deleteJob = async (req, res) => {
  const removedJob = await JobModel.findByIdAndDelete(req.params.id);
  res.status(StatusCodes.OK).json({ message: `Job deleted`, job: removedJob });
};

export const showStats = async (req, res) => {
  // Collect totals by Status
  let stats = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    { $group: { _id: "$jobStatus", count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((accumulated, current) => {
    const { _id: title, count } = current;
    accumulated[title] = count;
    return accumulated;
  }, {});

  const statusStats = {
    Pending: stats.Pending || 0,
    Interview: stats.Interview || 0,
    Declined: stats.Declined || 0,
  };

  // Collect totals by Month

  let monthlyStats = await JobModel.aggregate([
    { $match: { createdBy: new mongoose.Types.ObjectId(req.user.userId) } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        count: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": -1, "_id.month": -1 } },
    { $limit: 6 },
  ]);

  monthlyStats = monthlyStats
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;

      const date = day()
        .month(month - 1)
        .year(year)
        .format("MMM YY");

      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ statusStats, monthlyStats });
};

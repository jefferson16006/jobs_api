const Job = require('../models/Jobs')
const { StatusCodes } = require('http-status-codes')
const { NotFoundError, BadRequestError } = require('../errors')

const getAllJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.user.userID }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs, count: jobs.length })
}
const getJob = async (req, res) => {
    const {user:{ userID }, params:{ id: jobID }} = req
    const job = await Job.findOne({
        _id: jobID,
        createdBy: userID
    })
    if(!job){
        throw new NotFoundError(`No job with id ${ jobID } was found.`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const createJob = async (req, res) => {
    req.body.createdBy = req.user.userID
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
const updateJob = async (req, res) => {
    const { 
        body: { company, postion },
        user: { userID },
        params: { id: jobID } 
    } = req
    if(company === '' || postion === '') {
        throw new BadRequestError('Company or Positon cannot be empty.')
    }
    const job = await Job.findByIdAndUpdate({ _id: jobID, createdBy: userID}, req.body, {
        new: true,
        runValidators: true
    })
    if(!job) {
        throw new NotFoundError(`No job with id ${ jobID } was found.`)
    }
    res.status(StatusCodes.OK).json({ job })
}
const deleteJob = async (req, res) => {
    const {user:{ userID }, params:{ id: jobID }} = req
    const deleteJob = await Job.findByIdAndDelete({ _id: jobID, createdBy: userID })
    if(!deleteJob) {
        throw new NotFoundError(`No job with id ${ jobID } was found.`)
    }
    const jobs = await Job.find({ createdBy: userID }).sort('createdAt')
    res.status(StatusCodes.OK).json({ jobs })
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob
}
import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req,res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;

        if(!jobId)
        {
            return res.status(400).json({
                message:"Job id is required",
                success:false
            })
        }
        //check if the user has already applied for the job
        const exitingApplication = await Application.findOne({job:jobId,applicant:userId})
        if(exitingApplication)
        {
            return res.status(400).json({
                message:"You have already applied for this job",
                success:false
            })
        }

        //check if the job exists
        const job = await Job.findById(jobId);
        if(!job){
            return res.status(400).json({
                message:"Job not found",
                success:false
            })
        }

        //create the application
        const newApplication = await Application.create({
            job:jobId,
            applicant:userId
        })
        
        job.application.push(newApplication._id);

        await job.save();

        return res.status(201).json({
            message:"Application applied successfully",
            success:true,
            application:newApplication
        })
     }
      catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

// get all applicatin appliped by user
export const getAppliedJobs = async (req,res) => {
    try {
       const userId =  req.id;
       const applications = await Application.find({applicant:userId}).populate({
        path:'job',
        options:{
            sort:{
                createdAt:-1
            }
        },populate:{
            path:'company',
            options:{
                sort:{
                    createdAt:-1
                }
            }
        } 
       })

       if(!applications || applications.length === 0){
        return res.status(400).json({
            message:"No applications found",
            success:false
        })
       }

        return res.status(200).json({
          message:"Applications found",
          success:true,
          applications
         })
        }
         catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
    }
}

//how many people applied for this job view by admin
export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;

        const job = await Job.findById(jobId).populate({
          path: "application",
          options: { sort: { createdAt: -1 } },
          populate: {
            path: "applicant",
          },
        });

        if(!job){
            return res.status(400).json({
                message:"No job found",
                success:false
            })
        };

        return res.status(200).json({
            message:"job found",
            job,
            success:true
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })
        
    }
}

// status update by admin
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status ){
            return res.status(400).json({
                message:"Status is required",
                success:false
            })
        }

        const application = await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(400).json({
                message:"Application not found",
                success:false
            })
        }

        //update status
        application.status = status;
        await application.save();

        return res.status(200).json({
            message:"Status updated successfully",
            success:true,
            application
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message:"Internal server error",
            success:false
        })   
    }
}


import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloundinary from "../utils/cloundinary.js";

// register company
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({
        message: "company name is required",
        status: false,
      });
    }

    let company = await Company.findOne({ name: companyName });
    if (company) {
      return res.status(400).json({
        message: "you can't register same company",
        success: false,
      });
    }

    company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company,
      status: true,
    });
  } catch (error) {
    console.log(error);
  }
};

//get the company of logged in user
export const getCompany = async (req, res) => {
  try {
    const userId = req.id; 
    const companies = await Company.find({ userId });


    if (companies.length === 0) {
      return res.status(400).json({
        message: "company not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "company found",
      companies,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};

//get company by id
export const getCompanyById = async (req, res) => {
  try {
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({
        message: "company not found",
        status: false,
      });
    }

    return res.status(200).json({
      message: "company found",
      company,
      status: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      status: false,
    });
  }
};

//update company
export const updateCompany = async (req, res) => {
  try {
    const { name, description, website, location } = req.body;

    // Check if a different company already uses the new name
    const existingCompany = await Company.findOne({ name });
    if (existingCompany && existingCompany._id.toString() !== req.params.id) {
      return res.status(400).json({
        success: false,
        message: "A company with this name already exists.",
      });
    }

    let logo;

    // Only upload to Cloudinary if a new file is provided
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloundinary.uploader.upload(fileUri.content, {
        resource_type: "auto",
      });
      logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, website, location };
    if (logo) updateData.logo = logo;

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, {
      new: true,
    });

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Company information updated.",
      company,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: `Duplicate value: ${Object.keys(error.keyPattern)[0]}`,
      });
    }
    console.error("Update company error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
import brandModel from "../../../DB/models/brand.model.js";
import AppError from "../../utils/services/AppError.js";
import { asyncHandler } from "../../utils/middleware/catchAsyncError.js";
import slugify from "slugify";
import deleteOne from "../../utils/handlers/refactor.handler.js";
import ApiFeature from "../../utils/ApiFeatures.js";

export const createBrand = asyncHandler(async (req, res, next) => {
  const { name, category, subCategory } = req.body;
  let result = new brandModel({
    name,
    slug: slugify(name),
    logo: req.file.filename,
    category,
    subCategory,
  });
  let added = await result.save();
  res.status(201).json({ message: "Done", added });
});

export const getAllBrands = asyncHandler(async (req, res, next) => {
  let apiFeature = new ApiFeature(brandModel.find(), req.query)
    .pagination()
    .sort()
    .search()
    .fields();
  let result = await apiFeature.mongooseQuery;
  res.json({ message: "Done", page: apiFeature.page, result });
});

export const getBrandById = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  let result = await brandModel.findById(id);
  !result && next(new AppError(`brand not found`, 404));
  result && res.json({ message: "Done", result });
});

export const updateBrand = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  console.log(req.body);
  const { name } = req.body;
  if (name) req.body.slug = slugify(name);
  if (req.file) req.file.logo = req.file.filename;

  let result = await brandModel.findByIdAndUpdate(id, req.body, { new: true });
  !result && next(new AppError(`brand not found`, 404));
  result && res.json({ message: "Done", result });
});
export const deleteBrand = deleteOne(brandModel);

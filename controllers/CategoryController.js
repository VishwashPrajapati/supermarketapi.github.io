const Category = require("../models/categoryModel");
const AppError = require("./AppError");
const catchAsync = require("./CatchAsync");

exports.addCategory = catchAsync(async (req, res, next) => {
  const findCat = await Category.find({ name: req.body.name });
  if (!req.body.name) {
    return next(new AppError("Name should not be emplty...!", 404));
  }
  if (findCat.length !== 0) {
    return next(new AppError("Category Already Exist...!", 400));
  }
  const categoryData = await Category.create({
    name: req.body.name,
    active: req.body.active,
  });
  res.json({ data: categoryData, message: "created" });
});

exports.getAllCategory = async (req, res, next) => {
  const categoryData = await Category.find();
  res.json({
    Data: categoryData,
    message: "All Category List...!",
  });
};

exports.getCategory = async (req, res, next) => {
  const categoryData = await Category.findById(req.params.id);
  res.json({
    Data: categoryData,
    message: "Successfull...!",
  });
};

exports.deleteCategory = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please select valid category...!", 404));
  }
  await Category.deleteOne({ _id: req.params.id });
  res.json({ message: "Category Deleted...!" });
});

exports.editCategory = catchAsync(async (req, res, next) => {
  if (!req.params.id) {
    return next(new AppError("Please select valid category...!", 404));
  }
  await Category.findByIdAndUpdate({ _id: req.params.id }, req.body);
  res.json({ message: "Category Updated...!" });
});

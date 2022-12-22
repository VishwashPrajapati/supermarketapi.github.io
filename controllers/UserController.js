exports.getAllUser = async (req, res, next) => {
  let data = await Date();

  return res.json({
    API: data,
    message: "respond with a resource",
  });
};

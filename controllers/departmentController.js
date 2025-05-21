import Department from "../models/Department.js";

const getDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    return res.status(200).json({ success: true, departments });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Get Department server error" });
  }
};

const addDepartment = async (req, res) => {
  try {
    const { deptName, description } = req.body;
    const newDep = Department({
      deptName: deptName,
      description: description,
    });
    await newDep.save();
    return res.status(200).json({ success: true, department: newDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Add department server error" });
  }
};

const getDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const department = await Department.findById({ _id: id });
    return res.status(200).json({ success: true, department });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Edit Department server error" });
  }
};

const updateDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const { deptName, description } = req.body;
    const updateDep = await Department.findByIdAndUpdate(
      { _id: id },
      {
        deptName,
        description,
      }
    );
    return res.status(200).json({ success: true, updateDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Update Department server error" });
  }
};

const deleteDepartment = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteDep = await Department.findByIdAndDelete({ _id: id });
    return res.status(200).json({ success: true, updateDep: deleteDep });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, error: "Delete Department server error" });
  }
};

export {
  addDepartment,
  getDepartments,
  getDepartment,
  updateDepartment,
  deleteDepartment,
};

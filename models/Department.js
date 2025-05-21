import mongoose from "mongoose";
import Employee from "./Employee.js";
import Leave from "./LeaveModal.js";
import Salary from "./SalaryModal.js";

const departmentSchema = new mongoose.Schema({
  deptName: { type: String, required: true },
  description: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

departmentSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    try {
      const employees = await Employee.find({ department: this._id });
      const empIDs = employees.map((emp) => emp._id);

      await Employee.deleteMany({ department: this._id });
      await Leave.deleteMany({ employeeId: { $in: empIDs } });
      await Salary.deleteMany({ employeeId: { $in: empIDs } });
      next();
    } catch (error) {
      next(error);
    }
  }
);

const Department =
  mongoose.models.Department || mongoose.model("Department", departmentSchema);

export default Department;

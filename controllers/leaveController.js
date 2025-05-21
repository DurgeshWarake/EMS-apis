import Employee from "../models/Employee.js";
import Leave from "../models/LeaveModal.js";

const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;
    const employee = await Employee.findOne({ userId });
    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason,
    });
    await newLeave.save();
    return res.status(200).json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: "Leave Add server error" });
  }
};

const getLeave = async (req, res) => {
  try {
    const { id, role } = req.params;
    let leaves;
    if (role === "admin") {
      leaves = await Leave.find({ employeeId: id });
    } else {
      const employee = await Employee.findOne({ userId: id });
      leaves = await Leave.find({ employeeId: employee._id });
    }

    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: "Leave Fetch server error" });
  }
};

const getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find().populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "deptName" },
        {
          path: "userId",
          select: "name",
        },
      ],
    });
    return res.status(200).json({ success: true, leaves });
  } catch (error) {
    res.status(500).json({ success: false, error: "Leave Fetch server error" });
  }
};

const getLeaveDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findById({ _id: id }).populate({
      path: "employeeId",
      populate: [
        { path: "department", select: "deptName" },
        {
          path: "userId",
          select: "name profileIamge",
        },
      ],
    });
    return res.status(200).json({ success: true, leave });
  } catch (error) {
    res.status(500).json({ success: false, error: "Leave details server error" });
  }
};

const updateLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const leave = await Leave.findByIdAndUpdate(
      { _id: id },
      { status: req.body.status }
    );

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Update Leave server error" });
  }
};

export { addLeave, getLeave, getLeaves, getLeaveDetails, updateLeave };

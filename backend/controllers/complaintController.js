const Complaint = require('../models/Complaint');

exports.createComplaint = async (req, res) => {
  try {
    const { subject, description } = req.body;
    const complaint = await Complaint.create({
      user_id: req.user.id,
      subject,
      description,
    });
    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.findByUserId(req.user.id);
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateComplaint = async (req, res) => {
  try {
    const updatedComplaint = await Complaint.update(req.params.id, {
      status: req.body.status
    });
    if (updatedComplaint) {
      res.json(updatedComplaint);
    } else {
      res.status(404).json({ message: 'Complaint not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
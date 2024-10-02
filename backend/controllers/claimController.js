const Claim = require('../models/Claim');

exports.createClaim = async (req, res) => {
  try {
    const { service, amount, date } = req.body;
    const claim = await Claim.create({
      patient_id: req.user.id,
      service,
      amount,
      date,
      status: 'pending'
    });
    res.status(201).json(claim);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getClaims = async (req, res) => {
  try {
    const claims = await Claim.findByUserId(req.user.id);
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateClaim = async (req, res) => {
  try {
    const claim = await Claim.findById(req.params.id);
    if (claim) {
      const updatedClaim = await Claim.update(req.params.id, {
        status: req.body.status || claim.status,
      });
      res.json(updatedClaim);
    } else {
      res.status(404).json({ message: 'Claim not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
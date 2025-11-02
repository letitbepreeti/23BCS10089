const express = require('express');
const { v4: uuidv4 } = require('uuid');
const seats = require('./seats');

const app = express();
app.use(express.json());

// Get all seats
app.get('/seats', (req, res) => {
  res.json(seats);
});

// Lock a seat
app.post('/lock/:id', (req, res) => {
  const seatId = req.params.id;
  const userId = req.body.userId || uuidv4(); // unique user
  const seat = seats[seatId];

  if (!seat) {
    return res.status(404).json({ message: 'Seat not found' });
  }

  if (seat.status === 'booked') {
    return res.status(400).json({ message: 'Seat already booked' });
  }

  if (seat.status === 'locked') {
    return res.status(400).json({ message: 'Seat currently locked by another user' });
  }

  seat.status = 'locked';
  seat.lockedBy = userId;
  seat.lockTime = Date.now();

  res.json({
    message: `Seat ${seatId} locked successfully`,
    userId,
    expiresIn: '1 minute'
  });
});

// Confirm a seat booking
app.post('/confirm/:id', (req, res) => {
  const seatId = req.params.id;
  const userId = req.body.userId;
  const seat = seats[seatId];

  if (!seat) {
    return res.status(404).json({ message: 'Seat not found' });
  }

  if (seat.status === 'booked') {
    return res.status(400).json({ message: 'Seat already booked' });
  }

  if (seat.status !== 'locked' || seat.lockedBy !== userId) {
    return res.status(400).json({ message: 'You must lock the seat before confirming' });
  }

  seat.status = 'booked';
  seat.lockedBy = null;
  seat.lockTime = null;

  res.json({ message: `Seat ${seatId} successfully booked` });
});

// Cancel a locked seat
app.post('/cancel/:id', (req, res) => {
  const seatId = req.params.id;
  const userId = req.body.userId;
  const seat = seats[seatId];

  if (!seat) {
    return res.status(404).json({ message: 'Seat not found' });
  }

  if (seat.status !== 'locked' || seat.lockedBy !== userId) {
    return res.status(400).json({ message: 'You can only cancel your own locked seat' });
  }

  seat.status = 'available';
  seat.lockedBy = null;
  seat.lockTime = null;

  res.json({ message: `Seat ${seatId} lock cancelled successfully` });
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

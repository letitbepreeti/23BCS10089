const seats = {};

// Initialize 10 seats as available
for (let i = 1; i <= 10; i++) {
  seats[i] = {
    status: 'available',
    lockedBy: null,
    lockTime: null
  };
}

// Lock timeout in milliseconds (1 minute)
const LOCK_TIMEOUT = 60 * 1000;

// Function to automatically release expired locks
function clearExpiredLocks() {
  const now = Date.now();
  for (const id in seats) {
    const seat = seats[id];
    if (seat.status === 'locked' && seat.lockTime && now - seat.lockTime > LOCK_TIMEOUT) {
      seat.status = 'available';
      seat.lockedBy = null;
      seat.lockTime = null;
    }
  }
}

setInterval(clearExpiredLocks, 5000); // check every 5 seconds

module.exports = seats;

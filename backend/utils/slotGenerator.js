const dayjs = require('dayjs');
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);

function generateSlots({
  startTime,
  endTime,
  chunkMinutes,
  timezone = 'UTC',
  bufferMinutes = 0
}) {
  const format = 'hh:mm A'; // Time format
  const slots = [];

  // Validate inputs
  if (!startTime || !endTime || !chunkMinutes) {
    console.error('Invalid inputs:', { startTime, endTime, chunkMinutes });
    return slots;
  }

  // Parse start and end times
  let start = dayjs(`2000-01-01 ${startTime}`, `YYYY-MM-DD ${format}`);
  let end = dayjs(`2000-01-01 ${endTime}`, `YYYY-MM-DD ${format}`);

  // Check if parsing was successful
  if (!start.isValid() || !end.isValid()) {
    console.error('Invalid time format:', { startTime, endTime });
    return slots;
  }

  // Adjust if end time is before start time (spans midnight)
  if (end.isBefore(start)) {
    end = end.add(1, 'day');
  }

  // Generate slots
  while (start.add(chunkMinutes, 'minute').isSameOrBefore(end)) {
    const slotEnd = start.add(chunkMinutes, 'minute');

    // Create slot object
    const slot = {
      label: `${start.format(format)} - ${slotEnd.format(format)}`,
      start: start.format(format),
      end: slotEnd.format(format),
      available: true
    };

    // console.log("from slot generator", slot); // Debug each slot

    slots.push(slot);

    // Move to next slot start time (including buffer if specified)
    start = slotEnd.add(bufferMinutes, 'minute');
  }

  return slots;
}

module.exports = generateSlots;
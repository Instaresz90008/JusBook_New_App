
const DaySelectionHeader = ({ showCurrentWeek, showNextWeek }: { showCurrentWeek: boolean, showNextWeek: boolean }) => {
  return (
    <div className="flex items-center mb-4 border-b pb-2">
      <div className="w-32 font-medium">Day</div>
      {showCurrentWeek && <div className="flex-1 text-center font-medium">Current Week</div>}
      {showNextWeek && <div className="flex-1 text-center font-medium">Next Week</div>}
      {showCurrentWeek && showNextWeek && <div className="flex-1 text-center font-medium">Both</div>}
    </div>
  );
};

export default DaySelectionHeader;

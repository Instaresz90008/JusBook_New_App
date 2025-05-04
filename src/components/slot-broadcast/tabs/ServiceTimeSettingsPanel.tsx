
// import { useSlotStore } from "@/store/slotStore";
// import SlotServicePanel from "@/components/slot-broadcast/slot-creation/SlotServicePanel";
// import { logger } from "@/utils/logger";

// const ServiceTimeSettingsPanel = () => {
//   const { 
//     service, setService,
//     serviceCost, setServiceCost,
//     startTime, setStartTime,
//     endTime, setEndTime,
//     duration, setDuration
//   } = useSlotStore();

//   logger.debug('ServiceTimeSettingsPanel rendered', { 
//     module: 'components',
//     data: { service, startTime, endTime }
//   });

//   return (
//     <div className="bg-white border rounded-lg p-6">
//       <h3 className="text-lg font-medium mb-4">Service & Time Settings</h3>
//       <SlotServicePanel
//         service={service}
//         setService={setService}
//         serviceCost={serviceCost}
//         setServiceCost={setServiceCost}
//         startTime={startTime}
//         setStartTime={setStartTime}
//         endTime={endTime}
//         setEndTime={setEndTime}
//         duration={duration}
//         setDuration={setDuration}
//       />
//     </div>
//   );
// };

// export default ServiceTimeSettingsPanel;


import { useSlotStore } from "@/store/slotStore";
import SlotServicePanel from "@/components/slot-broadcast/slot-creation/SlotServicePanel";
import { logger } from "@/utils/logger";

const ServiceTimeSettingsPanel = () => {
  const { 
    service, setService,
    serviceCost, setServiceCost,
    startTime, setStartTime,
    endTime, setEndTime,
    duration, setDuration
  } = useSlotStore();

  logger.debug('ServiceTimeSettingsPanel rendered', { 
    module: 'components',
    data: { service, startTime, endTime }
  });

  return (
    <div className="bg-white border rounded-lg p-6">
      <h3 className="text-lg font-medium mb-4">Service & Time Settings</h3>
      <SlotServicePanel
        service={service}
        setService={setService}
        serviceCost={serviceCost}
        setServiceCost={setServiceCost}
        startTime={startTime}
        setStartTime={setStartTime}
        endTime={endTime}
        setEndTime={setEndTime}
        duration={duration}
        setDuration={setDuration}
      />
    </div>
  );
};

export default ServiceTimeSettingsPanel;

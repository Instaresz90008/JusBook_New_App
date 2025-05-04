import { useState, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import SlotSummaryDialog from "@/components/slot-broadcast/slot-creation/SlotSummaryDialog";
import SlotBroadcastHeader from "@/components/slot-broadcast/SlotBroadcastHeader";
import SlotBroadcastTabs from "@/components/slot-broadcast/SlotBroadcastTabs";
import ManageTabContent from "@/components/slot-broadcast/tabs/ManageTabContent";
import { useSlotStore } from "@/store/slotStore";
import { logger } from "@/utils/logger";

const SlotBroadcast = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("manage");
  
  // Use the Zustand store
  const {
    service,
    startTime,
    endTime,
    duration,
    serviceCost,
    showSummaryDialog,
    setShowSummaryDialog,
    slotSummary
  } = useSlotStore();
  
  // Generate unique sharable link
  const [sharableLink, setSharableLink] = useState("");
  
  useEffect(() => {
    // Log page view
    logger.trackEvent('page_view', { page: 'SlotBroadcast' });
    
    // Generate a unique link when service changes
    setSharableLink(`book-${service.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 8)}`);
  }, [service]);
  
  const copyToClipboard = () => {
    const link = `https://jusbook.com/${sharableLink}`;
    navigator.clipboard.writeText(link);
    
    logger.trackEvent('link_copied', { service });
    
    toast({
      title: "Link Copied!",
      description: "Booking link has been copied to clipboard.",
    });
  };
  
  return (
    <Layout title="Slot Broadcast">
      <div className="max-w-7xl mx-auto overflow-auto">
        <SlotBroadcastHeader 
          copyToClipboard={copyToClipboard} 
          setActiveTab={setActiveTab} 
        />
        
        <SlotBroadcastTabs
          activeTab={activeTab}
          setActiveTab={(tab) => {
            logger.trackEvent('tab_changed', { from: activeTab, to: tab });
            setActiveTab(tab);
          }}
          manageTabContent={<ManageTabContent />}
        />
      </div>
      
      {/* Summary Dialog after Save & Apply */}
      {slotSummary && (
        <SlotSummaryDialog
          open={showSummaryDialog}
          onOpenChange={setShowSummaryDialog}
          service={service}
          timeRange={`${startTime} - ${endTime}`}
          duration={duration}
          serviceCost={serviceCost}
          selectedDays={Array.isArray(slotSummary.selectedDays) ? slotSummary.selectedDays.length : slotSummary.selectedDays}
          totalSlots={slotSummary.totalSlots}
          hideWeekSelection={false}
          sharableLink={sharableLink}
        />
      )}
    </Layout>
  );
};

export default SlotBroadcast;
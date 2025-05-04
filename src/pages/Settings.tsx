
import Layout from "@/components/layout/Layout";
import SettingsTabs from "@/components/settings/SettingsTabs";

const Settings = () => {
  return (
    <Layout title="Settings">
      <div className="max-w-6xl mx-auto">
        <SettingsTabs />
      </div>
    </Layout>
  );
};

export default Settings;

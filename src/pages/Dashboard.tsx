
import { useEffect } from "react";
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/hooks/useAuth";
import { logger } from "@/utils/logger";

const Dashboard = () => {
  const { user } = useAuth();
  
  useEffect(() => {
    if (user) {
      logger.info("Dashboard loaded for authenticated user", {
        module: "pages",
        data: { userId: user.id }
      });
    }
  }, [user]);

  return (
    <Layout title="Dashboard">
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.username || "User"}!</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <p>Access your most frequent tasks here.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
            <p>View your recent actions and events.</p>
          </div>
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-4">Stats & Insights</h2>
            <p>View your performance metrics.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;

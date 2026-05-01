import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";

import { useAuth } from "../../context/AuthContext.jsx";
import API from "../../api/axios";
const Dashboard = () => {
  const { user } = useAuth();
   const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
  });

  const [loading, setLoading] = useState(true);

  const fetchStats = async () => {
    try {
      const { data } = await API.get(
        "/tasks/dashboard/stats"
      );

      setStats(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  return (
    <Layout>

      <h1 className="text-4xl font-bold mb-6">
        Dashboard
      </h1>

      <div className="bg-white p-6 rounded-lg shadow">

        <h2 className="text-2xl font-semibold mb-4">
          Welcome {user?.name}
        </h2>

        <p>Email: {user?.email}</p>

        <p>Role: {user?.role}</p>

      </div>


      {
        loading ? (
          <p>Loading stats...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">
                Total Tasks
              </h3>

              <p className="text-3xl font-bold mt-2">
                {stats.totalTasks}
              </p>
            </div>


            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">
                Completed
              </h3>

              <p className="text-3xl font-bold mt-2 text-green-600">
                {stats.completedTasks}
              </p>
            </div>


            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">
                Pending
              </h3>

              <p className="text-3xl font-bold mt-2 text-yellow-500">
                {stats.pendingTasks}
              </p>
            </div>


            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">
                In Progress
              </h3>

              <p className="text-3xl font-bold mt-2 text-blue-500">
                {stats.inProgressTasks}
              </p>
            </div>


            <div className="bg-white p-5 rounded-lg shadow">
              <h3 className="text-gray-500">
                Overdue
              </h3>

              <p className="text-3xl font-bold mt-2 text-red-500">
                {stats.overdueTasks}
              </p>
            </div>

          </div>
        )
      }

    </Layout>
  );
};

export default Dashboard;
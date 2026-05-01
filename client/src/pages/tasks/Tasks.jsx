import { useEffect, useState } from "react";
import Layout from "../../components/Layout.jsx";
import API from "../../api/axios";
import CreateTaskModal from "../../components/CreateTaskModal.jsx";

const Tasks = () => {
    const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data } = await API.get("/tasks");

      setTasks(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <Layout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          Tasks
        </h1>

      <button
  onClick={() => setShowModal(true)}
  className="bg-black text-white px-5 py-3 rounded"
>
  Create Task
</button>
      {
  showModal && (
    <CreateTaskModal
      closeModal={() => setShowModal(false)}
      fetchTasks={fetchTasks}
    />
  )
}

      </div>


      {
        loading ? (
          <p>Loading tasks...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {
              tasks.map((task) => (
                <div
                  key={task._id}
                  className="bg-white p-5 rounded-lg shadow"
                >

                  <div className="flex justify-between items-center mb-3">

                    <h2 className="text-2xl font-bold">
                      {task.title}
                    </h2>

                    <span
                      className={`
                        px-3 py-1 rounded text-sm text-white

                        ${
                          task.status === "completed"
                            ? "bg-green-500"
                            : task.status === "in-progress"
                            ? "bg-blue-500"
                            : "bg-yellow-500"
                        }
                      `}
                    >
                      {task.status}
                    </span>

                  </div>

                  <p className="text-gray-600 mb-4">
                    {task.description}
                  </p>

                  <div className="space-y-2 text-sm">

                    <p>
                      <strong>Priority:</strong>
                      {" "}
                      {task.priority}
                    </p>

                    <p>
                      <strong>Assigned To:</strong>
                      {" "}
                      {task.assignedTo?.name}
                    </p>

                    <p>
                      <strong>Project:</strong>
                      {" "}
                      {task.project?.title}
                    </p>

                  </div>

                </div>
              ))
            }

          </div>
        )
      }



    </Layout>
  );
};


export default Tasks;

import { useEffect, useState } from "react";
import API from "../../api/axios";
import Layout from "../../components/Layout.jsx";
import CreateProjectModal from "../../components/CreateProjectModal.jsx";
const Projects = () => {
const [showModal, setShowModal] = useState(false);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const { data } = await API.get("/projects");

      setProjects(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <Layout>

      <div className="flex justify-between items-center mb-6">

        <h1 className="text-4xl font-bold">
          Projects
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-black text-white px-5 py-3 rounded"
        >
          Create Project
        </button>

      </div>


      {
        loading ? (
          <p>Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

            {
              projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white p-5 rounded-lg shadow"
                >

                  <h2 className="text-2xl font-bold mb-2">
                    {project.title}
                  </h2>

                  <p className="text-gray-600 mb-4">
                    {project.description}
                  </p>

                  <div className="text-sm text-gray-500">
                    Members:
                    {" "}
                    {project.members.length}
                  </div>

                </div>
              ))
            }

          </div>
        )
      }
{
        showModal && (
          <CreateProjectModal
            closeModal={() => setShowModal(false)}
            fetchProjects={fetchProjects}
          />
        )
      }

    </Layout>
  );
};

export default Projects;
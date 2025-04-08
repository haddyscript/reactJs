import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getProtectedData, getAdminData } from "../api/apiRequest";

const Dashboard = () => {
  const { token, user } = useSelector((state) => state.auth);
  const [protectedMessage, setProtectedMessage] = useState("");
  const [adminMessage, setAdminMessage] = useState("");

  useEffect(() => {
    const fetchProtectedData = async () => {
      try {
        const { data } = await getProtectedData(token);
        setProtectedMessage(data.message);
      } catch (error) {
        setProtectedMessage("Access Denied");
      }
    };

    const fetchAdminData = async () => {
      try {
        const { data } = await getAdminData(token);
        setAdminMessage(data.message);
      } catch (error) {
        setAdminMessage("Admin Access Denied");
      }
    };

    fetchProtectedData();
    if (user.role === "admin") fetchAdminData();
  }, [token, user.role]);

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card shadow-lg">
            <div className="card-header text-center bg-primary text-white">
              <h4>Dashboard</h4>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h5 className="text-primary">Protected Data:</h5>
                <p className="lead">{protectedMessage}</p>
              </div>
              {user.role === "admin" && (
                <div className="mb-4">
                  <h5 className="text-success">Admin Data:</h5>
                  <p className="lead">{adminMessage}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

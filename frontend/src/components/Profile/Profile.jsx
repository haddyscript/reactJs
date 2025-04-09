
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import './Profile.css';  // Import your CSS file
import { getMyProfile, updateUserData } from "../../redux/features/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  useEffect( () => {
    if(!user) {
      dispatch(getMyProfile());
    }else {
      setFormData({ name: user.name, email: user.email });
    }
  }, [dispatch, user]);

  if(!user) {
    return <div>Loading...</div>;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    console.log("Updated data:", formData);
    dispatch(updateUserData(formData));
    setShowModal(false); 
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header">
          <h3>User Profile</h3>
        </div>
        <div className="card-body">
          <h5 className="card-title">Name: {user.name}</h5>
          <p className="card-text">Email: {user.email}</p>
        </div>
        <div className="card-footer text-center">
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            Edit Profile
          </button>
        </div>
      </div>

      {/* Bootstrap Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Edit Profile</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>

              <div className="modal-body">
                <form onSubmit={handleUpdate}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button type="submit" className="btn btn-primary">Save Changes</button>
                </form>
              </div>

            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </div>
  );
};

export default Profile;

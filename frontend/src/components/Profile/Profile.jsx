
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import './Profile.css';  // Import your CSS file

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  useEffect( () => {
    if(!user) {
      dispatch(getMyProfile());
    }
  }, [dispatch, user]);

  if(!user) {
    return <div>Loading...</div>;
  }

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
          <button className="btn btn-primary">Edit Profile</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;

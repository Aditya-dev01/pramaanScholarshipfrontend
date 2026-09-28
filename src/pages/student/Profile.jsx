import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="dashboard-header">
        <span>Account</span>

        <h1>My Profile</h1>

        <p>Manage your profile information.</p>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          {user?.name?.charAt(0)}
        </div>

        <h2>{user?.name}</h2>

        <p>{user?.email}</p>

        <div className="profile-info">
          <div>
            <span>Full Name</span>
            <strong>{user?.name}</strong>
          </div>

          <div>
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>

          <div>
            <span>Role</span>
            <strong>Student</strong>
          </div>
        </div>

        <button className="secondary-btn">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
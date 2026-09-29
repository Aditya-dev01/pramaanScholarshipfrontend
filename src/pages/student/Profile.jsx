import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="dashboard-header">
        <span className="text-[#9BB06D]">Account</span>

        <h1 className="text-[#293127]">My Profile</h1>

        <p className="text-[#293127]/60">
          Manage your profile information.
        </p>
      </div>

      <div className="profile-card border-[#E8EEDB] bg-white">
        <div className="profile-avatar bg-[#9BB06D] text-white">
          {user?.name?.charAt(0)}
        </div>

        <h2 className="text-[#293127]">{user?.name}</h2>

        <p className="text-[#293127]/60">{user?.email}</p>

        <div className="profile-info">
          <div>
            <span className="text-[#293127]/50">Full Name</span>
            <strong className="text-[#293127]">{user?.name}</strong>
          </div>

          <div>
            <span className="text-[#293127]/50">Email</span>
            <strong className="text-[#293127]">{user?.email}</strong>
          </div>

          <div>
            <span className="text-[#293127]/50">Role</span>
            <strong className="text-[#293127]">Student</strong>
          </div>
        </div>

        <button className="secondary-btn border-[#9BB06D] text-[#9BB06D] hover:bg-[#E8EEDB]">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
import { useAuth } from "../../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  return (
    <div className="profile-page">
      <div className="dashboard-header">
        <span className="text-[#24823F]">Account</span>

        <h1 className="text-[#26332A]">My Profile</h1>

        <p className="text-[#26332A]/60">
          Manage your profile information.
        </p>
      </div>

      <div className="profile-card border-[#DDEBD8] bg-white">
        <div className="profile-avatar bg-[#24823F] text-white">
          {user?.name?.charAt(0)}
        </div>

        <h2 className="text-[#26332A]">{user?.name}</h2>

        <p className="text-[#26332A]/60">{user?.email}</p>

        <div className="profile-info">
          <div>
            <span className="text-[#26332A]/50">Full Name</span>
            <strong className="text-[#26332A]">{user?.name}</strong>
          </div>

          <div>
            <span className="text-[#26332A]/50">Email</span>
            <strong className="text-[#26332A]">{user?.email}</strong>
          </div>

          <div>
            <span className="text-[#26332A]/50">Role</span>
            <strong className="text-[#26332A]">Student</strong>
          </div>
        </div>

        <button className="secondary-btn border-[#24823F] text-[#24823F] hover:bg-[#DDEBD8]">
          Edit Profile
        </button>
      </div>
    </div>
  );
}
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin } from "lucide-react";

function Footer() {
  return (
    <footer className="bg-[#185C2C] text-[#DDEBD8]">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">

        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">

          <div>
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#24823F] font-bold text-white">
                S
              </div>

              <div>
                <h2 className="font-bold text-white">
                  ScholarConnect
                </h2>
                <p className="text-xs text-[#DDEBD8]">
                  Scholarship Portal
                </p>
              </div>
            </div>

            <p className="text-sm leading-6 text-[#DDEBD8]">
              A digital platform for discovering scholarships,
              submitting applications and tracking scholarship
              decisions.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">
              Quick Links
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link to="/" className="hover:text-[#E5B84B]">
                Home
              </Link>

              <Link to="/about" className="hover:text-[#E5B84B]">
                About
              </Link>

              <Link
                to="/apply-process"
                className="hover:text-[#E5B84B]"
              >
                Apply Process
              </Link>

              <Link to="/login" className="hover:text-[#E5B84B]">
                Login
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">
              Students
            </h3>

            <div className="flex flex-col gap-3 text-sm">
              <Link
                to="/student/scholarships"
                className="hover:text-[#E5B84B]"
              >
                Scholarships
              </Link>

              <Link
                to="/student/applications"
                className="hover:text-[#E5B84B]"
              >
                My Applications
              </Link>

              <Link
                to="/register"
                className="hover:text-[#E5B84B]"
              >
                Create Account
              </Link>
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-white">
              Contact
            </h3>

            <div className="space-y-4 text-sm text-[#DDEBD8]">
              <div className="flex gap-3">
                <Mail size={18} className="text-[#E5B84B]" />
                support@scholarconnect.com
              </div>

              <div className="flex gap-3">
                <Phone size={18} className="text-[#E5B84B]" />
                +91 1800 000 000
              </div>

              <div className="flex gap-3">
                <MapPin size={18} className="text-[#E5B84B]" />
                New Delhi, India
              </div>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-[#24823F] pt-6 text-center text-sm text-[#DDEBD8]">
          © {new Date().getFullYear()} ScholarConnect.
          All rights reserved.
        </div>

      </div>
    </footer>
  );
}

export default Footer;
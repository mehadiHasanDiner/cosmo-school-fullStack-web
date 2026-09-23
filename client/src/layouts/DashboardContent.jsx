import { CiDeliveryTruck } from "react-icons/ci";
import logoImg from "./../assets/logo.png";

import { FaRegCreditCard } from "react-icons/fa";
import { Link, NavLink } from "react-router";
import { useState } from "react";

const DashboardContent = ({ dbUser }) => {
  const [activeRole, setActiveRole] = useState(dbUser.roles?.[1]);
  // console.log(activeRole);
  return (
    <div>
      {/* List item */}
      <li>
        <Link to="/">
          <img src={logoImg} alt="" />
        </Link>
      </li>
      <li>
        <Link
          to="/dashboard"
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Homepage"
        >
          {/* Home icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="my-1.5 inline-block size-4"
          >
            <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"></path>
            <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          </svg>
          <span className="is-drawer-close:hidden">Homepage</span>
        </Link>
      </li>

      {/* our dashboard links */}
      <li>
        <NavLink
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="My Parcels"
          to="/dashboard/my-parcels"
        >
          <CiDeliveryTruck size={18} />
          <span className="is-drawer-close:hidden">My Parcels</span>
        </NavLink>
      </li>
      <li>
        <NavLink
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Payment History"
          to="/dashboard/payment-history"
        >
          <FaRegCreditCard size={18} />
          <span className="is-drawer-close:hidden">Payment History</span>
        </NavLink>
      </li>

      {/* List item */}
      <li>
        <button
          className="is-drawer-close:tooltip is-drawer-close:tooltip-right"
          data-tip="Settings"
        >
          {/* Settings icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeWidth="2"
            fill="none"
            stroke="currentColor"
            className="my-1.5 inline-block size-4"
          >
            <path d="M20 7h-9"></path>
            <path d="M14 17H5"></path>
            <circle cx="17" cy="17" r="3"></circle>
            <circle cx="7" cy="7" r="3"></circle>
          </svg>
          <span className="is-drawer-close:hidden">Settings</span>
        </button>
      </li>
    </div>
  );
};

export default DashboardContent;

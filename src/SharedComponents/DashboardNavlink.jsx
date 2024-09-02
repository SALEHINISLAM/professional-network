import React from "react";
import { NavLink } from "react-router-dom";

export const employerNavlink = (
  <>
    <li>
      <NavLink to={"/dashboard/employerHome"}>Employer Home</NavLink>
    </li>
    {/* view all job and create new job */}
    <li>
      <NavLink to={"/dashboard/manageJobs"}>Manage job posts</NavLink>
    </li>
    {/* all application and job specific application */}
    <li>
      <NavLink to={"/dashboard/applicants"}>View Applicants</NavLink>
    </li>
    {/* accessible by all type of user */}
    <li>
      <NavLink to={"/dashboard/help"}>Help</NavLink>
    </li>
  </>
);

export const jobSeekerNavlink = (
  <>
    <li>
      <NavLink to={"/dashboard/jobSeekerHome"}>Job Seeker Home</NavLink>
    </li>
    <li>
      <NavLink to={"/dashboard/findJobs"}>Find Jobs</NavLink>
    </li>
    <li>
      <NavLink to={"/dashboard/appliedJobs"}>Applied Jobs</NavLink>
    </li>
    <li>
      <NavLink to={"/dashboard/help"}>help</NavLink>
    </li>
  </>
);

export const entrepreneurNavlink=<>
<li>
      <NavLink to={"/dashboard/entrepreneurHome"}>Entrepreneur Home</NavLink>
    </li>
    {/* view all job and create new job */}
    <li>
      <NavLink to={"/dashboard/manageJobs"}>Manage job posts</NavLink>
    </li>
    {/* all application and job specific application */}
    <li>
      <NavLink to={"/dashboard/applicants"}>View Applicants</NavLink>
    </li>
    <li>
      <NavLink to={"/dashboard/investment"}>Apply for Investment</NavLink>
    </li>
    <li>
      <NavLink to={"/dashboard/help"}>Help</NavLink>
    </li>
</>
export const adminNavLink=<>
<li>
  <NavLink to={'/dashboard/adminHome'}>
    Admin Home
  </NavLink>
</li>
<li>
  <NavLink to={'/dashboard/allUsers'}>
    All Users
  </NavLink>
</li>
<li>
  <NavLink to={'/dashboard/allJobs'}>
    All Jobs
  </NavLink>
</li>
</>
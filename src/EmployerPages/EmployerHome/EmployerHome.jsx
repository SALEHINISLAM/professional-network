import React from "react";
import PropTypes from "prop-types";
import { MdWorkHistory } from "react-icons/md";
import { IoMdPeople } from "react-icons/io";
import { FaMoneyBillWave } from "react-icons/fa";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
const EmployerHome = (props) => {
  return (
    <div>
      <div className="container py-8 mx-auto gap-8 lg:gap-16 grid grid-cols-1 md:grid-cols-3">
        <div className="bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-xl p-4 text-white font-bold text-center">
          <h1 className="text-4xl lg:text-6xl">200</h1>
          <h3 className="text-2xl lg:text-3xl flex justify-center items-center gap-2">
            <MdWorkHistory />
            Posted Jobs
          </h3>
        </div>
        <div className="bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] rounded-xl p-4 text-white font-bold text-center">
          <h1 className="text-4xl lg:text-6xl">200</h1>
          <h3 className="text-2xl lg:text-3xl flex justify-center items-center gap-2">
            <IoMdPeople />
            Applicants Applied
          </h3>
        </div>
        <div className="bg-gradient-to-r from-[#FE4880] to-[#FECDE9] rounded-xl p-4 text-white font-bold text-center">
          <h1 className="text-4xl lg:text-6xl">$200</h1>
          <h3 className="text-2xl lg:text-3xl flex justify-center items-center gap-2">
            <FaMoneyBillWave />
            Due Amount
          </h3>
        </div>
      </div>
      {/* plan */}
      <div className="container mx-auto">
        <Tabs>
          <TabList className={"flex justify-center items-center"}>
            <Tab>Prepaid</Tab>
            <Tab>Pay As You Go</Tab>
            <Tab>Free</Tab>
          </TabList>
          <hr />
          <TabPanel>
            <h2>Any content 1</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
          <TabPanel>
            <h2>Any content 2</h2>
          </TabPanel>
        </Tabs>
      </div>
    </div>
  );
};

EmployerHome.propTypes = {};

export default EmployerHome;

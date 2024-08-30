import React from 'react';
import useAllAdminLoadJobs from '../../hooks/useAllAdminLoadJobs';
import JobCard from '../../EmployerPages/PastJobs/JobCard';

const AdminLoadJobs = () => {
    const {allJobs, isLoading, error}=useAllAdminLoadJobs()
    if (isLoading) {
        return <span className='loading'></span>
    }
    if (error) {
        return <span>Error Handling Jobs</span>
    }

    return (
        <>
        <h2 className='container mx-auto text-4xl font-bold py-8'>
            All Jobs in Professional Network
        </h2>
        <div className='pb-16 grid grid-cols-1 lg:grid-cols-3 container mx-auto gap-8'>
            {allJobs? allJobs.map((job,index)=><JobCard job={job} key={index} price={parseInt(job.jobData.price)}/>) : 'No jobs found' }
        </div></>
    );
};

export default AdminLoadJobs;
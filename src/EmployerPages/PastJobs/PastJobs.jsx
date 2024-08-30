import React from 'react';
import useLoadAllJobsEmployer from '../../hooks/useLoadAllJobsEmployer';
import JobCard from './JobCard';

const PastJobs = () => {
    const {user, jobs, isLoading, error}=useLoadAllJobsEmployer()
    if (isLoading) {
        return <span className='loading'>Loading...</span>
    }
    if (error) {
        return <span>Error Handling Jobs , please try again later</span>
    }
    if (!user) {
        return <span>No user available</span>
    }

    return (
        <>
        <h3 className='container mx-auto text-4xl pt-12 font-bold'>
            My Posted Jobs
        </h3>
        <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-16'>
            {jobs? jobs.map((job,index)=><JobCard key={index} job={job} price={parseInt(job.jobData.price)}/>) :"No jobs Found"}
        </div>
        </>
    );
};

export default PastJobs;
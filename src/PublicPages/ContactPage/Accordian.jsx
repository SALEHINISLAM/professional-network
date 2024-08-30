import React from "react";

const Accordian = () => {
  return (
    <div className="container mx-auto space-y-8">
        <h2 className="text-4xl font-bold">
            FAQ
        </h2>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">
        How do I apply for a job on the platform?
        </div>
        <div className="collapse-content">
          <p>To apply for a job, you first need to create an account or log in if you already have one. Once logged in, browse through the job listings, and when you find a job you're interested in, click on the "Apply" button. You may need to upload your resume and fill out a short application form. After completing the application, you'll receive a confirmation email.</p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        How can I track the status of my job applications?
        </div>
        <div className="collapse-content">
          <p>You can track the status of your job applications by logging into your account and navigating to the "My Applications" section. Here, you'll see a list of jobs you've applied for, along with the current status (e.g., "Application Submitted," "Under Review," "Interview Scheduled," "Rejected," etc.).
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        How do I update my profile information?
        </div>
        <div className="collapse-content">
          <p>To update your profile information, log into your account and go to the "Profile" section. Here, you can edit your personal details, contact information, and upload a new resume or profile picture. Make sure to save your changes before exiting.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        Can I apply for multiple jobs at the same time?
        </div>
        <div className="collapse-content">
          <p>Yes, you can apply for multiple jobs simultaneously. Simply browse through the job listings and click "Apply" on each job you're interested in. Each application is treated separately, so you can customize your application materials (e.g., resume and cover letter) for each job.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        How can I post a job as an employer?
        </div>
        <div className="collapse-content">
          <p>To post a job, you need to create an employer account. Once logged in, go to the "Post a Job" section, fill in the job details, and click "Submit." Your job posting will be reviewed and published on the platform. You can track and manage your job postings through your employer dashboard.
          </p>
        </div>
      </div>
      <div className="collapse collapse-plus bg-base-200">
        <input type="radio" name="my-accordion-3" />
        <div className="collapse-title text-xl font-medium">
        Are there any fees for using the platform?
        </div>
        <div className="collapse-content">
          <p>Creating a job seeker account and applying for jobs is typically free. However, employers may be charged for posting job listings, accessing premium features, or using our applicant tracking system. Please refer to the "Pricing" section for more details on fees and subscription plans.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Accordian;

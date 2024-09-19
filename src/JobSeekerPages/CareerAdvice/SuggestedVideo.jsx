import React from "react";
import PropTypes from "prop-types";

const SuggestedVideo = ({ video }) => {
    const {thumbnail,title,link,description}=video
  return (
    <div className="w-full h-full p-4">
      <div className="card card-side bg-base-100 shadow-xl">
        <figure>
          <img
            src={thumbnail}
            className="h-full w-full"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{title}</h2>
          <p>{description}</p>
          <div className="card-actions justify-end">
            <a className="btn btn-primary" href={link} target="_blank">Watch</a>
          </div>
        </div>
      </div>
    </div>
  );
};

SuggestedVideo.propTypes = {
  video: PropTypes.object,
};

export default SuggestedVideo;

import React from "react";
import PropTypes from "prop-types";

const SuggestedBook = ({ book }) => {
    const {volumeInfo}=book
  return (
    <div className="p-4 w-full h-full">
      <div className="card bg-base-100 shadow-xl">
        <figure className="px-10 pt-10">
          <img
            src={volumeInfo?.imageLinks?.thumbnail}
            className="rounded-xl w-full h-full"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title">{volumeInfo?.title}</h2>
          <p className="text-sm">Authors</p>
          <ul>{volumeInfo?.authors?.map((item,index)=><li key={index}>{item}</li>)}</ul>
          <p>{volumeInfo?.description?.length>200? volumeInfo.description.slice(0,200)+"...": volumeInfo.description}</p>
          <div className="card-actions">
            <a className="btn btn-primary" href={volumeInfo?.infoLink} target="_blank">See More</a>
          </div>
        </div>
      </div>
    </div>
  );
};

SuggestedBook.propTypes = {
  book: PropTypes.object,
};

export default SuggestedBook;

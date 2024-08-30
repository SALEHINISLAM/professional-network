import React from 'react';
import PropTypes from 'prop-types';
import { useLoaderData } from 'react-router-dom';
import ReactQuill from 'react-quill';
import "react-quill/dist/quill.snow.css";

const Invest = props => {
    const investOption=useLoaderData();
    console.log(investOption)
    return (
        <div className='container mx-auto space-y-8 py-16'>
            <h2 className='text-4xl font-bold'>
                Invest today for future...
            </h2>
            {investOption?.map((invest, index)=><>
            <div key={index} className="container mx-auto" hidden={invest.investmentProposal.length===0}>
            <ReactQuill
            value={invest?.investmentProposal}
            readOnly={true}
            theme="snow"
            modules={{ toolbar: false }}
          />
            </div>
            </>)}
        </div>
    );
};

Invest.propTypes = {
    
};

export default Invest;
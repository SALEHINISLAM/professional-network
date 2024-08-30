import React from 'react';
import PropTypes from 'prop-types';
import Accordian from './Accordian';
import { Player } from '@lottiefiles/react-lottie-player';
import { MdEmail } from 'react-icons/md';

const ContactPage = props => {
    return (
        <div className='pb-20'>
            <h2 className='text-4xl font-bold text-center pt-16'>
                Get in touch
            </h2>
            <div className="flex flex-col lg:flex-row justify-center items-center container mx-auto p-4">
                <Player
                src={'https://d1jj76g3lut4fe.cloudfront.net/saved_colors/98631/qNiPscJHMvnDu2Ev.json'}
                loop
                autoplay
                />
                <div className="lg:w-1/2 text-xl">
                <p>
                    We love to here from you. You can check our FAQ to resolve your problem if needed . We always care for you. If you face any problem and get stuck then feel free to contact us. 
                </p>
<p className='flex items-center'>
    <MdEmail/>Email: <span className='lowercase font-semibold'>{" "}msionlinekingdom@gmail.com</span>
</p>
                </div>
            </div>
            <Accordian/>
        </div>
    );
};

ContactPage.propTypes = {
    
};

export default ContactPage;
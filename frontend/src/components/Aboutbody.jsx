import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../assets/image-27.webp';
import img2 from '../assets/image-28.webp';
import img3 from '../assets/image-29.webp';
import img4 from '../assets/image-30.webp';
import img5 from '../assets/image-31.webp';
import img6 from '../assets/image-32.webp';


function Aboutbody() {
    // Slider settings
    const settings = {
        dots: false,
        infinite: true,  // Enable infinite loop
        autoplay: true,
        speed: 500,
        autoplaySpeed: 3500,
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              initialSlide: 1
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1
            }
          }
        ]
    };

    return (
        <div>
            <div className='flex justify-center mt-32 font-sans text-4xl text-white'>
                About Us
            </div>
            <div className='flex md:flex-row flex-col items-stretch justify-center md:w-11/12 w-full md:space-x-20 mt-6 md:ml-20'>
                {/* Left div with slider */}
                <div className='flex-shrink-0 md:w-1/3 md:pl-3'>
                    <Slider {...settings}>
                        <div className='p-2'>
                            <img src={img1} alt='img1' className='w-3/4 h-3/4 object-cover pt-5 md:ml-16 ml-16' />
                        </div>
                        <div className='p-2'>
                            <img src={img2} alt='img2' className='w-3/4 h-3/4 object-cover pt-5 md:ml-16 ml-16' />
                        </div>
                        <div className='p-2'>
                            <img src={img3} alt='img3' className='w-3/4 h-3/4 object-cover pt-5 md:ml-16 ml-16' />
                        </div>
                        <div className='p-2'>
                            <img src={img4} alt='img4' className='w-3/4 h-3/4 object-cover pt-5 md:ml-16 ml-16' />
                        </div>
                        <div className='p-2'>
                            <img src={img5} alt='img5' className='w-3/4 h-3/4 object-cover pt-5 md:ml-16 ml-16' />
                        </div>
                        <div className='p-2'>
                            <img src={img6} alt='img6' className='w-3/4 h-3/4 object-cover pt-5 md:ml-16 ml-16' />
                        </div>
                    </Slider>
                </div>
                <div className='flex-1 flex items-center justify-center md:w-full text-xl text-white font-sans p-4 pt-0 md:pr-10' style={{ lineHeight: '1.5', letterSpacing: '0.05em', maxWidth: '100%'}}>
                    <p>Did you know that in India, around 150,000 people lose their lives every year because they cannot access immediate first aid in emergencies? Whether it's accidents, medical emergencies, snake bites, or natural disasters, the lack of timely help can be fatal. That's why we started AidVice—to take the initiative and provide the right information and support to those who aren't sure what to do in these critical situations. With AidVice, you no longer need to worry or panic when something goes wrong. Just reach out to us, and we'll offer you personalized advice and first aid guidance.</p>
                </div>
            </div>
        </div>
    );
}

export default Aboutbody;

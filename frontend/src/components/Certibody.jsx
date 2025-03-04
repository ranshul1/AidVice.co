import React from 'react';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import img1 from '../assets/image-34.webp';
import img2 from '../assets/image-35.webp';
import img3 from '../assets/image-36.webp';
import img4 from '../assets/image-37.webp';
import img5 from '../assets/image-39.webp';
import img6 from '../assets/image-40.webp';
import avatar1 from '../assets/image-75.webp';
import avatar2 from '../assets/image-77.webp';
import avatar3 from '../assets/image-78.webp';

function Certibody() {
    // Slider settings
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        initialSlide: 0,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              autoplay: true,
              autoplayduration: 3000,
              infinite: true,
              dots: true
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
            <div className='flex justify-center mt-32 font-sans text-4xl text-red-800'>
                Certification
            </div>
            <div className='flex md:flex-row flex-col items-stretch justify-center md:w-11/12 w-full md:space-x-20 mt-6 md:ml-20'>
                <div className='flex-1 flex items-center justify-center md:w-full text-xl text-red-800 font-sans p-4 pt-0 md:pr-10' style={{ lineHeight: '1.5', letterSpacing: '0.05em', maxWidth: '100%'}}>
                    <p>At AidVice, we've dedicated countless hours to researching and consulting with top health professionals to ensure we provide the most accurate and helpful advice in emergency situations. Our commitment to ethics is at the core of everything we do. That's why we've relied on reputable resources, including essential books such as "Where There Is No Doctor" by David Werner, "First Aid Manual" by the British Red Cross, "The Survival Medicine Handbook" by Joseph Alton, and "Advanced First Aid, CPR, and AED" by the American Academy of Orthopaedic Surgeons (AAOS). These texts guide our approach, ensuring we offer advice that is not only fast but ethically sound and reliable.
                    Unlike a quick internet search, AidVice delivers faster, more precise, and ethically correct answers that are designed to truly assist in emergencies. We also offer a comprehensive suite of services in one convenient place, making us a trusted partner in your time of need.</p>
                </div>
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
            </div>

            <div className='flex flex-col mt-10 pl-14 mb-20'>
                <h2 className='pl-10 text-2xl text-red-800 font-sans'>Doctors we consulted to :</h2>
                <div className='flex justify-around w-full md:w-1/2 space-x-5 mt-20 pl-24'>
                    <div className='flex flex-col items-center'>
                        <img src={avatar1} alt='Dr.Ronak Banthia' className='rounded-full w-32 h-32' />
                        <h1 className='mt-2 text-center text-xl text-red-800 font-sans'>Dr. Suyasha Jhamad</h1>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={avatar2} alt='Dr.Prakhar Kayat' className='rounded-full w-32 h-32' />
                        <h1 className='mt-2 text-center text-xl text-red-800 font-sans'>Dr. Parab Kothari</h1>
                    </div>
                    <div className='flex flex-col items-center'>
                        <img src={avatar3} alt='Dr.Aakarsh Gupta' className='rounded-full w-32 h-32' />
                        <h1 className='mt-2 text-center text-xl text-red-800 font-sans'>Dr. Nitish Rao</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Certibody;

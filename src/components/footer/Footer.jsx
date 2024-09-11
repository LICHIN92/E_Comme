import React from 'react'
import './footer.css'
import { Element } from 'react-scroll'
import { MdEmail } from 'react-icons/md'
import { FaFacebook} from 'react-icons/fa'
import { IoLogoWhatsapp } from 'react-icons/io'
import { FaMobileScreenButton } from 'react-icons/fa6'

function Footer() {
    return (
        <div className='capitalize italic font-medium bg-slate-800 grid items-center gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 text-slate-300  py-2 px-2'>
            <Element name='about'>
                <div className='bg-slate-900 text-center'>about
                    <div className='flex ps-3 '>
                        <ul >
                            <li className='flex gap-1'> <li className='italic'>E-shops</li>
                             is very small business</li>
                            <li>Based on Kayakkodi</li>
                            <li>Cash on delivery</li>
                        </ul>
                    </div>
                </div>
            </Element>

            <Element name='contact'>
                <div className='bg-slate-900 text-center'>contact
                    <div className='flex ps-3'>
                        <ul>
                            <li>Navottukkunnummal</li>
                            <li>Kayakkodi (po)</li>
                            <li>Kozhikkode PIN:673508</li>
                        </ul>
                    </div>  
                </div>
            </Element>

            <Element name='connect'>
                <div className='bg-slate-900 text-center'>connect
                    <div className='flex ps-3 '>
                        <ul>
                            <li className='flex items-center gap-1'> <MdEmail/> email</li>
                            <li className='flex items-center gap-1'> <IoLogoWhatsapp/> whatsApp</li>
                            <li className='flex items-center gap-1'><FaFacebook/> facebook</li>
                        </ul>
                    </div>
                </div>
            </Element>
            <Element>
                <div className='bg-slate-900 text-center'>Connect
                    <div className="flex ps-3">
                        <ul>
                            <li className='flex items-center gap-1'><FaMobileScreenButton />8086200861</li>
                            <li className='flex items-center gap-1'><FaMobileScreenButton />8086200861</li>
                            <li className='flex items-center gap-1'><FaMobileScreenButton />8086200861</li>
                        </ul>
                    </div>
                </div>
            </Element>

        </div>
    )
}

export default Footer

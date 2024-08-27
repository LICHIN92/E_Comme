import React from 'react'
import './footer.css'
import { Element } from 'react-scroll'

function Footer() {
    return (
        <div className='capitalize italic font-medium bg-slate-800 grid items-center gap-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 text-slate-300  py-2 px-2'>
            <Element name='about'>
                <div className='bg-slate-900 text-center'>about
                    <div className='flex ps-3 '>
                        <ul>
                            <li>1</li>
                            <li>2</li>
                            <li>3</li>
                        </ul>
                    </div>
                </div>
            </Element>

            <Element name='contact'>
                <div className='bg-slate-900 text-center'>contact
                    <div className='flex ps-3'>
                        <ul>
                            <li>address 1</li>
                            <li>address2</li>
                            <li>address3</li>
                        </ul>
                    </div>
                </div>
            </Element>

            <Element name='connect'>
                <div className='bg-slate-900 text-center'>connect
                    <div className='flex ps-3 '>
                        <ul>
                            <li>email</li>
                            <li>whatsApp</li>
                            <li>facebook</li>
                        </ul>
                    </div>
                </div>
            </Element>
            <Element>
                <div className='bg-slate-900 text-center'>fourth
                    <div className="flex ps-3">
                        <ul>
                            <li>f</li>
                            <li>f</li>
                            <li>f</li>
                        </ul>
                    </div>
                </div>
            </Element>

        </div>
    )
}

export default Footer

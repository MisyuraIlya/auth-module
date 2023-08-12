import React, { useState } from 'react';
import {AiOutlineHome, AiOutlineMessage, AiOutlineShoppingCart} from 'react-icons/ai'
import {BsPerson} from 'react-icons/bs'
import {FiSettings} from 'react-icons/fi'
import './MobileNavigation.styles.scss'
const MobileNavigation = () => {
    const [active, setActive] = useState('')
    const data = [
        {id:1, title:'בית', icon:<AiOutlineHome/>},
        {id:2, title:'הודעות', icon: <AiOutlineMessage/>},
        {id:3, title:'פרופיל', icon: <BsPerson/>},
        {id:4, title:'עגלה', icon:<AiOutlineShoppingCart/>},
        {id:5, title:'הגדרות', icon:<FiSettings/>},
    ]
    return (
        <div className='navigation'>
            <ul>
                {data.map((item) => 
                    <li className={item.title === active ? 'active' :''} key={item.id} onClick={() => setActive(item.title)}>
                        <a href='#'>
                            <span className='icon'>
                                {item.icon}
                            </span>
                            <span className='text'>{item.title}</span>
                        </a>
                    </li>
                )}
                <div className='indicator'></div>
            </ul>
        </div>
    );
};

export default MobileNavigation;
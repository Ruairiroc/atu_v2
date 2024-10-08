import React, {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Styles.css';

function NavButton(){
   const [isOpen, setIsOpen] = useState(false);
   

   const handleToggle = () => {
    setIsOpen(!isOpen);
   };

  return(
    <div className="menu-container">
    <FontAwesomeIcon icon={faBars} onClick={handleToggle} />        
    {isOpen && (
            <div className="dropdown-menu">
            <ul>
              <li>Option 1</li>
              <li>Option 2</li>
              <li>Option 3</li>
            </ul>
            </div>
        )}
    </div>
  );


}

export default NavButton;
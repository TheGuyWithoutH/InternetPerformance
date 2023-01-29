/**
 * @file Dynamic button component
 * @author Ugo Balducci
 * @version 1.0.0
 */

import {useState} from 'react';
import {Link} from 'react-router-dom'

const DynamicButton = (props) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <Link to={props.link} class="button" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut}>
        {isHovering && props.textOnHover}{!isHovering && props.text}
    </Link>
  )
}

export default DynamicButton;
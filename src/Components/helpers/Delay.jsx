
import { useState, useEffect } from 'react'

const Delay = (props) => {
  const [hide, setHide] = useState(true);
  useEffect(() => {
    setTimeout(() => {
        setHide(false);
    }, props.delay)
  }, []);

    return (
        hide ? '' : props.children
        )
  
}

export default Delay
import PropTypes from 'prop-types'
import Button from './Button';
import { useLocation } from 'react-router-dom';

const Header = ({ title, onShow, showAdd }) => {
    const location = useLocation()
    const onClick = () => {
        console.log('clicked')
    }
    return (
        <header className='header'>
            <h1>{title}</h1>
            {location.pathname === '/' && <Button color={ showAdd?'red':'green'} text={showAdd?'Close':'Add'} onClick={onShow} />}
      </header>
  );
};

Header.defaultProps = {
    title:'Task Tracker'
}

Header.propTypes = {
    title:PropTypes.string.isRequired
}


//css in JS

// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'
// }
export default Header;

import Button from '@material-ui/core/Button';
import React from 'react';
import './Login.css';
import logo from '../../assets/logo.png';

class LoginPage extends React.Component {

  componentDidMount() {
  }

  render() {
    return(
      <div className='page-login'>
        <div className='login-section'>
          <span className='login-header'>Welcome to Sync-Up Club</span>
        </div>
        <div className='login-section'>
          <img alt='logo' src={logo} className='logo-img'/>
        </div>
        <div className='login-section'>
          <Button className='login-btn'
                  variant='contained'
                  color='primary'
                  href='http://localhost:5000/login'>
            Login
          </Button>
        </div>
      </div>
    );
  }
}

export default LoginPage;

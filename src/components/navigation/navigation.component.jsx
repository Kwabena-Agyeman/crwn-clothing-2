import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { ReactComponent as CrwnLogo } from '../../assets/crown.svg';
import './navigation.styles.scss';
import { UserContext } from '../../context/user.context';
import { signOutUser } from '../../utils/Firebase/Firebase.utils';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const signOutHandler = async () => {
    await signOutUser();
  };
  return (
    <>
      <div className='navigation'>
        <Link className='logo-container' to={'/'}>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to={'/shop'}>
            SHOP
          </Link>
          {currentUser ? (
            <span className='nav-link' onClick={() => signOutHandler()}>
              SIGN OUT
            </span>
          ) : (
            <Link className='nav-link' to={'/auth'}>
              SIGNIN
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default Navigation;

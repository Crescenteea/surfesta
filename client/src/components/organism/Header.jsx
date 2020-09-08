import React, { useCallback } from 'react';
import HeaderRight from '../molecule/header/HeaderRight';
import Logo from '../atom/header/Logo';
import { useDispatch, useSelector } from 'react-redux';
import { welcomeModal } from '../../redux/modules/modal';
import PostEventButton from '../atom/header/PostEventButton';
import { push } from 'connected-react-router';
import './Header.scss';
import useWindowWidth from '../../hooks/useWindowWidth';
import MobileBurger from './MobileBurger';
import { useState } from 'react';

function Header() {
  const user = useSelector((state) => state.auth.user);
  const curHistory = useSelector((state) => state.router.location.pathname);
  const dispatch = useDispatch();
  const width = useWindowWidth();
  const [visible, setVisible] = useState(false);

  const handlePostEvent = useCallback(() => {
    if (curHistory === '/createEvent') return;
    if (user === null) {
      dispatch(welcomeModal('로그인 후 시작하기😉'));
      return;
    }
    dispatch(push('/createEvent'));
  }, [dispatch, user, curHistory]);

  const handleLogoClick = useCallback(() => {
    dispatch(push('/'));
  }, [dispatch]);

  const handleDrawerClick = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <header className="main-header">
      <div className="header-wrapper">
        {width > 390 && <PostEventButton handleClick={handlePostEvent} />}
        <Logo onClick={handleLogoClick} />
        {width > 390 && <HeaderRight />}
        {width < 390 && <MobileBurger handleClick={handleDrawerClick} />}
      </div>
      {visible && width < 390 && (
        <div>
          <HeaderRight />
          <PostEventButton />
        </div>
      )}
    </header>
  );
}
export default Header;

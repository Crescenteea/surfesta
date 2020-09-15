import React, { useCallback } from 'react';
import HeaderRight from '../molecule/header/HeaderRight';
import Logo from '../atom/header/Logo';
import PostEventButton from '../atom/header/PostEventButton';
import './Header.scss';
import { welcomeModal } from '../../redux/modules/modal';
import MobileBurger from '../atom/header/MobileBurger';
import useWindowWidth from '../../hooks/useWindowWidth';
import { useDispatch, useSelector } from 'react-redux';
import { push } from 'connected-react-router';
import { useState } from 'react';
import ThemeIndicator from '../molecule/header/ThemeIndicator';
import UserAvatar from '../atom/header/UserAvatar';
import MobileDrawer from '../molecule/header/MobileDrawer';
import SubNav from './SubNav';
import LogoutDiv from '../molecule/profile/LogoutDiv';
import ProfileBtn from '../atom/profile/ProfileBtn';
import { NavLink } from 'react-router-dom';
import MobileHeaderRight from './MobileHeaderRight';

function Header() {
  const user = useSelector((state) => state.auth.user);
  const location = useSelector((state) => state.router.location.pathname);
  const width = useWindowWidth();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const handlePostEvent = useCallback(() => {
    if (location === '/createEvent') return;
    if (user === null) {
      dispatch(welcomeModal('로그인 후 시작하기😉'));
      return;
    }
    dispatch(push('/createEvent'));
  }, [dispatch, user, location]);

  const handleLogoClick = useCallback(() => {
    dispatch(push('/'));
  }, [dispatch]);

  const handleDrawerClick = useCallback(() => {
    setVisible(!visible);
  }, [visible]);

  return (
    <section className="main-header">
      <div className="header-wrapper">
        <div className="not-mobile">
          <PostEventButton handleClick={handlePostEvent} />
        </div>
        <Logo onClick={handleLogoClick} />
        <div className="not-mobile">
          <HeaderRight />
        </div>
        <MobileHeaderRight className="only-mobile header-right">
          <ThemeIndicator />
          <MobileBurger onClick={handleDrawerClick} />
        </MobileHeaderRight>
      </div>
      {visible && (
        <MobileDrawer>
          <ul>
            <li>
              <NavLink to="/my/profile" activeClassName="clicked">
                <div className="sub-nav-div">프로필</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/my/event/enlisted" activeClassName="clicked">
                <div className="sub-nav-div">참가신청한 이벤트</div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/my/event/hosting" activeClassName="clicked">
                <div className="sub-nav-div">주최한 이벤트 </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/my/event/liked" activeClassName="clicked">
                <div className="sub-nav-div">찜한 이벤트</div>
              </NavLink>
            </li>
            <li>
              <PostEventButton />
            </li>
            <li>
              <ProfileBtn name="로그아웃 하기" />
            </li>
          </ul>
        </MobileDrawer>
      )}
    </section>
  );
}

export default Header;

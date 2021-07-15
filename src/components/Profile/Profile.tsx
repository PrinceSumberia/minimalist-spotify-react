import * as React from 'react';

import { LogOut } from 'react-feather';

import './ProfileStyles.scss';

interface PropType {
  name: string;
  email: string;
  src: string;
  logout: () => void;
}

function Profile({ name, email, src, logout }: PropType) {
  return (
    <div className="profile">
      <div className="media">
        <img src={src} alt="user" className="media__img" />
      </div>
      <div className="user">
        <h4 className="user__name">
          Hi, <span>{name}</span>
        </h4>
        <p className="user__email">{email}</p>
      </div>
      <div className="controls">
        <div
          className="controls__logout"
          onClick={logout}
          onKeyPress={logout}
          tabIndex={0}
          role="button"
        >
          <LogOut />
        </div>
      </div>
    </div>
  );
}

export default Profile;

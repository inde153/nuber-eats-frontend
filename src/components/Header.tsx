import React from 'react';
import { useMe } from '../hooks/useMe';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
const nuberLogo = 'https://www.ubereats.com/_static/8b969d35d373b512664b78f912f19abc.svg';

//커스텀 훅을 사용하여 쿼리를 부를 경우 아폴로에서 자동으로 캐싱을 가져 옴
export const Header: React.FC = () => {
  const { data } = useMe();

  return (
    <header className="py-4">
      <div className="w-full px-5 xl:px-0 max-w-screen-lg mx-auto flex justify-between items-center">
        <img src={nuberLogo} className="w-40" />
        <span className="text-xs">
          <Link to="/profile/">
            <FontAwesomeIcon icon={faUser} className="text-xl" />
          </Link>
        </span>
      </div>
    </header>
  );
};

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = ({ filterMedia, userInfo }) => {
	const [searchText, setSearchText] = useState('');

	const onSearchChange = (e) => {
		setSearchText(e.target.value);
		filterMedia(e.target.value);
	};

	const location = useLocation();
	console.log(location);

	return (
		<nav className='navbar'>
			<div className='navbar-brand'>
				<Link to='/'>Image Viewer</Link>
			</div>
			{location.pathname !== '/login' && (
				<div className='nav-right'>
					{location.pathname !== '/profile' && (
						<input
							type='text'
							placeholder='Search'
							className='nav-search-box'
							value={searchText}
							onChange={onSearchChange}
						/>
					)}
					{userInfo && (
						<Link to='/profile'>
							<img
								className='profile-pic'
								src={userInfo.profile_pic}
								alt='John Doe'
							/>
						</Link>
					)}
				</div>
			)}
		</nav>
	);
};

export default Header;
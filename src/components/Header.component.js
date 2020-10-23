import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = ({ filterMedia }) => {
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
					<Link to='/profile'>
						<img
							className='profile-pic'
							src='https://lh3.googleusercontent.com/proxy/vOcfOfHYPAKQgLHePMiu8CCD1yx_K9AmcAN0dZt0dA1Xm-UKN4gvppLcwE-fKxByLmzkPfKEY_Qzp9yBcV0VG6ijNJhWYI1JrLU_b3roVtopjIsdgq0'
							alt='John Doe'
						/>
					</Link>
				</div>
			)}
		</nav>
	);
};

export default Header;
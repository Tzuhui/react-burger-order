import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './NavBar.css';

const NavBar = () => {
	const isAuthenticated = useSelector(state => state.auth.token !== null);
	const [menuOpen, setMenuOpen] = useState(false);
	
	function toggleMenu (e) {
		e.preventDefault();
		setMenuOpen(!menuOpen)
	}
	return (
		<header className={'navbar'}>
			<a href="/" className="nav-logo"><i className="fas fa-hamburger"></i></a>
			<a href="/" className="nav-logo mobile-menu-btn" onClick={toggleMenu}><i className="fas fa-bars"></i></a>

			<nav className={menuOpen? 'open nav-item' : 'nav-item'}>
				<NavLink to="/" exact>Burger Builder</NavLink>
				{isAuthenticated ? <NavLink to="/orders" activeClassName={'active'}>Orders</NavLink> : null }
				{!isAuthenticated
					? <NavLink to="/auth" activeClassName={'active'}>Authenticate</NavLink>
					: <NavLink to="/logout" activeClassName={'active'}>Logout</NavLink>}
			</nav>
		</header>
	)
};

export default NavBar;
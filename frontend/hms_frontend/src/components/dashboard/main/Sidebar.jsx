import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming you are using React Router for navigation

const Sidebar = ({ user }) => {
    const [menuOpen, setMenuOpen] = useState(false);

    // Toggle function for submenu items
    const toggleSubMenu = (e) => {
        e.preventDefault();
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="app-menu navbar-menu">
            {/* LOGO */}
            <div className="navbar-brand-box">
                {/* Light Logo*/}
                <Link to="/dashboard" className="logo logo-light">
                    <span className="logo-sm">
                        <img src="/static/images/favicon/logo-sm.jpg" alt="" style={{ borderRadius: '50%' }} height="" />
                    </span>
                    <span className="logo-lg">
                        <img src="/static/images/favicon/logo-big.jpeg" alt="" height="100" />
                    </span>
                </Link>
                <button
                    type="button"
                    className="btn btn-sm p-0 fs-20 header-item float-end btn-vertical-sm-hover"
                    id="vertical-hover"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <i className="ri-record-circle-line"></i>
                </button>
            </div>

            <div id="scrollbar">
                <div className="container-fluid">
                    <div id="two-column-menu"></div>

                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title">
                            <span data-key="t-menu">Menu</span>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" to="/dashboard">
                                <i className="bx bx-grid-alt"></i> <span data-key="t-widgets">Dashboard</span>
                            </Link>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#" onClick={toggleSubMenu}>
                                <i className="bx bx-message-detail"></i> <span data-key="t-widgets">Messages</span>
                            </a>
                            {menuOpen && (
                                <ul className="submenu">
                                    <li>
                                        <Link to="/CreateMsgDashboard">Create Messages</Link>
                                    </li>
                                    <li>
                                        <Link to="/DraftDashboard">Draft Messages</Link>
                                    </li>
                                </ul>
                            )}
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" to="/TransactionHistory">
                                <i className="bx bx-dollar"></i> <span data-key="t-widgets">Transaction History</span>
                            </Link>
                        </li>

                        <li className="menu-title">
                            <span data-key="t-menu">SETTINGS</span>
                        </li>

                        <li className="nav-item">
                            <Link className="nav-link menu-link" to="/ManageProfile">
                                <i className="bx bx-user"></i> <span data-key="t-widgets">My Profile</span>
                            </Link>
                        </li>

                        {user && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link menu-link" to="/create_recipient_category">
                                        <i className="bx bx-plus"></i> <span data-key="t-widgets">Add Category</span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link menu-link" to="/create_recipient_category_count">
                                        <i className="bx bx-plus"></i> <span data-key="t-widgets">Category Count</span>
                                    </Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
                {/* Sidebar */}
            </div>
            <div className="sidebar-background"></div>
        </div>
    );
};

export default Sidebar;

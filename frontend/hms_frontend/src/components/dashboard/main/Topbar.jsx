import React, { useState, useEffect } from 'react';

const Topbar = ({ toggleSidebar }) => {
    const [user, setUser] = useState(null);

    // Fetch user information from localStorage on component mount
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setUser(storedUser);
        }
    }, []);

    return (
        <header id="page-topbar">
            <div className="layout-width">
                <div className="navbar-header">
                    <div className="d-flex">
                        {/* LOGO */}
                        <div className="navbar-brand-box horizontal-logo">
                            <a href="/dashboard" className="logo logo-light">
                                <span className="logo-sm">
                                    <img src="/static/images/favicon/logo-sm.jpg" alt="" height="22" />
                                </span>
                                <span className="logo-lg">
                                    <img src="/static/images/favicon/logo-big.jpeg" alt="" height="17" />
                                </span>
                            </a>
                        </div>

                        {/* Hamburger Icon Button */}
                        <button
                            type="button"
                            className="btn btn-sm px-3 fs-16 header-item vertical-menu-btn topnav-hamburger"
                            id="topnav-hamburger-icon"
                            onClick={toggleSidebar}
                            title="Toggle Sidebar"
                        >
                            <span className="hamburger-icon">
                                <span></span>
                                <span></span>
                                <span></span>
                            </span>
                        </button>
                    </div>

                    <div className="d-flex align-items-center">
                        {user ? (
                            <div className="dropdown ms-sm-3 header-item topbar-user">
                                <button
                                    type="button"
                                    className="btn"
                                    id="page-header-user-dropdown"
                                    data-bs-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    data-bs-auto-close="outside" // Ensure dropdown closes when clicking outside
                                >
                                    <span className="d-flex align-items-center">
                                        {/* Profile Picture or Default Avatar */}
                                        {user.profilepic ? (
                                            <img className="rounded-circle header-profile-user" src={user.profilepic} alt="Avatar" />
                                        ) : (
                                            <i className="bi bi-person-circle text-muted fs-20 align-middle me-1"></i>
                                        )}
                                        <span className="text-start ms-xl-2">
                                            <span className="d-none d-xl-inline-block ms-1 fw-medium user-name-text">{user.username}</span>
                                            {/* Role or additional info */}
                                        </span>
                                    </span>
                                </button>
                                <div className="dropdown-menu dropdown-menu-end">
                                    {/* Dropdown items */}
                                    <h6 className="dropdown-header">Welcome {user.username}!</h6>
                                    <a className="dropdown-item" href="/ManageProfile">
                                        <i className="bi bi-person-circle text-muted fs-16 align-middle me-1"></i>
                                        <span className="align-middle">Profile</span>
                                    </a>
                                    {user.has_usable_password ? (
                                        <a className="dropdown-item" href="/password_change">
                                            <i className="bi bi-key text-muted fs-16 align-middle me-1"></i>
                                            <span className="align-middle">Change Password</span>
                                        </a>
                                    ) : (
                                        <a className="dropdown-item" href="#">
                                            <i className="bi bi-key text-muted fs-16 align-middle me-1"></i>
                                            <span className="align-middle">Set Password</span>
                                        </a>
                                    )}
                                    <a className="dropdown-item" href="/logout">
                                        <i className="bi bi-box-arrow-right text-muted fs-16 align-middle me-1"></i>
                                        <span className="align-middle">Logout</span>
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div>Loading...</div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Topbar;

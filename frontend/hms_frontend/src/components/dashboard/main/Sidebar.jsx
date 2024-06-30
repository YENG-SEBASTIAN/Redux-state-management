import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({ user }) => {
    const [openSection, setOpenSection] = useState(null);

    const toggleSubMenu = (section) => {
        if (openSection === section) {
            setOpenSection(null);
        } else {
            setOpenSection(section);
        }
    };

    return (
        <div className="app-menu navbar-menu bg-primary">
            {/* LOGO */}
            <div className="navbar-brand-box">
                {/* Light Logo */}
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
                    onClick={() => setOpenSection(null)}
                >
                    <i className="ri-record-circle-line"></i>
                </button>
            </div>

            <div id="scrollbar">
                <div className="container-fluid">
                    <ul className="navbar-nav" id="navbar-nav">
                        <li className="menu-title">
                            <span data-key="t-menu">Menu</span>
                        </li>

                        {/* Patient Section */}
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarPatient" data-bs-toggle="collapse" role="button" aria-expanded={openSection === 'patient'} onClick={() => toggleSubMenu('patient')} aria-controls="sidebarPatient">
                                <i className="bi bi-person"></i> <span data-key="t-patient">Patient</span>
                            </a>
                            <div className={`collapse menu-dropdown ${openSection === 'patient' ? 'show' : ''}`} id="sidebarPatient">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link to="/patient/registration" className="nav-link">Registration</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/patient/vitals" className="nav-link">Vitals</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Doctor Section */}
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarDoctor" data-bs-toggle="collapse" role="button" aria-expanded={openSection === 'doctor'} onClick={() => toggleSubMenu('doctor')} aria-controls="sidebarDoctor">
                                <i className="bi bi-people"></i> <span data-key="t-doctor">Doctor</span>
                            </a>
                            <div className={`collapse menu-dropdown ${openSection === 'doctor' ? 'show' : ''}`} id="sidebarDoctor">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link to="/doctor/diagnosis" className="nav-link">Diagnosis</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/doctor/medication" className="nav-link">Medication</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Laboratory Section */}
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarLaboratory" data-bs-toggle="collapse" role="button" aria-expanded={openSection === 'laboratory'} onClick={() => toggleSubMenu('laboratory')} aria-controls="sidebarLaboratory">
                                <i className="bi bi-flask"></i> <span data-key="t-laboratory">Laboratory</span>
                            </a>
                            <div className={`collapse menu-dropdown ${openSection === 'laboratory' ? 'show' : ''}`} id="sidebarLaboratory">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link to="/laboratory/testtypes" className="nav-link">Test Types</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/laboratory/results" className="nav-link">Results</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Pharmacy Section */}
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarPharmacy" data-bs-toggle="collapse" role="button" aria-expanded={openSection === 'pharmacy'} onClick={() => toggleSubMenu('pharmacy')} aria-controls="sidebarPharmacy">
                                <i className="bi bi-cart"></i> <span data-key="t-pharmacy">Pharmacy</span>
                            </a>
                            <div className={`collapse menu-dropdown ${openSection === 'pharmacy' ? 'show' : ''}`} id="sidebarPharmacy">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link to="/pharmacy/inventory" className="nav-link">Inventory</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/pharmacy/dispensation" className="nav-link">Medication Dispensation</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Appointment Section */}
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarAppointment" data-bs-toggle="collapse" role="button" aria-expanded={openSection === 'appointment'} onClick={() => toggleSubMenu('appointment')} aria-controls="sidebarAppointment">
                                <i className="bi bi-calendar-check"></i> <span data-key="t-appointment">Appointment</span>
                            </a>
                            <div className={`collapse menu-dropdown ${openSection === 'appointment' ? 'show' : ''}`} id="sidebarAppointment">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link to="/appointment/scheduling" className="nav-link">Scheduling</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/appointment/reminders" className="nav-link">Reminders</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Billing Section */}
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarBilling" data-bs-toggle="collapse" role="button" aria-expanded={openSection === 'billing'} onClick={() => toggleSubMenu('billing')} aria-controls="sidebarBilling">
                                <i className="bi bi-credit-card"></i> <span data-key="t-billing">Billing</span>
                            </a>
                            <div className={`collapse menu-dropdown ${openSection === 'billing' ? 'show' : ''}`} id="sidebarBilling">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link to="/billing/invoices" className="nav-link">Invoices</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/billing/payments" className="nav-link">Payment Records</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Administration Section */}
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarAdmin" data-bs-toggle="collapse" role="button" aria-expanded={openSection === 'administration'} onClick={() => toggleSubMenu('administration')} aria-controls="sidebarAdmin">
                                <i className="bi bi-gear"></i> <span data-key="t-administration">Administration</span>
                            </a>
                            <div className={`collapse menu-dropdown ${openSection === 'administration' ? 'show' : ''}`} id="sidebarAdmin">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link to="/administration/staff" className="nav-link">Staff Management</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/administration/facilities" className="nav-link">Facility Management</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>

                        {/* Medical Records Section */}
                        <li className="nav-item">
                            <a className="nav-link menu-link" href="#sidebarMedical" data-bs-toggle="collapse" role="button" aria-expanded={openSection === 'medical'} onClick={() => toggleSubMenu('medical')} aria-controls="sidebarMedical">
                                <i className="bi bi-file-earmark-medical"></i> <span data-key="t-medical-records">Medical Records</span>
                            </a>
                            <div className={`collapse menu-dropdown ${openSection === 'medical' ? 'show' : ''}`} id="sidebarMedical">
                                <ul className="nav nav-sm flex-column">
                                    <li className="nav-item">
                                        <Link to="/medical/history" className="nav-link">History</Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link to="/medical/reports" className="nav-link">Reports</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div className="sidebar-background"></div>
        </div>
    );
};

export default Sidebar;

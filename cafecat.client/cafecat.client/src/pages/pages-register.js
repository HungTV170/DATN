// src/pages/PagesRegister.js
import { Outlet, Link } from "react-router-dom";
import { main } from '../assets/js/main';
import React, { useEffect } from 'react';
import { useRegisterService } from '../services/register-services';

const PagesRegister = () => {
    const { formData, handleChange, handleSubmit } = useRegisterService();

    useEffect(() => {
        main(); 
    }, []); 

    return (
        <main>
            <div className="container">
                <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
                    <div className="container">
                        <div className="row justify-content-center">
                            <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                                <div className="d-flex justify-content-center py-4">
                                    <a href="index.html" className="logo d-flex align-items-center w-auto">
                                        <img src="assets/img/logo.png" alt="Logo"/>
                                        <span className="d-none d-lg-block">RESTAURANT MANAGER</span>
                                    </a>
                                </div>{/* End Logo */}

                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="pt-4 pb-2">
                                            <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                                            <p className="text-center small">Enter your personal details to create account</p>
                                        </div>

                                        <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                                        {/* <div className="col-12">
                                                <label htmlFor="yourFirstName" className="form-label">First Name</label>
                                                <div className="input-group has-validation">
                                                    <input 
                                                        type="text" 
                                                        name="firstName" 
                                                        className="form-control" 
                                                        id="yourFirstName" 
                                                        required 
                                                        value={formData.firstName}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">Please choose a username.</div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <label htmlFor="yourLastName" className="form-label">Last Name</label>
                                                <input 
                                                    type="text" 
                                                    name="lastName" 
                                                    className="form-control" 
                                                    id="yourLastName" 
                                                    required 
                                                    value={formData.lastName} 
                                                    onChange={handleChange} 
                                                />
                                                <div className="invalid-feedback">Please, enter your name!</div>
                                            </div> */}
                                            <div className="col-12">
                                                <label htmlFor="yourEmail" className="form-label">Your Email</label>
                                                <input 
                                                    type="email" 
                                                    name="email" 
                                                    className="form-control" 
                                                    id="yourEmail" 
                                                    required 
                                                    value={formData.email} 
                                                    onChange={handleChange} 
                                                />
                                                <div className="invalid-feedback">Please enter a valid Email address!</div>
                                            </div>

                                            {/* <div className="col-12">
                                                <label htmlFor="phoneNumber" className="form-label">phoneNumber</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text" id="inputGroupPrepend">@</span>
                                                    <input 
                                                        type="text" 
                                                        name="phoneNumber" 
                                                        className="form-control" 
                                                        id="phoneNumber" 
                                                        required 
                                                        value={formData.phoneNumber}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">Please choose a phoneNumber.</div>
                                                </div>
                                            </div> */}
                                            <div className="col-12">
                                                <label htmlFor="employeeId" className="form-label">Employee Id</label>
                                                <div className="input-group has-validation">
                                                    <span className="input-group-text" id="inputGroupPrepend">#</span>
                                                    <input 
                                                        type="text" 
                                                        name="employeeId" 
                                                        className="form-control" 
                                                        id="employeeId" 
                                                        required 
                                                        value={formData.employeeId}
                                                        onChange={handleChange}
                                                    />
                                                    <div className="invalid-feedback">Please choose a Employee Id.</div>
                                                </div>
                                            </div>

                                            <div className="col-12">
                                                <label htmlFor="yourPassword" className="form-label">Password</label>
                                                <input 
                                                    type="password" 
                                                    name="password" 
                                                    className="form-control" 
                                                    id="yourPassword" 
                                                    required 
                                                    value={formData.password}
                                                    onChange={handleChange}
                                                />
                                                <div className="invalid-feedback">Please enter your password!</div>
                                            </div>

                                            <div className="col-12">
                                                <div className="form-check">
                                                    <input 
                                                        className="form-check-input" 
                                                        name="terms" 
                                                        type="checkbox" 
                                                        value="" 
                                                        id="acceptTerms" 
                                                        required
                                                    />
                                                    <label className="form-check-label" htmlFor="acceptTerms">
                                                        I agree and accept the <a href="#">terms and conditions</a>
                                                    </label>
                                                    <div className="invalid-feedback">You must agree before submitting.</div>
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <button className="btn btn-primary w-100" type="submit">Create Account</button>
                                            </div>
                                            <div className="col-12">
                                                <p className="small mb-0">Already have an account? <Link to={process.env.REACT_APP_PATH_LOGIN}>Log in</Link></p>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                                <div className="credits">
                                    Designed by <a href="#">hungtranvan170@gmail.com</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </main>
    );
};

export default PagesRegister;

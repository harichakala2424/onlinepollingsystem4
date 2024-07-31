import React from 'react'
import  aboutImg from '../images/about.png';
const Home = () => {
    return (
        <div>
            <section className="py-5 hero-bg">
                <div className="container-fluid">
                    <div className="row ">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="my-2 hero-content text-center">
                                <h1 className="text-dark primary-heading" style={{ fontSize: '3rem !important', lineHeight: '50px' }}>
                                    <span className="text-danger fs-1 "> Sharing Your Opinion  </span><br /><span className="fs-1"> By Rating Products & Brands Around The World</span>
                                </h1>
                                <p className="my-2 text-dark lead">
                                    Our Team has excellent Experience, and we can help you to gather Accurate and Reliable data
                                </p>
                                <a href="/Login" className=" my-3 btn btn-outline-dark px-4 py-2 rounded-pill ">Participate Survey</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-5 hero-bg-1">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5">
                            <div className="my-2">
                                <img src={aboutImg} alt="Test" className="img-fluid" />
                            </div>
                        </div>
                        {/* end of the first col */}
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6">
                            <div className="my-2">
                                <h1 className="text-dark secondary-heading">Just Take A Few Minutes To Submit<br></br>the Survey</h1>
                                <p className="text-dark my-2">Intellisense Solutions aims to Connect Candidates and Parties to Parliament, Assembly Constituencies, and Municipal Corporations. It is a South India-based Consulting firm facilitating the Election Management and Good Governance Process for Candidates, Young Leaders, Ministers, Members of Parliament (MP), Members of Legislative Assemblies (MLA), Civil Society Groups, NGOs, Government, and independent organizations.</p>
                                <a href="#aboutId" className="btn btn-outline-danger px-4 rounded-pill py-2 my-2">Know More</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/*end of the section*/}
            <section className="py-5 bg-home" id="aboutId">
                <div className="container">
                    <div className="row justify-content-center align-items-center">
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                            <div className="my-2 pb-5">
                                <h1 className="text-dark secondary-heading fs-1 text-center">
                                    See How It Works In<span className="text-danger">  3 Simple Steps</span>
                                </h1>
                            </div>
                        </div>
                        {/*end of the first col*/}
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 text-center">
                        <div className="my-2  shadow-sm p-3 rounded-4">
                                <div>
                                    <span class="material-symbols-outlined fs-1 p-2 rounded-circle text-white bg-warning">
                                        open_in_new
                                    </span>
                                </div>
                                <h2 className="text-dark secondary-heading py-3 fs-5">Signup For Free</h2>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1">
                            <div className="my-2">
                                <div>
                                    <span class="material-symbols-outlined fs-1">
                                        arrow_right_alt
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 text-center">
                        <div className="my-2  shadow-sm p-3 rounded-4">
                                <div>
                                    <span class="material-symbols-outlined fs-1 p-2 rounded-circle text-white bg-red">
                                        open_in_new
                                    </span>
                                </div>
                                <h2 className="text-dark secondary-heading py-3 fs-5">Participate In Surveys</h2>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-1 col-lg-1">
                        <div className="my-2 ">
                            <div>
                                    <span class="material-symbols-outlined fs-1">
                                        arrow_right_alt
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-2 col-lg-2 text-center">
                            <div className="my-2  shadow-sm p-3 rounded-4">
                                <div>
                                    <span class="material-symbols-outlined fs-1 p-2 rounded-circle text-white bg-primary">
                                        open_in_new
                                    </span>
                                </div>
                                <h2 className="text-dark secondary-heading py-3 fs-5">Express you Opinion</h2>
                            </div>
                        </div>
                        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">
                            <div className="my-5">
                                <a href="/Register" className="btn btn-outline-danger px-4 py-2 rounded-pill">Register Now</a>
                            </div>
                        </div>
                       

                    </div>
                </div>
            </section>
     
        </div>
    )
}


export default Home;
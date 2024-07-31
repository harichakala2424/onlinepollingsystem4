import React, { Fragment, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { _post } from '../services';
import { useDispatch } from 'react-redux';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (e) => {
        setData({ ...data, [e.target.name]: e.target.value })
    }
    const handleLogin = (e) => {
        e.preventDefault()
        _post("login", data)
            .then(data => {
                alert(data.message)
                sessionStorage.setItem("token", data.token)
                sessionStorage.setItem("first_name", data.user.first_name)
                sessionStorage.setItem("last_name", data.user.last_name)
                dispatch({ type: "ISLOGGEDIN", payload: data.user })
                navigate('/dashboard');
            })
            .catch(error => {
                return alert(error.response.data.message)
            })

    }
    return (
       
     <section className='py-5' style={{height:'100vh', overflow:'hidden'}}>
     <div className='container'>
         <div className='row align-items-center'>
             <div className='col-xs-12 col-sm-12 col-md-5 col-lg-5'>
                 <div className='my-2'>
                 <Fragment>
            <div className='login' style={{position:'relative', bottom:'50px'}}>
                <div className='login_content p-5 shadow rounded-5'>
                    <div className='text-center pb-2'>
                        <h4 className='text-start'>Login to Complete the Survey</h4>
                    </div>
                    <form onSubmit={handleLogin}>
                        <div className="mb-2">
                            
                            <input
                                type="email"
                                className="form-control rounded-pill"
                                placeholder="E-mail"
                                name='email'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-2">
                           
                            <input
                                type="password"
                                className="form-control rounded-pill"
                                placeholder="Password"
                                name='password'
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className='submit_btn'>
                            <button className='btn btn-outline-primary rounded-pill px-5 py-2 mt-3' >Login</button>
                        </div>
                        <p className='text-secondary mt-3'>Don't  have account <a href='/sign-up' className='text-primary'>Click here</a> to Signup</p>
                        <p className='text-secondary mt-3'>
                            Visit Our  pages
                        </p>
                        <div className='d-flex justify-content-start'>
                            <div>
                                <a href=''>
                                    <i class="fa fs-4 fa-facebook" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div className='px-2'>
                                <a href=''>
                                    <i class="fa fs-4 fa-instagram" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div className='px-2'>
                                <a href=''>
                                    <i class="fa fs-4 fa-twitter" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div className='px-2'>
                                <a href=''>
                                    <i class="fa fs-4 fa-linkedin" aria-hidden="true"></i>
                                </a>
                            </div>
                            <div className='px-2'>
                                <a href=''>
                                    <i class="fa fs-4 fa-youtube" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
           
        </Fragment>
                 </div>
             </div>
             {/* end of the first col */}
             <div className='col-xs-12 col-sm-12 col-md-7 col-lg-7 '>
                <div className='my-2'>
                    <img src='https://img.freepik.com/free-vector/reviews-concept-landing-page_52683-18921.jpg?w=1060&t=st=1713665568~exp=1713666168~hmac=ece95f7abd28e3433b5b66a7824124851c7ca4f47f115669c626319963ab5969' className='img-fluid'/>
                </div>
             </div>
         </div>
     </div>
 </section>
    )
}

export default Login
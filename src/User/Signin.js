import React, {Component} from "react"
import {Redirect} from 'react-router-dom'
import '../App.css'

class Signin extends Component {
    constructor() {
        super();
        this.state = {
            tel: "",
            password: "",
            error: "",
            redirectToRefer: false
        };
    }

    handleChanege = email => event => {
        this.setState({error: ""});
        this.setState({[email]: event.target.value});
    };

    authenticate(jwt, next) {
        if (typeof window !== "undefined") {
            localStorage.setItem("jwt", JSON.stringify(jwt))
            next();
        }
    }

    clickSubmit = event => {
        event.preventDefault();
        const {tel, password} = this.state;
        const user = {
            tel,
            password
        };


        fetch("http://172.31.100.106:8082/user/logIn", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                console.log(response.json());
                return response.json();
            })
            .catch(err => console.log(err));
    };


    signinForm = (tel, password) => (

        <div id="main">
            <div className="App container justify-content-center col-2">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group user">
                            <label className="text-muted">شماره موبایل</label>
                            <input
                                onChange={this.handleChanege("tel")}
                                type="tel"
                                className="form-control"
                                placeholder="09*********"
                                value={tel}
                            />
                        </div>
                        <div className="form-group">
                            <label className="text-muted">کلمه عبور</label>
                            <input
                                onChange={this.handleChanege("password")}
                                type="password"
                                className="form-control"
                                placeholder="********"
                                value={password}
                            />
                        </div>
                        <div>
                            <button onClick={this.clickSubmit} className="login-btn btn-raised btn-primary">ورود
                            </button>
                        </div>
                        <div className="remember-item d-flex justify-content-between">
                            <label className="main-checkbox">
                                <input className="filled-in" type="checkbox"/>
                                <span className="remember">مرا به خاطر بسپار</span>
                            </label>
                            <a href="#" className="signup">ثبت نام کنید</a>
                        </div>
                        <div>
                            <p>
                                <a className="recovery" href="#">فراموشی کلمه عبور؟</a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        /*<form>
            <div className="form-group">
                <label className="text-muted">ایمیل خود را وارد کنید</label>
                <input
                    onChange={this.handleChanege("email")}
                    type="email"
                    className="form-control"
                    value={email}
                    placeholder="@gmail.com"
                />
            </div>
            <div className="form-group">
                <label className="text-muted">کلمه عبور</label>
                <input
                    onChange={this.handleChanege("password")}
                    type="password"
                    className="form-control"
                    value={password}
                />
            </div>
            <button onClick={this.clickSubmit} className="btn btn-raised btn-primary">ورود</button>
        </form>*/
    );

    render() {
        const {tel, password, error, redirectToReferer} = this.state;

        if (redirectToReferer) {
            return <Redirect to={"/"}/>
        }

        return (
            this.signinForm(tel, password)
            //     <div className="container">
            //       <h2 className="mt-5 mb-5">وارد شوید</h2>

            //         <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
            //             {error}
            //        </div>
            //          {this.signinForm(email, password)}
            //      </div>
        )
    }
}

export default Signin;
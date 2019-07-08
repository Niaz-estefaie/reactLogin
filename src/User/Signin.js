import React, {Component} from "react"
import {Redirect} from 'react-router-dom'

class Signin extends Component{
   constructor(){
       super();
       this.state = {
           email: "",
           password: "",
           error: "",
           redirectToRefer: false
       };
   }
   handleChanege = email => event => {
       this.setState({error: ""});
       this.setState({[email]: event.target.value});
   };

   authenticate (jwt, next){
       if(typeof window !== "undefined"){
           localStorage.setItem("jwt", JSON.stringify(jwt))
           next();
       }
   }

   clickSubmit = event => {
       event.preventDefault();
       const {email, password} = this.state;
       const user = {
           email,
           password
       };
       this.signin(user)
           .then(data => {
           if (data.error) {
               this.setState({error: data.error})
           }
           else
               {
                   //authenticate
                   this.authenticate(data, () =>{
                    this.setState({redirectToRefer: true})
                   })
               }
               });
       }


   signin = user => {
       return fetch("url/signin", {
          method: "POST",
          headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
          },
           body: JSON.stringify(user)
       })
           .then(response => {
               return response.json();
           })
           .catch(err => console.log(err));
   }

   signinForm = (email, password) => (

       <form>
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
       </form>
   )

   render()
{
    const {email, password, error} = this.state;
    return (
        <div className="container">
            <h2 className="mt-5 mb-5">وارد شوید</h2>

            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                {error}
            </div>
            {this.signinForm(email, password)}
        </div>
    )}
}

export default Signin;
import React, {Component} from "react"

class Signin extends Component{
   constructor(){
       super();
       this.state = {
           userName: "",
           password: "",
           error: "",
           redirectToRefer: false
       };
   }
   handleChanege = userName => event => {
       this.setState({error: ""});
       this.setState({[userName]: event.target.value});
   };

   clickSubmit = event => {
       event.preventDefault();
       const {userName , password} = this.state;
       const user = {
           userName,
           password
       };
       this.signin(user)
           .then(data => {
           if (data.error) {
               this.setState({error: data.error})
           }
           else
               {
               }
               });
       }
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

   signinForm = (userName, password) => (

       <form>
           <div className="form-group">
               <label className="text-muted">نام کاربری</label>
               <input
               onChange={this.handleChanege("username")}
               type="email"
               className="form-control"
               value={username}
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
    const {userName, password, error} = this.state;
    return (
        <div className="container">
            <h2 className="mt-5 mb-5">SignIn</h2>

            <div className="alert alert-danger" style={{display: error ? "" : "none"}}>
                {error}
            </div>
            {this.signinForm(userName, password)}
        </div>
    )}
}

export default Signin;
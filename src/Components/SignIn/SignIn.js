import React from 'react'
import './SignIn.css'


class SignIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            SignInEmail: '',
            SignInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({ SignInEmail: event.target.value })
    }
    onPasswordChange = (event) => {
        this.setState({ SignInPassword: event.target.value })
    }
    onSubmitSignIn = (event) => {
        fetch('https://face-detection-api-47.herokuapp.com/signin', {
            method: 'post',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                email: this.state.SignInEmail,
                password: this.state.SignInPassword
            })
        })
            .then(response => response.json())
            .then(user => {
                if (user.id) {
                    this.props.loadUser(user)
                    this.props.onRouteChange('home');
                } else {
                    alert('Wrong Credentials')
                }
            })
        event.preventDefault();
    }





    render() {
        const { onRouteChange } = this.props;
        return (
            <div>
                <article className="mw6 shadow-5 center  br3 pa3 pa2-ns mv3 ba ">
                    <main className="pa4 black-80">
                        <form className="measure center">
                            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                                <legend className="f2 fw6 ph0 mh0">Sign In</legend>
                                <div className="mt3">
                                    <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                    <input
                                        onChange={this.onEmailChange}
                                        className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="email"
                                        name="email-address"
                                        id="email-address" />
                                </div>
                                <div className="mv3">
                                    <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                    <input
                                        onChange={this.onPasswordChange}
                                        className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                                        type="password"
                                        name="password"
                                        id="password" />
                                </div>
                                {/* <label class="pa0 ma0 lh-copy f6 pointer"><input type="checkbox"/> Remember me</label> */}
                            </fieldset>
                            <div className="">
                                <input
                                    onClick={this.onSubmitSignIn}
                                    className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                    type="submit"
                                    value="Sign in" />
                            </div>
                            <div className="lh-copy mt3">
                                <p onClick={() => onRouteChange('register')} className="f6 pointer link dim black db">Register</p>
                                {/* <a href="#0" class="f6 link dim black db">Forgot your password?</a> */}
                            </div>
                        </form>
                    </main>
                </article>
            </div>
        )
    }

}

export default SignIn

import React, { Component } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Checkbox from '@material-ui/core/Checkbox'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import LockIcon from '@material-ui/icons/LockOutlined'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import axios from 'axios'
import './SignIn.css'

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loginId: '',
			password: '',
			userType: '',
			correct: true,
		}
	}
	handleChange = name => event => {
	  this.setState({[name]: event.target.value});
	}
	onKeyPress = event => {
		event.preventDefault()
		
		axios
      .post("https://find-me-apiserver.herokuapp.com/api/users/signIn", {
      		loginId: this.state.loginId,
      		password: this.state.password,
	      }, {
	        headers: {
	          'Content-Type': 'application/json',
	    	  }
    	})
      .then(results => {
        const message = results.data
        if(message.status === true) this.props.history.push('/'+message.user_type+'/'+message.user_id+'/'+message.furigana)
        else this.setState({correct: false})
      })
	}
	changeSignUp = () => {
		//this.props.history.push("/signUp")
	}
	render() {
		return (
			<div className="sign-in">
				<Paper className="sign-in-paper">
	        <Avatar>
	          <LockIcon />
	        </Avatar>
	        <Typography component="h1" variant="h5">
	          Sign in
	        </Typography>
	        <form className="sign-in-form" onSubmit={this.onKeyPress}>
	          <FormControl margin="normal" required fullWidth>
	            <InputLabel htmlFor="email">Email Address</InputLabel>
	            <Input id="email" value={this.state.loginId} onChange={this.handleChange('loginId')} name="email" autoComplete="email" autoFocus />
	          </FormControl>
	          <FormControl margin="normal" required fullWidth>
	            <InputLabel htmlFor="password">Password</InputLabel>
	            <Input
	              name="password"
	              type="password"
	              id="password"
	              value={this.state.password}
	              onChange={this.handleChange('password')}
	              autoComplete="current-password"
	            />
	          </FormControl>
	          <p className="sign-up-form-error">{this.state.correct ? "" : "*メールアドレスまたはパスワードが正しくありません"}</p>
	          <Button
	            type="submit"
	            fullWidth
	            variant="contained"
	            color="primary"
	          >
	            Sign in
	          </Button>
	        </form>
	        <div className="other-login">
          	<a href="/signUp" className="other-login-item">Sign up</a>
          	<a href="/signUp" className="other-login-item">Guest</a>
          </div>
	      </Paper>
      </div>
		)
	}
}
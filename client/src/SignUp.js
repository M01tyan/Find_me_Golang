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
import RadioGroup from '@material-ui/core/RadioGroup'
import Radio from '@material-ui/core/Radio'
import FormLabel from '@material-ui/core/FormLabel'
import axios from 'axios'
import './SignIn.css'

export default class SignIn extends Component {
	constructor(props) {
		super(props)
		this.state = {
			loginId: '',
			password: '',
			repassword: '',
			userType: '',
			email_correct: true,
			password_correct: true,
		}
	}
	handleChange = name => event => {
	  this.setState({[name]: event.target.value})
	}
	onKeyPress = event => {
		event.preventDefault()
		if(this.state.password === this.state.repassword) {
			axios
	      .post("http://localhost:8000/api/users/signUp", {
	    	  	loginId: this.state.loginId,
	    	  	password: this.state.password,
	    	  	userType: this.state.userType
	    	  }, {
	        headers: { 'Content-Type': 'application/json; charset=utf-8' }
	    	})
	      .then(results => {
	      	this.setState({password_correct: true})
	        const message = results.data
	        console.log(message)
	        if(message.status === true) {
	        	this.props.history.push('/'+message.user_type+'/'+message.user_id+'/edits/new')
	        } else {
	        	this.setState({email_correct: false})
	        }
	      })
		} else {
			this.setState({password_correct: false})
		}
	}
	render() {
		return (
			<div className="sign-in">
				<Paper className="sign-in-paper">
	        <Avatar>
	          <LockIcon />
	        </Avatar>
	        <Typography component="h1" variant="h5">
	          Sign up
	        </Typography>
	        <form className="sign-in-form" onSubmit={this.onKeyPress}>
	          <FormControl margin="normal" required fullWidth>
	            <InputLabel htmlFor="email">Email Address</InputLabel>
	            <Input id="email" value={this.state.loginId} onChange={this.handleChange('loginId')} name="email" autoComplete="email" autoFocus />
	            <p className="sign-up-form-error">{this.state.email_correct ? "" : "*このメールアドレスはすでに登録されています"}</p>
	          </FormControl>
	          <FormControl margin="normal" required fullWidth className="sign-in-form-password">
	            <InputLabel htmlFor="password" >Password</InputLabel>
	            <Input
	              name="password"
	              type="password"
	              id="password"
	              value={this.state.password}
	              onChange={this.handleChange('password')}
	            />
	          </FormControl>
	          <FormControl margin="normal" required fullWidth>
	            <InputLabel htmlFor="password">Re:Password</InputLabel>
	            <Input
	              name="password"
	              type="password"
	              id="repassword"
	              value={this.state.repassword}
	              onChange={this.handleChange('repassword')}
	            />
	            <p className="sign-up-form-error">{this.state.password_correct ? "" : "*パスワードが一致しません"}</p>
	          </FormControl>
	          <FormControlLabel
	            control={<Checkbox value="remember" color="primary" />}
	            label="Remember me"
	          />
	          <FormControl component="fieldset" className="sign-up-user-type" required>
              <FormLabel>User Type</FormLabel>
              <RadioGroup
                row
                name="user_type"
                aria-label="user_type"
                value={this.state.userType}
                onChange={this.handleChange('userType')}
              >
                <FormControlLabel value="student" control={<Radio />} label="student" />
                <FormControlLabel value="company" control={<Radio />} label="company" />
              </RadioGroup>
            </FormControl>
	          <Button
	            type="submit"
	            fullWidth
	            variant="contained"
	            color="primary"
	          >
	            Sign in
	          </Button>
	        </form>
	      </Paper>
      </div>
		)
	}
}
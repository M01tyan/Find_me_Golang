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
		}
	}
	handleChange = name => event => {
	  this.setState({[name]: event.target.value});
	}
	onKeyPress = event => {
		event.preventDefault()
		
		axios
      .post("http://localhost:8000/api/users/signIn", {
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
        else console.log("error")
      })
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
	        <form className="sing-in-form" onSubmit={this.onKeyPress}>
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
	          <FormControlLabel
	            control={<Checkbox value="remember" color="primary" />}
	            label="Remember me"
	          />
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
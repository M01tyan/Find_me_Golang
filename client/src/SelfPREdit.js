import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import './Edits.css'

export default class SelfPREdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			selfpr: '',
			textFieldSize: Math.floor(window.parent.screen.height/50),
		}
	}
	componentDidMount() {
		const path = window.location.pathname
    const paths = path.split("/")
    axios
      .get("https://find-me-apiserver.herokuapp.com/api/users/"+paths[1]+"/"+paths[2]+"/edits/selfpr", {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        let message = results.data
        this.setState({selfpr: message})
      })
	}
	handleChange = name => event => {
		this.setState({selfpr: event.target.value})
	}
	handleChangeSubmit = () => {
		const path = window.location.pathname
    const paths = path.split("/")
    axios
      .post("https://find-me-apiserver.herokuapp.com/api/users/"+paths[1]+"/"+paths[2]+"/edits/selfpr", {
      	selfpr: this.state.selfpr
      }, {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        let message = results.data
        console.log(message)
      })
	}
  render() {
  	return (
  		<div className="edit-form-career">
  			<Card className="edit-form-career-card edit-form-now">
  				<div className="edit-form-career-card-div">
	  				<CardHeader
		          title="自己PR"
		          style={{paddingBottom: 0}}
		        />
            <CardContent className="edit-form-career-card-content">
				      <TextField
			          id="filled-full-width"
			          label="自己PRを入力"
			          value={this.state.selfpr}
			          onChange={this.handleChange('now')}
			          fullWidth
			          multiline
          			rows={this.state.textFieldSize}
			          margin="normal"
			          className="edit-form-career-text-field"
			          variant="outlined"
			          InputLabelProps={{
			            shrink: true,
			          }}
			        />
            </CardContent>
          </div>
        </Card>
        <div className="edit-form-career-button">
	        <Button variant="outlined" color="primary" onClick={this.handleChangeSubmit}>
	          POST
	        </Button>
	      </div>
	    </div>
  	)
  }
}
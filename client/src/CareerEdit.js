import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Button from '@material-ui/core/Button'
import axios from 'axios'
import './Edits.css'

export default class SkillEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			career: {
				now: '',
				near_future: '',
				goal: '',
			},
			textFieldSize: window.parent.screen.width,
		}
	}
	handleChange = name => event => {
		let { career } = this.state
		career[name] = event.target.value
		this.setState({career: career})
	}
  render() {
  	return (
  		<div className="edit-form-career">
  			<Card className="edit-form-career-card edit-form-now">
  				<div className="edit-form-career-card-div">
	  				<CardHeader
		          title="現在"
		          style={{paddingBottom: 0}}
		        />
            <CardContent className="edit-form-career-card-content">
				      <TextField
			          id="filled-full-width"
			          label="あなたの略歴を入力"
			          value={this.state.career.now}
			          onChange={this.handleChange('now')}
			          fullWidth
			          multiline
          			rows="15"
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
        <Card className="edit-form-career-card edit-form-near">
  				<div className="edit-form-career-card-div">
	  				<CardHeader
		          title="近未来"
		          style={{paddingBottom: 0}}
		        />
            <CardContent className="edit-form-career-card-content">
				      <TextField
			          id="filled-full-width"
			          label="あなたの略歴を入力"
			          value={this.state.career.near}
			          onChange={this.handleChange('near')}
			          fullWidth
			          multiline
          			rows="15"
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
        <Card className="edit-form-career-card edit-form-future">
  				<div className="edit-form-career-card-div">
	  				<CardHeader
		          title="未来"
		          style={{paddingBottom: 0}}
		        />
            <CardContent className="edit-form-career-card-content">
				      <TextField
			          id="filled-full-width"
			          label="あなたの略歴を入力"
			          value={this.state.career.future}
			          onChange={this.handleChange('future')}
			          fullWidth
			          multiline
          			rows="15"
			          margin="normal"
			          variant="outlined"
			          InputLabelProps={{
			            shrink: true,
			          }}
			        />
            </CardContent>
          </div>
        </Card>
        <div className="edit-form-career-button">
	        <Button variant="outlined" color="primary" onClick={console.log(window.parent.screen.width)}>
	          POST
	        </Button>
	      </div>
	    </div>
  	)
  }
}
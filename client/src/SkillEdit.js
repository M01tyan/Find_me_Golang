import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import GoodStar from './images/star_good.png'
import NotStar from './images/star.png'
import './Edits.css'

export default class SkillEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			skills: [],
		}
	}
	changeSkill = (i, j) => {
		let skills = this.state.skills
		skills[i].lebel = j + 1
		this.setState({skills: skills})
	}
	deleteSkill = (i) => event => {
		let skills = this.state.skills
		skills.splice(i, 1)
		this.setState({skills: skills})
	}
	pushNewSkill = (new_skill) => {
		let skills = this.state.skills
		skills.push(new_skill)
		this.setState(skills: skills)
	}
  render() {
  	return (
  		<div className="edit-form-skill">
	  	  <Table className="edit-form-skill-table">
	        <TableHead>
	          <TableRow>
	            <TableCell>Programming Language</TableCell>
	            <TableCell>Skill</TableCell>
	            <TableCell>Comment</TableCell>
	            <TableCell>Delete</TableCell>
	          </TableRow>
	        </TableHead>
	        <TableBody>
	          {this.state.skills.map((skill, i) => {
	          	return (
			          <TableRow key={i}>
			            <TableCell component="th" scope="row">
			              {skill.language}
			            </TableCell>
			            <TableCell className="edit-form-skill-star"><SkillStar skill={skill.lebel} id={i} changeSkill={this.changeSkill} /></TableCell>
			            <TableCell className="edit-form-skill-comment">{skill.comment}</TableCell>
			            <TableCell>
			            	<IconButton aria-label="Delete" onClick={this.deleteSkill(i)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
			          </TableRow>
			        )
	          })}
	          <NewSkillEdit pushNewSkill={this.pushNewSkill} />
	        </TableBody>
	      </Table>
	    </div>
  	)
  }
}

class NewSkillEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			new_skill: {
				language: '',
				lebel: 0,
				comment: '',
			},
		}
	}
	changeSkill = (i, j) => {
		let new_skill = this.state.new_skill
		new_skill.lebel = j + 1
		this.setState({new_skill: new_skill})
	}
	handleChange = name => event => {
		let new_skill = this.state.new_skill
		new_skill[name] = event.target.value
		this.setState({new_skill: new_skill})
	}
	handleSkillSubmit = event => {
		if(this.state.new_skill.language !== '' && this.state.new_skill.lebel > 0 ){
			this.props.pushNewSkill(this.state.new_skill)
			this.setState({new_skill: {language: '', lebel: 0, comment: ''}})
		}
	}
	render() {
		return (
			<TableRow>
        <TableCell component="th" scope="row" className="edit-form-skill-language">
        	<TextField
            required
            id="standard-required"
            label="Language"
            type="search"
            value={this.state.new_skill.language}
            onChange={this.handleChange('language')}
            className="edit-form-skill-text-field"
            margin="normal"
          />
        </TableCell>
        <TableCell className="edit-form-skill-star"><SkillStar id={0} skill={this.state.new_skill.lebel} changeSkill={this.changeSkill} /></TableCell>
        <TableCell className="edit-form-skill-comment">
        	<TextField
            required
            id="standard-required"
            label="Comment"
            type="search"
            value={this.state.new_skill.comment}
            onChange={this.handleChange('comment')}
            className="edit-form-skill-text-field"
            margin="normal"
          />
        </TableCell>
        <TableCell>
        	<Button variant="outlined" color="primary" onClick={this.handleSkillSubmit}>
            POST
          </Button>
        </TableCell>
      </TableRow>
		)
	}
}

class SkillStar extends Component {
	pushStar = (i) => event => {
		this.props.changeSkill(this.props.id, i)
	}
	render() {
		let Star = []
	  for(let i=0; i<5; i++){
	  	if(i < this.props.skill) {
	  		Star.push(<Button variant="fab" className="edit-form-skill-star-button" onClick={this.pushStar(i)} key={i}><img src={GoodStar} alt={i} style={{width: 20, height: 20}} /></Button>)
	  	} else {
	  		Star.push(<Button variant="fab" className="edit-form-skill-star-button" onClick={this.pushStar(i)} key={i}><img src={NotStar} alt={i} style={{width: 20, height: 20}} /></Button>)
	  	}
	  }
		return (
			<div className="edit-form-skill-star-item">
				{Star}
			</div>
		)
	}
}

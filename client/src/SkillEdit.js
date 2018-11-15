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
			new_skill: {
				id: 1,
				language: '',
				level: 0,
				comment: '',
			}
		}
	}
	componentWillMount() {
		const path = window.location.pathname
    const paths = path.split("/")
    axios
      .get("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/skills", {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        let message = results.data
        if(message === null) message = []
        let new_skill = this.state.new_skill
      	new_skill.id = message.length+1
        this.setState({new_skill: new_skill})
        this.setState({skills: message})
      })
	}
	updateSkill = (skill) => {
		const path = window.location.pathname
    const paths = path.split("/")
    axios
      .patch("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/skills", {
      	id: skill.id,
      	language: skill.language,
      	level: skill.level,
      	comment: skill.comment
      }, {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        let message = results.data
        console.log(message)
      })
	}
	deleteSkill = (i) => event => {
		let skills = this.state.skills
		skills.splice(i, 1)
		this.setState({skills: skills})
	}
	pushNewSkill = (new_skill) => {
		const path = window.location.pathname
    const paths = path.split("/")
    axios
      .post("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/skills", {
      	id: new_skill.id,
      	language: new_skill.language,
      	level: new_skill.level,
      	comment: new_skill.comment
      }, {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
				let skills = this.state.skills
				skills.push(new_skill)
				this.setState({new_skill: {id: new_skill.id+1, language: '', level: 0, comment: ''}})
				this.setState(skills: skills)
      })
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
	            <TableCell>Update</TableCell>
	            <TableCell>Delete</TableCell>
	          </TableRow>
	        </TableHead>
	        <TableBody>
	          {this.state.skills.map((skill, i) => {
	          	return (
	          		<SkillEditItem skill={skill} deleteSkill={this.deleteSkill(i)} changeSkills={this.updateSkill} value={i} key={i} />
	          	)
	          })}
	          <SkillEditItem skill={this.state.new_skill} changeSkills={this.pushNewSkill} value={null} />
	        </TableBody>
	      </Table>
	    </div>
  	)
  }
}

class SkillEditItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			skill: this.props.skill,
		}
	}
	componentWillReceiveProps(nextProps) {
    this.setState({skill: nextProps.skill})
  }
	handleChange = name => event => {
		let skill = this.state.skill
		skill[name] = event.target.value
		this.setState({skill: skill})
	}
	changeSkill = (j) => {
		let skill = this.state.skill
		skill.level = j + 1
		this.setState({skill: skill})
	}
	deleteSkill = event => {
		const path = window.location.pathname
    const paths = path.split("/")
    axios
      .delete("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/skills", {
      	params: {
      		id: this.state.skill.id
      	}
      })
      .then(results => {
				this.props.deleteSkill(this.props.value)
      })
	}
	changeSkills = event => {
		this.props.changeSkills(this.state.skill)
	}
	render() {
		return (
			<TableRow>
        <TableCell component="th" scope="row">
          <TextField
            required
            id="standard-required"
            label="Language"
            type="search"
            value={this.state.skill.language}
            onChange={this.handleChange('language')}
            className="edit-form-skill-text-field"
            margin="normal"
          />
        </TableCell>
        <TableCell className="edit-form-skill-star">
        <SkillStar skill={this.state.skill.level} changeSkill={this.changeSkill} /></TableCell>
        <TableCell className="edit-form-skill-comment">
        	<TextField
            required
            id="standard-required"
            label="Language"
            type="search"
            value={this.state.skill.comment}
            onChange={this.handleChange('comment')}
            className="edit-form-skill-text-field"
            margin="normal"
          />
        </TableCell>
        <TableCell>
        	<Button variant="outlined" color="primary" onClick={this.changeSkills}>
            {this.props.value == null ? "POST" : "UPDATE"}
          </Button>
        </TableCell>
        <TableCell>
        	<IconButton aria-label="Delete" >
            <DeleteIcon onClick={this.deleteSkill}/>
          </IconButton>
        </TableCell>
      </TableRow>
		)
	}
}

class SkillStar extends Component {
	pushStar = (i) => event => {
		this.props.changeSkill(i)
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

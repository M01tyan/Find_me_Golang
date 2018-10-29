import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import axios from 'axios'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete'
import './Edits.css'

export default class SkillEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			histories: [],
			history: '',
		}
	}
	handleChange = name => event => {
		this.setState({history: event.target.value})
	}
	onKeyPress = event => {
		if (event.charCode === 13) { // enter key pressed
      // do something here
      event.preventDefault()
      let histories = this.state.histories
      histories.push(event.target.value)
      this.setState({histories: histories})
      this.setState({history: ''})
    } 
	}
	deleteHistory = i => event => {
		let histories = this.state.histories
		histories.splice(i, 1)
		this.setState({histories: histories})
	}
  render() {
  	return (
  		<div className="edit-form-histories">
  			<Table style={{minWidth: 500}}>
	        <TableHead>
	          <TableRow>
	            <TableCell numeric className="edit-form-history-id">Order(順番)</TableCell>
	            <TableCell>History(略歴)</TableCell>
	            <TableCell style={{width: 70, paddingRight: 0}}>Delete</TableCell>
	          </TableRow>
	        </TableHead>
	        <TableBody>
	          {this.state.histories.map((history, i) => {
	            return (
	              <TableRow key={i+1}>
	                <TableCell component="th" scope="row" numeric className="edit-form-history">{i+1}</TableCell>
	                <TableCell>{history}</TableCell>
	                <TableCell>
	                	<IconButton aria-label="Delete" onClick={this.deleteHistory(i)}>
                      <DeleteIcon />
                    </IconButton>
	                </TableCell>
	              </TableRow>
	            );
	          })}
	        </TableBody>
	      </Table>
	      <TextField
          id="filled-full-width"
          label="あなたの略歴を入力"
          value={this.state.history}
          onChange={this.handleChange('history')}
          style={{minWidth: 500}}
          fullWidth
          margin="normal"
          variant="filled"
          InputLabelProps={{
            shrink: true,
          }}
          onKeyPress={this.onKeyPress}
        />
	    </div>
  	)
  }
}
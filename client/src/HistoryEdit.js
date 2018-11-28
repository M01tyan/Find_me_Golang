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

export default class HistoryEdit extends Component {
	constructor(props) {
		super(props)
		this.state = {
			histories: [],
			history: {
				id: 0,
				content: '',
			},
		}
	}
	handleChange = name => event => {
		let history = this.state.history
		history[name] = event.target.value
		this.setState({history: history})
	}
	onKeyPress = event => {
		if (event.charCode === 13) { // enter key pressed
      // do something here
      event.preventDefault()
      const path = window.location.pathname
	    const paths = path.split("/")
	    axios
	      .post("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/histories", {
	      	id: this.state.history.id,
	      	content: this.state.history.content
	      }, {
	        headers: {
	          'Content-Type': 'application/json',
	      }})
	      .then(results => {
	        // let message = results.data
	        // if(message === null) message = []
			    let histories = this.state.histories
			    histories.push(this.state.history)
			    this.setState({histories: histories})
			    // if(message.length > 0){
			    	this.setState({history: {id: this.state.histories[this.state.histories.length-1].id+1, content: ''}})
			    // }
	      })
    } 
	}
	componentDidMount() {
		const path = window.location.pathname
    const paths = path.split("/")
    axios
      .get("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/histories", {
        headers: {
          'Content-Type': 'application/json',
      }})
      .then(results => {
        let message = results.data
        if(message === null) message = []
        this.setState({histories: message})
      	if(message.length > 0){
      		let history = this.state.history
      		history.id = this.state.histories[message.length-1].id+1
      		this.setState({history: history})
      	}
      })
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
	              <HistoryEditItem history={history} deleteHistory={this.deleteHistory(i)} id={i} key={i} />
	            );
	          })}
	        </TableBody>
	      </Table>
	      <TextField
          id="filled-full-width"
          label="あなたの略歴を入力"
          value={this.state.history.content}
          onChange={this.handleChange('content')}
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

class HistoryEditItem extends Component {
	constructor(props) {
		super(props)
		this.state = {
			history: this.props.history
		}
	}
	componentWillReceiveProps(nextProps) {
    this.setState({history: nextProps.history})
  }
	handleChange = name => event => {
		let history = this.state.history
		history[name] = event.target.value
		this.setState({history: history})
	}
	deleteHistory = () => {
		const path = window.location.pathname
    const paths = path.split("/")
    axios
      .delete("http://localhost:8000/api/users/"+paths[1]+"/"+paths[2]+"/edits/histories", {
      	params: {
      		id: this.state.history.id
      }})
      .then(results => {
				this.props.deleteHistory(this.props.id)
      })
	}
	render() {
		return (
			<TableRow>
        <TableCell component="th" scope="row" numeric className="edit-form-history">{this.props.id+1}</TableCell>
        <TableCell>
        	<TextField
	          id="filled-full-width"
	          value={this.state.history.content}
	          onChange={this.handleChange('content')}
	          style={{minWidth: 500}}
	          fullWidth
	          margin="normal"
	          variant="filled"
	          InputLabelProps={{
	            shrink: true,
	          }}
	          onKeyPress={this.onKeyPress}
	        />
        </TableCell>
        <TableCell>
        	<IconButton aria-label="Delete" onClick={this.deleteHistory}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
		)
	}
}
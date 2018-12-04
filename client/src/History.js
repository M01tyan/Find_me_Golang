import React, { Component } from 'react'
import sr from './ScrollReveal'
import Arrow from './images/right-arrow.png'
import './History.css'
import axios from 'axios'

export default class History extends Component {
  componentDidMount() {
    const config = {
      origin: 'left',
      duration: 1000,
      delay: 150,
      distance: '50px',
      scale: 1,
      easing: 'ease',
      reset: true,
    }
    sr.reveal(this.refs.history, config)

    const path = window.location.pathname
    const paths = path.split("/")
    axios
      .get("https://find-me-apiserver.herokuapp.com/api/users/"+paths[1]+"/"+paths[2]+"/edits/histories", {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(results => {
        const message = results.data
        this.setState({histories: message})
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      histories: [],
    }
  }
  render() {
  	return (
  	  <div ref="history" className="history">
        <h2 className="title">これまでの経歴</h2>
        <div>
          {this.state.histories.map((history, i) => (
            <HistoryItem text={history.content} key={i} />
          ))}
        </div>
  	  </div>
  	)
  }
}

class HistoryItem extends Component {
  componentDidMount() {
    const config = {
      origin: 'left',
      duration: 1000,
      delay: 150,
      distance: '50px',
      scale: 1,
      easing: 'ease',
      reset: true,
    }
    sr.reveal(this.refs.history_item, config)
  }
  render() {
    return (
      <div className="history-item" ref="history_item">
        <img src={Arrow} alt="arrow" className="history-arrow-img" />
        <p className="history-content">{this.props.text}</p>
      </div>
    )
  }
}
import React, { Component } from 'react'
import sr from './ScrollReveal'
import Star from './images/star.png'
import StarGood from './images/star_good.png'
import './Skill.css'
import axios from 'axios'

export default class Skill extends Component {
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
    sr.reveal(this.refs.skill, config)

    const path = window.location.pathname
    const paths = path.split("/")
    axios
      .get("https://find-me-apiserver.herokuapp.com/api/users/"+paths[1]+"/"+paths[2]+"/edits/skills", {
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(results => {
        const message = results.data
        this.setState({skills: message})
      })
  }

  constructor(props) {
    super(props)
    this.state = {
      skills: [],
    }
  }
  render() {
  	return (
  	  <div ref="skill" className="skill">
  	  	<h2 className="title">プログラミングレベル</h2>
        <div className="skill-items">
          {this.state.skills.map((skill, i) => (
            <ProgSkill key={i} skill={skill} />
          ))}
        </div>
  	  </div>
  	)
  }
}

class ProgSkill extends Component {
  render() {
    const items = []
    for(var j=0; j<this.props.skill.level; j++){
      items.push(<img src={StarGood} alt="good-star" className="skill-item-star-img" key={j} />)
    }
    for(let i=j; i<5; i++){
      items.push(<img src={Star} alt="bad-star" className="skill-item-star-img" key={i} />)
    }
    return (
      <div className="skill-item">
        <div className="skill-item-mobile">
          <h2 className="skill-item-lang">{this.props.skill.language}</h2>
          <div className="skill-item-star">{items}</div>
        </div>
        <h2 className="skill-item-comment">{this.props.skill.comment}</h2>
      </div>
    )
  }
}

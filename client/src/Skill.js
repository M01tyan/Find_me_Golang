import React, { Component } from 'react'
import sr from './ScrollReveal'
import Star from './images/star.png'
import StarGood from './images/star_good.png'
import './Skill.css'

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
  }

  constructor(props) {
    super(props)
    this.state = {
      prog_skills: [
        {
          lang: "C",
          rank: 3,
          year: 3,
          comment: "授業で使用",
        },
        {
          lang: "Java",
          rank: 3,
          year: 3,
          comment: "授業と研究で使用",
        },
        {
          lang: "JavaScript",
          rank: 4,
          year: 3,
          comment: "独学、Reactフレームワークを使用",
        },
        {
          lang: "HTML/CSS",
          rank: 4,
          year: 3,
          comment: "独学、Monacaプラットフォームを用いてアプリケーションで使用",
        },
        {
          lang: "Python",
          rank: 3,
          year: 1,
          comment: "IoTプロジェクトでPepperSW開発で使用",
        },
        {
          lang: "C++",
          rank: 2,
          year: 0.5,
          comment: "授業で使用",
        },
        {
          lang: "Go",
          rank: 3,
          year: 0.5,
          comment: "独学、LINE BotやWebアプリケーションのバックエンドで使用",
        },
        {
          lang: "Ruby on Rails",
          rank: 3,
          year: 0.5,
          comment: "Webアプリケーションで使用",
        },
        {
          lang: "PostgreSQL",
          rank: 3,
          year: 1,
          comment: "LINE Bot、Webアプリケーションで使用",
        },
        {
          lang: "Heroku",
          rank: 3,
          year: 2,
          comment: "LINE Bot, Webアプリケーションで使用",
        },
      ]
    }
  }
  render() {
  	return (
  	  <div ref="skill" className="skill">
  	  	<h2 className="title">プログラミングレベル</h2>
        <div className="skill-items">
          {this.state.prog_skills.map((skill, i) => (
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
    for(var j=0; j<this.props.skill.rank; j++){
      items.push(<img src={StarGood} alt="good-star" className="skill-item-star-img" key={j} />)
    }
    for(let i=j; i<5; i++){
      items.push(<img src={Star} alt="bad-star" className="skill-item-star-img" key={i} />)
    }
    return (
      <div className="skill-item">
        <div className="skill-item-mobile">
          <h2 className="skill-item-lang">{this.props.skill.lang}</h2>
          <div className="skill-item-star">{items}</div>
        </div>
        <h2 className="skill-item-comment">{this.props.skill.comment}</h2>
      </div>
    )
  }
}

import React, { Component } from 'react'
//import sr from './ScrollReveal'
import './Career.css'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Now from './images/now.jpg'
import Next from './images/next.jpg'
import Future from './images/future.jpg'

export default class Career extends Component {
  constructor(props) {
    super(props)
    this.state = {
      careers: [
        {
          title: "現在",
          img: Now,
          context: "リリースを目標に様々な技術を積極的に挑戦していく",
        },
        {
          title: "近未来",
          img: Next,
          context: "エンジニアとしてキャリアを始めしっかりとした技術力を身につける",
        },
        {
          title: "将来のキャリア像",
          img: Future,
          context: "エンジニアと企画を繋ぐ役割を担っていきたい",
        },
      ],
    }
  }
  render() {
    return(
      <div className="career">
        <h2 className="title">キャリア</h2>
        <div className="career-items">
          {this.state.careers.map((career, i) => (
            <CareerItem career={career} key={i} />
          ))}
        </div>
      </div>
    )
  }
}

class CareerItem extends Component {
  render() {
    return (
      <Card className="career-item">
        <CardActionArea>
          <CardMedia
            className="career-item-image"
            image={this.props.career.img}
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {this.props.career.title}
            </Typography>
            <Typography component="p">
              {this.props.career.context}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    )
  }
}
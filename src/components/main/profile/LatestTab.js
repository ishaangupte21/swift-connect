import React from 'react'
import { List } from '@material-ui/core'
import {Item} from '../dashboard/MainDisplay'
import Carousel from 'react-material-ui-carousel'

export const LatestTab = ({data}) => {

    return (
      <div id="carousel-holder">
      <Carousel>
      {
          data.map(post => (<Item post={post} key={post.data().systemTime}/>))
      }
  
  </Carousel>
      </div>
    )
}
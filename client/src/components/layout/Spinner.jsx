import React, {Fragment} from 'react'
import spinner from './Book.gif'

const Spinner = () => {
  return (
    <Fragment>
      <img src={spinner} alt='Loading...' style={{ height:'100px',width:'100px', display: 'block', margin: 'auto' }}></img>
    </Fragment>
  )
}

export default Spinner

import React from 'react'
import { default as pageNotFound } from './NotFound.svg';
import "./notfound.scss"; 

const NotFound = () => {
  return (
    <div className="notFound">
      <img src={pageNotFound} alt="not found" width="90%" height="80%" />
    </div>
  )
}

export default NotFound
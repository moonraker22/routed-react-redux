import React from 'react'
import CircleLoader from 'react-spinners/CircleLoader'

const Spinner = (props) => {
  return (
    <div>
      <CircleLoader size={100} color={'#123abc'} loading={props.loading} />
    </div>
  )
}

export default Spinner

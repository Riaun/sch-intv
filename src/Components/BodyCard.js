import React, { useState } from 'react'
import './BodyCard.css'

const BodyCard = (props) => {
  const [checked, setChecked] = useState(false)

  
  const remove = (arr, elem) => {
    var newArr = []
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];
      if (element != elem) {
        newArr.push(element)
      }
    }
    return newArr
  }
  const handleClick = () => {
   
    setChecked(!checked)
    
    if (!checked) {
      var rolls = props.getRolls()
      console.log(rolls)
      var newRolls = [...rolls, props.roll]
      props.setRolls([...newRolls])
    } else {
      var newRolls = remove(props.getRolls(), props.roll)
      props.setRolls(newRolls)
    }
  }
  return (
    <div className='bodyCard'>
      <div className='bodyCard__info'>
        <h3 className='bodyCard__name'>{props.name}</h3>
        <h3 className='bodyCard__roll'>Roll: {props.roll} </h3>
      </div>
      <div className='bodyCard__select'>
        <input type='checkbox' onChange={handleClick}/>
      </div>
    </div>
  )
}

export default BodyCard
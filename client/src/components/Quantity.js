import React, { useState, forwardRef } from 'react';

export default forwardRef(function Quantity({ date }, ref) {
  const [quantity, setQuantity] = useState(30)

  const subtract = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1)
    }
  }

  const add = () => {
    setQuantity(quantity + 1)
  }

  const handleInputChange = event => {
    const value = event.target.value
    const specialCaseEmpty = value.trim() === ''
    if (specialCaseEmpty) {
      // allow them to delete all characters
      setQuantity(value)
    } else {
      const int = parseInt(event.target.value, 10)
      // disallow non-numeric values
      if (!isNaN(int)) {
        setQuantity(int)
      }
    }
  }

  const handleInputBlur = event => {
    if (event.target.value.trim() === '') {
      setQuantity(0)
    }
  }

  const handleInputKeyDown = event => {
    // preventDefault to keep cursor from going back/forth
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      add()
    } else if (event.key === 'ArrowDown') {
      event.preventDefault()
      subtract()
    }
  }

  return (
    <div className="quantity">
      <div>
        <button
          type="button"
          className="icon_button quantity_button"
          onClick={subtract}
        >
            Subtract
        </button>
      </div>
      <input
        className="quantity_input"
        value={quantity}
        id="quantity"
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        onKeyDown={handleInputKeyDown}
        ref={ref}
      />
      <div>
        <button
          type="button"
          className="icon_button quantity_button"
          onClick={add}
        >
            Add
        </button>
      </div>
    </div>
  )
})

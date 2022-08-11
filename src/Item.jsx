import React, { memo } from 'react'

export const Item = memo(({ text, fn, a }) => {

  return (
    <div
      onClick={fn}
      style={{
        width: '50px',
        height: '50px',
        backgroundColor: 'green',
        color: 'white',
        fontSize: '2rem',
        padding: '1rem',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}>{text} {a}</div>
  )
})
import React from 'react'

interface Props {
  isUpdated: boolean
  msg: string
}

export default function Toast({ isUpdated, msg }: Props) {
  return (
    <p className={isUpdated ? 'updated visible' : 'updated'}>
      {msg}
    </p>
  )
}
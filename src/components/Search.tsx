import type { Dispatch, ReactElement, SetStateAction } from 'react'

interface Props {
  placeholder: string
  setSearchValue: Dispatch<SetStateAction<string>>
}

export default function Search({ placeholder, setSearchValue }: Props): ReactElement {
  return (
    <input type='text' placeholder={placeholder} onChange={(e) => setSearchValue(e.target.value)} />
  )
}

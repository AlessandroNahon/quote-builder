import { type ReactElement, PropsWithChildren } from 'react'

export default function Browser({ children }: PropsWithChildren): ReactElement {
  return (
    <section id='browser'>
      {children}
    </section>
  )
}

import { type ReactElement, PropsWithChildren } from 'react'

interface Props {
  className?: string
}

export default function Browser({ children, className }: PropsWithChildren<Props>): ReactElement {
  return (
    <section id='browser' className={className}>
      {children}
    </section>
  )
}

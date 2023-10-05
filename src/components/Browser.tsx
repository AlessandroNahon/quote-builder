import { ReactNode, type ReactElement } from 'react'

type PropsWithChildren<P> = P & { children?: ReactNode }

interface Props {

}

export default function Browser({ children }: PropsWithChildren<Props>): ReactElement {
  return (
    <section id='browser'>
      {children}
    </section>
  )
}

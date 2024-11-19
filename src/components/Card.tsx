import { FC, ReactNode } from 'react'
import { cn } from '../lib/style-helpers'

interface Props {
  children?: ReactNode
  classes?: string
}

const Card: FC<Props> = ({ children, classes }) => {
  return <div className={cn('bg-white rounded-lg shadow-lg overflow-hidden', classes)}>{children}</div>
}

export default Card

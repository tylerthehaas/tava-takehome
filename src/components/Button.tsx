import { forwardRef, ButtonHTMLAttributes } from 'react'

const Button = forwardRef<HTMLButtonElement, ButtonHTMLAttributes<HTMLButtonElement>>(({ children, ...rest }, ref) => {
  return (
    <button
      {...rest}
      ref={ref}
      className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
    >
      {children}
    </button>
  )
})

Button.displayName = 'Button'

export default Button

import { NavLink } from 'react-router-dom'
import logo from '../assets/logo.png'
import { cn } from '../lib/style-helpers'

const Nav = () => {
  const navLinkClasses = ({ isActive }: { isActive: boolean }) =>
    cn('block px-4 py-2 text-sm text-gray-700 rounded-md', { 'text-white bg-red-700': isActive })

  return (
    <nav>
      <div className="logo-container">
        <img src={logo} alt="logo" />
      </div>
      <div className="flex flex-col">
        <NavLink className={navLinkClasses} to="/payroll">
          Payroll
        </NavLink>
        <NavLink className={navLinkClasses} to="/employees">
          Employees
        </NavLink>
      </div>
    </nav>
  )
}

export default Nav

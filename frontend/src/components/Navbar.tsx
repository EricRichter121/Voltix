import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useCurrentUser } from '../hooks/useCurrentUser'
import { CircleUserRound, ShoppingCartIcon, X } from 'lucide-react'

import SignUpForm from './SignUpForm'
import SignInForm from './SignInForm'
import { useSignOut } from '../hooks/useSignOut'

function NavBar() {
  const location = useLocation()

  const [isSignUpOpen, setIsSignUpOpen] = useState(false)
  const [isSignInOpen, setIsSignInOpen] = useState(false)
  const { signOut, loading } = useSignOut()
  
  
  const {
    data: user,
    isPending,
  } = useCurrentUser()

  const isAuthenticated = Boolean(user)

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Search', path: '/search'},
  ]

  // проверяем, активен ли путь, чтобы подсветить активную ссылку
  const isActiveLink = (path: string) => location.pathname === path

  return (
    <>
      <div className="bg-base-100/80 backdrop-blur-md border-b border-base-content/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between min-h-16">
            {/* LOGO */}
            <div className="shrink-0">
              <Link to="/" className="text-xl font-bold text-primary">Voxel</Link>
            </div>
            {/* NAVIGATION LINKS */}
            <div className="hidden md:flex space-x-4">
              {/* map создает новый массив на основе navLinks,  */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-base font-mono transition-colors duration-300 ${
                    isActiveLink(link.path) ? 'text-primary' : 'text-base-content hover:text-primary'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              {!isPending && !isAuthenticated ? ( 
                <>
                  <button
                    className="text-base font-mono text-base-content transition-colors duration-300 hover:text-primary"
                    onClick={() => setIsSignInOpen(true)}
                    type="button"
                  >
                    Sign In
                  </button>

                  <button
                    className="text-base font-mono text-base-content transition-colors duration-300 hover:text-primary"
                    onClick={() => setIsSignUpOpen(true)}
                    type="button"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="text-base font-mono text-base-content transition-colors duration-300 hover:text-primary"
                    onClick={() => signOut()}       // 2. Привязываем функцию выхода к клику
                    disabled={loading}      // 3. Блокируем кнопку во время загрузки
                    type="button"
                  >
                    {loading ? 'Signing out...' : 'Sign Out'}
                  </button>
                </>
              )}
            </div>
            {/* RIGHT SECTION */}
            <div className="flex items-center space-x-8">
                <Link to="/cart" className="text-base font-mono text-base-content hover:text-primary transition-colors duration-300">
                    <ShoppingCartIcon className="h-6 w-6" />
                </Link>
                {/* Тут позже добавить выбор темы сайта(используется zustand) */}
                <Link to="/profile" className="text-base font-mono text-base-content hover:text-primary transition-colors duration-300">
                    <CircleUserRound className="h-6 w-6" />
                </Link>
            </div>
          </div> 
        </div>

      </div>
      {!isPending && !isAuthenticated && (
        <dialog
          className={`modal ${isSignInOpen ? 'modal-open' : ''}`}
          open={isSignInOpen}
        >
          <div className="modal-box max-h-[90vh] max-w-lg overflow-y-auto border-2 border-base-content/10 bg-base-100 shadow-lg shadow-base-content/5 pt-2">
            <div className="flex items-center justify-end px-4 pt-4">
              <button
                aria-label="Close sign in dialog"
                className="btn btn-ghost btn-sm btn-square"
                onClick={() => setIsSignInOpen(false)}
                title="Close sign in dialog"
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <SignInForm />
          </div>
          <form className="modal-backdrop" method="dialog">
            <button onClick={() => setIsSignInOpen(false)} type="submit">close</button>
          </form>
        </dialog>
      )}      
      {!isPending && !isAuthenticated && (
        <dialog
          className={`modal ${isSignUpOpen ? 'modal-open' : ''}`}
          open={isSignUpOpen}
        >
          <div className="modal-box max-h-[90vh] max-w-lg overflow-y-auto border-2 border-base-content/10 bg-base-100 shadow-lg shadow-base-content/5 pt-2">
            <div className="flex items-center justify-end px-4 pt-4">
              <button
                aria-label="Close sign up dialog"
                className="btn btn-ghost btn-sm btn-square"
                onClick={() => setIsSignUpOpen(false)}
                title="Close sign up dialog"
                type="button"
              >
                <X aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
            <SignUpForm />
          </div>
          <form className="modal-backdrop" method="dialog">
            <button onClick={() => setIsSignUpOpen(false)} type="submit">close</button>
          </form>
        </dialog>
      )}
    {
      console.log("Is pending:", isPending, "Is Authenticated:", isAuthenticated)
    }   
    </>
     
  )
}

export default NavBar
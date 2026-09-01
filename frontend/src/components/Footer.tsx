import { Link } from 'react-router-dom'
import { Mail } from 'lucide-react'

function Footer() {
  return (
    <footer className="bg-base-100 border-t border-base-content/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

          {/* LOGO / DESCRIPTION */}
          <div>
            <Link
              to="/"
              className="text-xl font-bold text-primary"
            >
              Voxel
            </Link>
          </div>

          {/* LINKS */}
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link
              to="/"
              className="text-sm font-mono text-base-content hover:text-primary transition-colors duration-300"
            >
              Home
            </Link>

            <Link
              to="/categories"
              className="text-sm font-mono text-base-content hover:text-primary transition-colors duration-300"
            >
              Categories
            </Link>

            <Link
              to="/about"
              className="text-sm font-mono text-base-content hover:text-primary transition-colors duration-300"
            >
              About
            </Link>
          </div>

          {/* SOCIAL / CONTACT */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:contact@example.com"
              className="text-base-content hover:text-primary transition-colors duration-300"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>

            {/* <a
              href="#"
              className="text-base-content hover:text-primary transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a> */}
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="mt-6 pt-5 border-t border-base-content/10">
          <p className="text-xs font-mono text-base-content/50 text-center md:text-left">
            © {new Date().getFullYear()} All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
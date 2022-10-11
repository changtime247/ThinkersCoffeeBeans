import { Link } from 'react-router-dom'

function NotFoundPage() {
  return (
    <div className='container'>
      <h3>Oops... page not found</h3>
      <Link to='/' className='btn-light btn'>
        Back Home
      </Link>
    </div>
  )
}

export default NotFoundPage

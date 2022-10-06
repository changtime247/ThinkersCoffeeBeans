import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const SearchBox = () => {
  const navigate = useNavigate()
  const [search, setSearch] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (search.trim()) {
      navigate(`/search/${search}`)
    } else {
      navigate('/')
    }
    setSearch('')
  }

  return (
    <Form className='d-flex my-2' onSubmit={submitHandler}>
      <Form.Control
        type='text'
        name='q'
        onChange={(e) => setSearch(e.target.value)}
        placeholder='Search Products...'
        className='mr-sm-2 ml-sm-5'
      ></Form.Control>
      <Button type='submit' variant='outline-primary' className='p-2'>
        Search
      </Button>
    </Form>
  )
}
export default SearchBox

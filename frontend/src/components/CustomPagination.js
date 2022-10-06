import React from 'react'
import { Pagination } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

const CustomPagination = ({ pages, page, isAdmin = false, search = '' }) => {
  return (
    pages > 1 && (
      <div className='page-numbers'>
        <Pagination className='border-red'>
          {[...Array(pages).keys()].map((x) => (
            <LinkContainer
              key={x + 1}
              to={
                !isAdmin
                  ? search
                    ? `/search/${search}/page/${x + 1}`
                    : `/page/${x + 1}`
                  : `/admin/productList/${x + 1}`
              }
            >
              <Pagination.Item active={x + 1 === page}>{x + 1}</Pagination.Item>
            </LinkContainer>
          ))}
        </Pagination>
      </div>
    )
  )
}
export default CustomPagination

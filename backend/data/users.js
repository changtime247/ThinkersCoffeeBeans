import bcrypt from 'bcryptjs'

const users = [
  {
    name: 'admin',
    email: 'admin@admin.com',
    password: bcrypt.hashSync('pa$$word', 10),
    shippingAddress: {
      address: '10 state st',
      city: 'utopolis',
      postalCode: '80000',
      country: 'USA',
    },
    isAdmin: true,
  },
  {
    name: 'admintest',
    email: 'admin@test.com',
    password: bcrypt.hashSync('123456', 10),
    shippingAddress: {
      address: '1 State Place',
      city: 'XYC',
      postalCode: '10001',
      country: 'USA',
    },
    isAdmin: true,
  },
  {
    name: 'peter parker',
    email: 'peterparker@example.com',
    password: bcrypt.hashSync('pparker', 10),
    shippingAddress: {
      address: '555 spin st',
      city: 'new city',
      postalCode: '10001',
      country: 'USA',
    },
  },
  {
    name: 'mary jane',
    email: 'maryjane@example.com',
    password: bcrypt.hashSync('mjane', 10),
    shippingAddress: {
      address: '1000 broadway',
      city: 'new city',
      postalCode: '10001',
      country: 'USA',
    },
  },
]

export default users

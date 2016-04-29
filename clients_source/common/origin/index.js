var origin = 'http://localhost:3000';

if (NODE_ENV === 'production') {
  origin = '';
}

export default origin;

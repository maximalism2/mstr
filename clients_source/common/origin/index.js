var origin = 'http://localhost:3000';

if (process.env.NODE_ENV === 'production') {
  origin = '';
}

export default origin;

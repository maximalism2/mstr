var origin = 'http://localhost:3000';

if (process.env.NOVE_ENV === 'production') {
  origin = '';
}

export default origin;

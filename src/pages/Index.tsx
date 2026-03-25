
import { Navigate } from 'react-router-dom';

// Redirect from index page to welcome page
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;

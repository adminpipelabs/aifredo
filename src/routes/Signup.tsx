import { Navigate } from 'react-router-dom';

// Signup is now handled in the onboarding wizard's AccountStep
export default function Signup() {
  return <Navigate to="/onboarding" replace />;
}

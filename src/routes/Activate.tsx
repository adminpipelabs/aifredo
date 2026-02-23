import { Navigate } from 'react-router-dom';

// Activate is no longer needed — all bots are created on the server.
// Redirect to top-up page for adding funds.
export default function Activate() {
  return <Navigate to="/topup" replace />;
}

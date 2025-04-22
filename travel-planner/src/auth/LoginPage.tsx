import FirebaseAuth from './FirebaseAuth';

export default function LoginPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1 style={{ marginBottom: '1rem' }}>Welcome to Travel Planner</h1>
      <FirebaseAuth />
    </div>
  );
}

import FirebaseAuth from './FirebaseAuth';

export default function LoginPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Welcome to Travel Planner</h1>
      <FirebaseAuth />
    </div>
  );
}

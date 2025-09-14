export default function Dashboard({ user }) {
  return (
    <div style={{ padding: 20 }}>
      <h2>Hoşgeldin, {user.username}!</h2>
      <p>Email: {user.email}</p>
      {/* Buraya dashboard içeriklerini ekleyebilirsin */}
    </div>
  );
}

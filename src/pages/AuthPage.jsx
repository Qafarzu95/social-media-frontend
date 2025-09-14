import { useState } from "react";
import { useNavigate } from "react-router-dom";

// 🌍 API URL .env dosyasından alınacak
const API_URL = import.meta.env.VITE_API_URL;

export default function AuthPage({ user, setUser }) {
  const [isLogin, setIsLogin] = useState(true); // Login mi yoksa Register mı
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage("Kayıt başarılı, şimdi login yapabilirsiniz");
      setIsLogin(true); // kayıt sonrası login formuna geç
    } else {
      setMessage(data.message || "Kayıt sırasında hata");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (res.ok) {
      setUser(data.user);
      navigate("/dashboard"); // ← login sonrası yönlendirme
    } else {
      setMessage(data.message || "Login başarısız");
    }
  };

  return (
    <div style={{ width: 300, margin: "50px auto" }}>
      <h2>{isLogin ? "Giriş Yap" : "Kayıt Ol"}</h2>

      <form onSubmit={isLogin ? handleLogin : handleRegister}>
        {!isLogin && (
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">{isLogin ? "Giriş Yap" : "Kayıt Ol"}</button>
      </form>

      <p
        style={{ marginTop: 10, cursor: "pointer", color: "blue" }}
        onClick={() => {
          setIsLogin(!isLogin);
          setMessage("");
        }}
      >
        {isLogin ? "Hesabın yok mu? Kayıt Ol" : "Zaten hesabın var mı? Giriş Yap"}
      </p>

      {message && <p>{message}</p>}
    </div>
  );
}

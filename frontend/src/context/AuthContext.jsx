import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// ✅ THIS MUST EXIST
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = async (username, password) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data);
        return data.role;
      } else {
        return null;
      }

    } catch (error) {
      console.error(error);
      return null;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
          console.log("Sending login:", { username, password });
};
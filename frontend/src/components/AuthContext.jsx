import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // { username, role }

  const login = (username, password) => {
    if (username === "Admin" && password === "Admin@123") {
      setUser({ username, role: "admin" });
      return "admin";
    } else if (username === "Student" && password === "Stu@123") {
      setUser({ username, role: "student" });
      return "student";
    } else if (username === "Faculty" && password === "Fact@123") {
      setUser({ username, role: "faculty" });
      return "faculty";
    }
    return null;
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

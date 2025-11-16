import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import Signup from "./components/Auth/Signup";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, SetUserData] = useContext(AuthContext);
  const [authMode, setAuthMode] = useState("login");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");

    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email === "admin@mail.com" && password === "123") {
      setUser("admin");
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          role: "admin",
          data: { email: "admin@mail.com", firstName: "admin" },
        })
      );
    } else if (userData) {
      const employee = userData.find(
        (e) => email == e.email && e.password == password
      );
      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
      }
    } else {
      alert("Invalid Credentials");
    }
  };

  const handleSignUp = ({ firstName, email, password }) => {
    const { employees } = JSON.parse(localStorage.getItem("employees"))
      ? JSON.parse(localStorage.getItem("employees"))
      : { employees: [] };

    const exists = employees && employees.find((e) => e.email === email);
    if (exists) {
      alert("Email already in use");
      return;
    }

    const newId =
      employees && employees.length
        ? Math.max(...employees.map((e) => e.id)) + 1
        : 1;
    const newEmployee = {
      id: newId,
      firstName,
      email,
      password,
      taskCounts: { active: 0, newTask: 0, completed: 0, failed: 0 },
      tasks: [],
    };

    const updated = employees ? [...employees, newEmployee] : [newEmployee];
    localStorage.setItem("employees", JSON.stringify(updated));

    // update auth context so UI (employee table) shows the new user immediately
    try {
      SetUserData && SetUserData(updated);
    } catch (e) {}

    // automatically log in the newly registered user
    setUser("employee");
    setLoggedInUserData(newEmployee);
    localStorage.setItem(
      "loggedInUser",
      JSON.stringify({ role: "employee", data: newEmployee })
    );
  };

  return (
    <>
      {!user ? (
        authMode === "login" ? (
          <Login handleLogin={handleLogin} />
        ) : (
          <Signup
            handleSignUp={handleSignUp}
            switchToLogin={() => setAuthMode("login")}
          />
        )
      ) : (
        ""
      )}
      {!user && authMode === "login" ? (
        <div className="absolute top-4 right-4">
          <button
            onClick={() => setAuthMode("signup")}
            className="text-sm text-gray-400 underline"
          >
            Create account
          </button>
        </div>
      ) : null}
      {user == "admin" ? (
        <AdminDashboard changeUser={setUser} />
      ) : user == "employee" ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;

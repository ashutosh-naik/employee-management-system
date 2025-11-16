import React from "react";

const Header = (props) => {
  // const [username, setUsername] = useState('')

  // if(!data){
  //   setUsername('Admin')
  // }else{
  //   setUsername(data.firstName)
  // }

  const logOutUser = () => {
    localStorage.setItem("loggedInUser", "");
    props.changeUser("");
  };

  // determine display name and email: prefer `props.data`, fallback to `localStorage.loggedInUser`
  let displayName = "username";
  let displayEmail = "";

  if (props.data && props.data.firstName) {
    displayName = props.data.firstName;
    displayEmail = props.data.email || "";
  } else {
    try {
      const logged = JSON.parse(localStorage.getItem("loggedInUser"));
      if (logged) {
        if (logged.role === "admin") {
          displayName = "admin";
          displayEmail = (logged.data && logged.data.email) || "";
        } else if (logged.role === "employee" && logged.data) {
          displayName = logged.data.firstName || displayName;
          displayEmail = logged.data.email || "";
        }
      }
    } catch (e) {
      // ignore parse errors and keep defaults
    }
  }

  return (
    <div className="flex items-end justify-between">
      <div>
        <h1 className="text-2xl font-medium">
          Hello <br />{" "}
          <span className="text-3xl font-semibold">{displayName} 👋</span>
        </h1>
        {displayEmail ? (
          <p className="text-sm mt-1 text-gray-300">{displayEmail}</p>
        ) : null}
      </div>
      <button
        onClick={logOutUser}
        className="bg-red-600 text-base font-medium text-white px-5 py-2 rounded-sm"
      >
        Log Out
      </button>
    </div>
  );
};

export default Header;

import { AuthContext } from "../context/AuthContext";
import { getAuth } from "firebase/auth";
import { app } from "../firebase/firebase.config";

const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const authInfo = {
    user: "Mehadi",
  };

  return <AuthContext value={authInfo}>{children}</AuthContext>;
};

export default AuthProvider;

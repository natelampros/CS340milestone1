import "./Login.css";
import "bootstrap/dist/css/bootstrap.css";
import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthenticationFormLayout from "../AuthenticationFormLayout";
import { AuthToken, FakeData, User } from "tweeter-shared";
import useToastListener from "../../toaster/ToastListenerHook";
import AuthenticationFields from "../AuthenticationFields";
import useUserInfo from "../../userInfo/UserInfoHook";
import { UserService } from "../../../model/service/UserService";
import { LoginPresenter } from "../../../presenter/LoginPresenter";

interface Props {
  originalUrl?: string;
}

const Login = (props: Props) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const { updateUserInfo } = useUserInfo();
  const { displayErrorMessage } = useToastListener();

  const checkSubmitButtonStatus = (): boolean => {
    return !alias || !password;
  };

  const loginView = {
    displayErrorMessage: (message: string) => displayErrorMessage(message),
    navigateTo: (path: string) => navigate(path),
    updateUserInfo: (user: User, authToken: AuthToken, rememberMe: boolean) =>
      updateUserInfo(user, user, authToken, rememberMe),
  };

  const userService = new UserService();
  const loginPresenter = new LoginPresenter(loginView, userService);

  const doLogin = async () => {
    loginPresenter.doLogin(alias, password, rememberMe, props.originalUrl);
  };

  const inputFieldGenerator = () => {
    return (
      <>
        <AuthenticationFields
          setAlias={setAlias}
          setPassword={setPassword}
          includeMargin={true}
        />
      </>
    );
  };

  const switchAuthenticationMethodGenerator = () => {
    return (
      <div className="mb-3">
        Not registered? <Link to="/register">Register</Link>
      </div>
    );
  };

  return (
    <AuthenticationFormLayout
      headingText="Please Sign In"
      submitButtonLabel="Sign in"
      oAuthHeading="Sign in with:"
      inputFieldGenerator={inputFieldGenerator}
      switchAuthenticationMethodGenerator={switchAuthenticationMethodGenerator}
      setRememberMe={setRememberMe}
      submitButtonDisabled={checkSubmitButtonStatus}
      submit={doLogin}
    />
  );
};

export default Login;

// import { useContext } from "react";
// import { UserInfoContext } from "./UserInfoProvider";

// const useUserInfo = () => useContext(UserInfoContext);

// export default useUserInfo;
import { useContext } from "react";
import { AuthToken, User } from "tweeter-shared";
import { UserInfoContext } from "./UserInfoProvider";

interface UserInfo {
  currentUser: User | null;
  displayedUser: User | null;
  authToken: AuthToken | null;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    remember: boolean
  ) => void;
  clearUserInfo: () => void;
  setDisplayedUser: (user: User) => void;
}

const useUserInfo = (): UserInfo => {
  const {
    currentUser,
    displayedUser,
    authToken,
    updateUserInfo,
    clearUserInfo,
    setDisplayedUser,
  } = useContext(UserInfoContext);

  return {
    currentUser: currentUser,
    displayedUser: displayedUser,
    authToken: authToken,
    updateUserInfo: updateUserInfo,
    clearUserInfo: clearUserInfo,
    setDisplayedUser: setDisplayedUser,
  };
};

export default useUserInfo;

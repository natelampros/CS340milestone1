import { User, AuthToken } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface LoginView {
  displayErrorMessage: (message: string) => void;
  navigateTo: (path: string) => void;
  updateUserInfo: (
    user: User,
    authToken: AuthToken,
    rememberMe: boolean
  ) => void;
}

export class LoginPresenter {
  private view: LoginView;
  private userService: UserService;

  constructor(view: LoginView, userService: UserService) {
    this.view = view;
    this.userService = userService;
  }

  async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl?: string
  ) {
    try {
      let [user, authToken] = await this.userService.login(alias, password);
      this.view.updateUserInfo(user, authToken, rememberMe);

      // Navigate based on your logic, could also be part of the view method
      this.view.navigateTo(originalUrl ? originalUrl : "/");
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to log user in because of exception: ${error}`
      );
    }
  }
}

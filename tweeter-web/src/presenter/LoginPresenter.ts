import { UserService } from "../model/service/UserService";
import {
  AuthenticationPresenter,
  AuthenticationView,
} from "./AuthenticationPresenter";

export class LoginPresenter extends AuthenticationPresenter<UserService> {
  protected createService(): UserService {
    return new UserService();
  }

  constructor(view: AuthenticationView) {
    super(view);
  }

  protected get view(): AuthenticationView {
    return super.view as AuthenticationView;
  }

  public async doLogin(
    alias: string,
    password: string,
    rememberMe: boolean,
    originalUrl?: string
  ) {
    this.doFailureReportingOperation(async () => {
      let [user, authToken] = await this.service.login(alias, password);
      let url: string;
      if (!!originalUrl) {
        url = originalUrl;
      } else {
        url = "/";
      }

      this.updateUserInfoAndNavigate(user, user, authToken, rememberMe, url);
    }, "log user in");
  }
}

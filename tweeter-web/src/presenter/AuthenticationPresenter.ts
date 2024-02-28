import { User, AuthToken } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface AuthenticationView extends View {
  navigateTo: (path: string) => void;
  updateUserInfo: (
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    rememberMe: boolean
  ) => void;
}

export abstract class AuthenticationPresenter<T> extends Presenter {
  protected _service: T;

  constructor(view: AuthenticationView) {
    super(view);
    this._service = this.createService();
  }

  protected abstract createService(): T;

  protected get service() {
    return this._service;
  }

  protected get view() {
    return super.view as AuthenticationView;
  }

  protected updateUserInfoAndNavigate(
    currentUser: User,
    displayedUser: User | null,
    authToken: AuthToken,
    rememberMeRefVal: boolean,
    url: string
  ): void {
    this.view.updateUserInfo(
      currentUser,
      displayedUser,
      authToken,
      rememberMeRefVal
    );
    this.view.navigateTo(url);
  }
}

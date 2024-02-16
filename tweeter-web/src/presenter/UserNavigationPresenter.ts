import { AuthToken, User } from "tweeter-shared";
import { UserService } from "../model/service/UserService";

export interface UserNavigationView {
  setDisplayedUser: (user: User) => void;
  displayErrorMessage: (
    message: string,
    bootstrapClasses?: string | undefined
  ) => void;
}
export class UserNavigationPresenter {
  private view: UserNavigationView;
  private service: UserService;

  constructor(view: UserNavigationView) {
    this.view = view;
    this.service = new UserService();
  }

  public async navigateToUser(
    authToken: AuthToken,
    currentUser: User,
    aliasString: string
  ) {
    try {
      let alias = this.extractAlias(aliasString);

      let user = await this.service.getUser(authToken!, alias);

      if (!!user) {
        if (currentUser!.equals(user)) {
          this.view.setDisplayedUser(currentUser!);
        } else {
          this.view.setDisplayedUser(user);
        }
      }
    } catch (error) {
      this.view.displayErrorMessage(
        `Failed to get user because of exception: ${error}`
      );
    }
  }

  public extractAlias(value: string): string {
    let index = value.indexOf("@");
    return value.substring(index);
  }
}

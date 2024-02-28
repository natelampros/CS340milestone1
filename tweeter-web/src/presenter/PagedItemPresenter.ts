import { AuthToken, User } from "tweeter-shared";
import { Presenter, View } from "./Presenter";

export interface PagedItemView<T> extends View {
  addItems: (items: T[]) => void;
}

export const PAGE_SIZE = 10;

export abstract class PagedItemPresenter<T, U> extends Presenter {
  private _service: U;
  private _hasMoreItems: boolean = true;
  private _lastItem: T | null = null;

  public constructor(view: PagedItemView<T>) {
    super(view);
    this._service = this.createService();
  }

  protected abstract createService(): U;

  protected get service() {
    return this._service;
  }

  public get hasMoreItems() {
    return this._hasMoreItems;
  }

  protected set hasMoreItems(value: boolean) {
    this._hasMoreItems = value;
  }

  public get lastItem(): T | null {
    return this._lastItem;
  }

  protected set lastItem(lastItem: T | null) {
    this._lastItem = lastItem;
  }

  protected get view(): PagedItemView<T> {
    return super.view as PagedItemView<T>;
  }

  public async loadMoreItems(authToken: AuthToken, user: User) {
    this.doFailureReportingOperation(async () => {
      if (this.hasMoreItems) {
        let [newItems, hasMore] = await this.getMoreItems(authToken, user);

        this.hasMoreItems = hasMore;
        this.lastItem = newItems[newItems.length - 1];
        this.view.addItems(newItems);
      }
    }, this.getItemDescription());
  }

  protected abstract getMoreItems(
    authToken: AuthToken,
    user: User
  ): Promise<[T[], boolean]>;

  protected abstract getItemDescription(): string;
}

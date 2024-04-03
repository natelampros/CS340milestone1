import { json } from "react-router-dom";
import {
  AuthenticateResponse,
  FollowRequest,
  FollowResponse,
  FollowStatusRequest,
  FollowStatusResponse,
  GetFollowCountRequest,
  GetFollowCountResponse,
  GetUserResponse,
  LoadMoreItemsRequest,
  LoadMoreItemsResponse,
  LoadMoreUsersRequest,
  LoadMoreUsersResponse,
  LoginRequest,
  PostStatusRequest,
  RegisterRequest,
  TweeterRequest,
  TweeterResponse,
} from "tweeter-shared";
import { ClientCommunicator } from "./ClientCommunicator";

export class ServerFacade {
  private SERVER_URL =
    "https://kdwwy3oe8k.execute-api.us-west-2.amazonaws.com/dev/service";

  private clientCommunicator = new ClientCommunicator(this.SERVER_URL);

  async login(request: LoginRequest): Promise<AuthenticateResponse> {
    const endpoint = "/login";
    let response = await this.clientCommunicator.doPost<
      LoginRequest,
      AuthenticateResponse
    >(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  async logout(request: TweeterRequest): Promise<TweeterResponse> {
    const endpoint = "/logout";
    let response = await this.clientCommunicator.doPost<
      TweeterRequest,
      TweeterResponse
    >(request, endpoint);

    return TweeterResponse.fromJson(response);
  }

  async register(request: RegisterRequest): Promise<AuthenticateResponse> {
    const endpoint = "/register";
    let response = await this.clientCommunicator.doPost<
      RegisterRequest,
      AuthenticateResponse
    >(request, endpoint);

    return AuthenticateResponse.fromJson(response);
  }

  async follow(request: FollowRequest): Promise<FollowResponse> {
    const endpoint = "/follow";
    let response = await this.clientCommunicator.doPost<
      FollowRequest,
      FollowResponse
    >(request, endpoint);

    return FollowResponse.fromJson(response);
  }

  async unfollow(request: FollowRequest): Promise<FollowResponse> {
    const endpoint = "/unfollow";
    let response = await this.clientCommunicator.doPost<
      FollowRequest,
      FollowResponse
    >(request, endpoint);

    return FollowResponse.fromJson(response);
  }

  async getIsFollowerStatus(
    request: FollowStatusRequest
  ): Promise<FollowStatusResponse> {
    const endpoint = "/getfollowstatus";
    let response = await this.clientCommunicator.doPost<
      FollowStatusRequest,
      FollowStatusResponse
    >(request, endpoint);

    return FollowStatusResponse.fromJson(response);
  }

  async getUser(request: TweeterRequest): Promise<GetUserResponse> {
    const endpoint = "/getuser";
    let response = await this.clientCommunicator.doPost<
      TweeterRequest,
      GetUserResponse
    >(request, endpoint);

    return GetUserResponse.fromJson(response);
  }

  async getFollowCount(
    request: GetFollowCountRequest
  ): Promise<GetFollowCountResponse> {
    const endpoint = "/getfollowcount";
    let response = await this.clientCommunicator.doPost<
      GetFollowCountRequest,
      GetFollowCountResponse
    >(request, endpoint);

    return GetFollowCountResponse.fromJson(response);
  }

  async postStatus(request: PostStatusRequest): Promise<TweeterResponse> {
    const endpoint = "/poststatus";
    let response = await this.clientCommunicator.doPost<
      PostStatusRequest,
      TweeterResponse
    >(request, endpoint);

    return TweeterResponse.fromJson(response);
  }

  async loadMoreStoryItems(
    request: LoadMoreItemsRequest
  ): Promise<LoadMoreItemsResponse> {
    const endpoint = "/loadstory";
    let response = await this.clientCommunicator.doPost<
      LoadMoreItemsRequest,
      LoadMoreItemsResponse
    >(request, endpoint);

    return LoadMoreItemsResponse.fromJson(response);
  }

  async loadMoreFeedItems(
    request: LoadMoreItemsRequest
  ): Promise<LoadMoreItemsResponse> {
    const endpoint = "/loadfeed";
    let response = await this.clientCommunicator.doPost<
      LoadMoreItemsRequest,
      LoadMoreItemsResponse
    >(request, endpoint);

    console.log("feed response: " + JSON.stringify(response));
    return LoadMoreItemsResponse.fromJson(response);
  }

  async loadMoreUsers(request: LoadMoreUsersRequest) {
    const endpoint = "/loadusers";
    let response = await this.clientCommunicator.doPost<
      LoadMoreUsersRequest,
      LoadMoreUsersResponse
    >(request, endpoint);

    return LoadMoreUsersResponse.fromJson(response);
  }
}

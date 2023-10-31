import "./PostStatus.css";
import { useState } from "react";
import { useContext } from "react";
import { UserInfoContext } from "../userInfo/UserInfoProvider";
import { ToastInfoContext } from "../toaster/ToastProvider";
import { AuthToken, Status } from "tweeter-shared";

const PostStatus = () => {
  const { displayErrorToast, displayInfoToast, deleteLastInfoToast } =
    useContext(ToastInfoContext);

  const { currentUser, authToken } = useContext(UserInfoContext);
  const [post, setPost] = useState("");

  const submitPost = async (event: React.MouseEvent) => {
    event.preventDefault();

    try {
      displayInfoToast("Posting status...", 0);

      let status = new Status(post, currentUser!, Date.now());

      await postStatus(authToken!, status);

      deleteLastInfoToast();
      setPost("");
      displayInfoToast("Status posted!", 2000);
    } catch (error) {
      displayErrorToast(
        `Failed to post the status because of exception: ${error}`,
        0
      );
    }
  };

  const postStatus = async (
    authToken: AuthToken,
    newStatus: Status
  ): Promise<void> => {
    // Pause so we can see the logging out message. Remove when connected to the server
    await new Promise((f) => setTimeout(f, 2000));

    // TODO: Call the server to post the status
  };

  const clearPost = (event: React.MouseEvent) => {
    event.preventDefault();
    setPost("");
  };

  const checkButtonStatus: () => boolean = () => {
    return !post.trim() || !authToken || !currentUser;
  };

  return (
    <form>
      <div className="form-group mb-3">
        <textarea
          className="form-control"
          id="postStatusTextArea"
          rows={10}
          placeholder="What's on your mind?"
          value={post}
          onChange={(event) => {
            setPost(event.target.value);
          }}
        />
      </div>
      <div className="form-group">
        <button
          id="postStatusButton"
          className="btn btn-md btn-primary me-1"
          type="button"
          disabled={checkButtonStatus()}
          onClick={(event) => submitPost(event)}
        >
          Post Status
        </button>
        <button
          id="clearStatusButton"
          className="btn btn-md btn-secondary"
          type="button"
          disabled={checkButtonStatus()}
          onClick={(event) => clearPost(event)}
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default PostStatus;
import { useState } from "react";

interface Props {
  setAlias: (alias: string) => void;
  setPassword: (password: string) => void;
  includeMargin?: boolean;
}

const AuthenticationFields = (props: Props) => {
  const passwordFieldClass = `form-floating ${
    props.includeMargin ? "mb-3" : ""
  }`;
  return (
    <>
      <div className="form-floating">
        <input
          type="text"
          className="form-control"
          size={50}
          id="aliasInput"
          aria-label="alias"
          placeholder="name@example.com"
          onChange={(event) => props.setAlias(event.target.value)}
        />
        <label htmlFor="aliasInput">Alias</label>
      </div>
      <div className={passwordFieldClass}>
        <input
          type="password"
          className="form-control bottom"
          id="passwordInput"
          aria-label="password"
          placeholder="Password"
          onChange={(event) => props.setPassword(event.target.value)}
        />
        <label htmlFor="passwordInput">Password</label>
      </div>
    </>
  );
};
export default AuthenticationFields;

import React from "react";
import SignInComponent from "./SigninButton";

export const FormRegister = () => {
  return (
    <form>
      <label htmlFor="username">Username:</label>
      <br />
      <input type="text" id="username" name="username" />
      <br />
      <br />
      <label htmlFor="correo">Correo</label>
      <input type="email" name="email" id="email" />
      <label htmlFor="password">Password:</label>
      <br />
      <input type="password" id="password" name="password" />
      <button type="submit">Register</button>
      <SignInComponent />
    </form>
  );
};

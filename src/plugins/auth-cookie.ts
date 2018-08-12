import { Auth } from "./firebase-client-init";

export default context => {
  (Auth as any).addAuthTokenListener(idToken => {
    document.cookie =
      "__session=" + idToken + ";max-age=" + (idToken ? 3600 : 0);
  });
};

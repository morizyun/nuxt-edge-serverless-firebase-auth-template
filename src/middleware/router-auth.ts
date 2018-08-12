export default function({ store, redirect, route }) {
  if (!store.state.user.user) {
    return redirect("/login");
  } else if (route.path === "/login") {
    return redirect("/");
  }
}

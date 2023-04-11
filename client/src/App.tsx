import React from "react";
import { observer } from "mobx-react-lite";
import LoginForm from "./components/LoginForm";
import { Context } from ".";

const App: React.FC = () => {
  const { store } = React.useContext(Context);

  React.useEffect(() => {
    console.log("render");
    if (localStorage.getItem("accessToken")) {
      store.checkAuth();
    }
  }, []);

  if (!store.isAuth) {
    return <LoginForm />;
  }

  return (
    <div className="App">
      <h1>
        {store.isAuth && "Пользователь авторизован " + store?.user?.email}
      </h1>
      <button onClick={() => store.logout()}>logout</button>
    </div>
  );
};

export default observer(App);

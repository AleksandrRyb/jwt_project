import { FC, useState, useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const LoginForm: FC = () => {
  const { store } = useContext(Context);
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  return (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
      />
      <input
        placeholder="password"
        value={password}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={() => store.registration(email, password)}>
        Registration
      </button>
      <button onClick={() => store.login(email, password)}>Login</button>
    </div>
  );
};

export default observer(LoginForm);

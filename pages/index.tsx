import LevelSelect from "../components/LevelSelect/LevelSelect";
import { Provider } from "react-redux";
import { store } from "../store";

const IndexPage = () => {
  return (
    <Provider store={store}>
      <LevelSelect />
    </Provider>
  );
};

export default IndexPage;

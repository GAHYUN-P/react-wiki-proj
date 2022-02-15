import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import "../App.css";
import Detail from "../pages/Detail";
import Main from "../pages/Main";
import Write from "../pages/Write";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/write">
          <Write />
        </Route>
        <Route path="/detail">
          {/* axios연결 후 detail parameter연결 */}
          <Detail />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
      </Switch>
    </div>
  );
}

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.backgroundColor};
`;

const Title = styled.h1`
  color: ${(props) => props.theme.textColor};
`;

export default App;

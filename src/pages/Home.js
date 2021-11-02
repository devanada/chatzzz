import { useHistory } from "react-router-dom";
import logo from "../logo.svg";
import "../App.css";

function Home() {
  let history = useHistory();

  return (
    <div className="App">
      <header className="App-header">
        <img
          src={logo}
          className="App-logo"
          alt="logo"
          onClick={() => history.push("/todos")}
        />
        <p>APP1</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default Home;

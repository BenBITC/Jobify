import { Link, useRouteError } from "react-router-dom";
import Wrapper from "../assets/wrappers/ErrorPage";
import image from "../assets/images/not-found.svg";

const Error = () => {
  const error = useRouteError();
  console.log(error);
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={image} alt="Oh no!" />
          <h3>Page not found</h3>
          <p>We can't seem to find the page you're looking for</p>
          <Link to="/">Back home</Link>
        </div>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div>
        <h1>{`Error ${error.status}`}</h1>
        <h4>{`Something went wrong: ${error.statusText}`}</h4>
        <Link to="/">Back home</Link>
      </div>
    </Wrapper>
  );
};
export default Error;

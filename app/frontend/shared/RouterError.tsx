import { FunctionComponent } from 'react';
import { useRouteError } from 'react-router';

const statusMessages = {
  401: "You do not have permission to access this page.",
  404: "The page you're looking for doesn't exist.",
  default: "Something went wrong."
}

export const RouterError : FunctionComponent = () => {
  const error = useRouteError() as { status ?: number, data ?: { message ?: string } };

  return (
    <div>
      <h1>Oops! An error occurred.</h1>
      <p>{ statusMessages[`${error.status}`] || statusMessages.default }</p>
      { error.data && <p>{ error.data.message }</p> }
    </div>
  );
}

export default RouterError;
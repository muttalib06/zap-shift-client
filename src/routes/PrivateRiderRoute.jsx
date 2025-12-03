import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Spinner from "../components/common/Spinner";
import Forbidden from "../components/common/Forbidden";

const PrivateRiderRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Spinner></Spinner>;
  }

  if (role.role !== "Rider") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default PrivateRiderRoute;

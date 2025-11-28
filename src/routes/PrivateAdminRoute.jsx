import React from "react";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";
import Spinner from "../components/common/Spinner";
import Forbidden from "../components/common/Forbidden";

const PrivateAdminRoute = ({ children }) => {
  const { loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) {
    return <Spinner></Spinner>;
  }

  if (role.role !== "Admin") {
    return <Forbidden></Forbidden>;
  }
  return children;
};

export default PrivateAdminRoute;

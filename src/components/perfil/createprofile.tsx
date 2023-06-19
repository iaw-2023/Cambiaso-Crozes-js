import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";

const CreateProfile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  return (
    <div>
        {isAuthenticated && (
            <div>
                {user !== undefined  && (
                    <>
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    </>
                )}
            </div>
        )}
    </div>
  );
};

export default CreateProfile;
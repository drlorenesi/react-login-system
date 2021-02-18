import React from 'react';

function About({ user }) {
  return (
    <React.Fragment>
      <h1>My Account</h1>
      <p>
        Hello {user.firstName} {user.lastName}!
      </p>
    </React.Fragment>
  );
}

export default About;

import React from 'react';

interface IChatProps {
  username: string;
  logoutClickHandler: () => void;
}

export const Chat = ({ username, logoutClickHandler }: IChatProps) => {
  const onLogOutClick = React.useCallback(() => {
    logoutClickHandler();
  }, [logoutClickHandler]);

  return (
    <div>
      <h2>Chat app</h2>
      <p>{username}</p>
      <button onClick={onLogOutClick}>Log out</button>
    </div>
  );
};

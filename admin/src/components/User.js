import React from 'react';
export const User = props => {
  const selectChanged = e => {
    props.onSelectChanged(e.target.value);
  };
  return (
    <select value={props.val} onChange={selectChanged}>
      {props.users.map(u => (
        <option value={u.uid}>{u.displayName}</option>
      ))}
    </select>
  );
};

import React from 'react';
import { MdClose } from 'react-icons/md';

import './styles.css';

export default function DevItem({ dev, onDeleteForm }) {
  const { avatar_url, name, techs, github_username, bio } = dev;

  async function handleRemoveUser() {
    await onDeleteForm({ github_username });
  }

  return (
    <li className="dev-item">
      <div className="remove-item">
        <button type="button" onClick={() => handleRemoveUser()}>
          <MdClose />
        </button>
      </div>
      <header>
        <img src={avatar_url} alt={name} />
        <div className="user-info">
          <strong>{name}</strong>
          <span>{techs.join(', ')}</span>
        </div>
      </header>

      <p>{bio}</p>
      <a href={`https://github.com/${github_username}`}>
        Acessar perfil no Github
      </a>
    </li>
  );
}

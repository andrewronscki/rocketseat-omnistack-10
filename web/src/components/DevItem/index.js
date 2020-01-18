import React, { useState, useEffect } from 'react';
import { MdClose, MdEdit } from 'react-icons/md';
import { FaGithub } from 'react-icons/fa';
import Swal from 'sweetalert2';

import './styles.css';

export default function DevItem({ dev, onDeleteForm, onEditForm }) {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    async function editForm() {
      await onEditForm(edit);
    }

    editForm();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edit]);

  const { avatar_url, name, techs, github_username, bio } = dev;

  async function handleRemoveUser() {
    await Swal.fire({
      title: 'Remover usuário',
      text: 'Você tem certeza que quer remover o usuário?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      reverseButtons: true,
      confirmButtonText: 'Sim, remover usuário!',
    }).then(async result => {
      if (result.value) {
        await onDeleteForm({ github_username });
        Swal.fire('Removido!', 'Usuário removido com sucesso.', 'success');
      }
    });
  }

  async function handleEditUser() {
    await setEdit(!edit);
  }

  return (
    <li className="dev-item">
      <div className="remove-item">
        <button
          title="Deletar"
          type="button"
          onClick={() => handleRemoveUser()}
        >
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
      <div className="plus">
        <div className="github-link">
          <FaGithub />
          <a href={`https://github.com/${github_username}`}>
            Acessar perfil no Github
          </a>
        </div>
        <button title="Editar" type="button" onClick={() => handleEditUser()}>
          <MdEdit />
        </button>
      </div>
    </li>
  );
}

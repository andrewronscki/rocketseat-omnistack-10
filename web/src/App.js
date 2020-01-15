import React, { useEffect, useState } from 'react';
import api from './services/api';
import DevItem from './components/DevItem';
import DevForm from './components/DevForm';
import EditDev from './components/EditDev';

import './styles/global.css';
import './styles/App.css';

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs() {
      const response = await api.get('/devs');

      setDevs(response.data);
    }

    loadDevs();
  }, []);

  async function handleAddDev(data) {
    const response = await api.post('/devs', data);

    setDevs([...devs, response.data]);
  }

  async function handleInativeDev(data) {
    await api.put(`/devs/delete/${data.github_username}`);

    const filterDevs = devs.filter(
      dev => dev.github_username !== data.github_username
    );

    setDevs(filterDevs);
  }

  async function handleUpdateDev(data) {
    const { github_username, techs, latitude, longitude } = data;
    await api.put(`/devs/update/${github_username}`, {
      techs,
      latitude,
      longitude,
    });

    const response = await api.get('/devs');

    setDevs(response.data);
  }

  return (
    <div id="app">
      <div>
        <aside>
          <strong>Cadastrar</strong>
          <DevForm onSubmitForm={handleAddDev} />
        </aside>
        <aside>
          <strong>Editar</strong>
          <EditDev onUpdateForm={handleUpdateDev} />
        </aside>
      </div>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem dev={dev} key={dev._id} onDeleteForm={handleInativeDev} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;

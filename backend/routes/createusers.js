const axios = require('axios');

async function createUser() {
  try {
    const response = await axios.post('http://18.228.205.152:3000/users/', {
      nickname: 'Elsantip',
      email: 'eselsantiiiagovidarte@gmail.com',
      contact: '095112335095'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const newUser = response.data;
    console.log('Nuevo usuario creado:', newUser);
  } catch (error) {
    console.error('Error al crear el usuario:', error.response.data);
  }
}

createUser();

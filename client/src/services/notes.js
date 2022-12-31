import axios from 'axios';
const baseUrl = '/api/notes';

const noteService = () => {
  const getAll = () => {
    return new Promise((res, rej) => {
      axios
        .get(baseUrl)
        .then((response) => {
          console.log(response);
          res(response.data);
        })
        .catch(() => {
          rej('failure');
        });
      // const request = axios.get(baseUrl);
      // return request.then((response) => response.data);
    });
  };

  const create = (newObject) => {
    const request = axios.post(baseUrl, newObject);
    return request.then((response) => response.data);
  };

  const update = (id, newObject) => {
    const request = axios.put(
      `${baseUrl}/${id}`,
      newObject
    );
    return request.then((response) => response.data);
  };

  // const deleteNote = async id => {
  //   const data = await fetch(`${baseUrl}/${id}`, { method: "DELETE" }).then(response => response.json());
  // }

  return { getAll, create, update };
};
export default noteService;

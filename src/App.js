import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import Table from './components/table';
import axios from 'axios';
import { FiSearch } from "react-icons/fi"

function App() {
  const [toggle, setToggle] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await axios({
      url: "https://64268514d24d7e0de471ac78.mockapi.io/api/v1/users",
      method: "GET"
    })
    setUsers(res?.data);
    setLoading(false);
  }

  const refresh = () => {
    fetchUsers()
  }

  useEffect(() => {
    fetchUsers()
  }, []);
  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Loading....
          </p>
        </header>
      </div>
    )
  };

  if (!loading) {
    return (
      <div>
        <div className='main'>
          <button className='switch-btn' onClick={() => setToggle(!toggle)}>Switch</button>
        </div>
        <Table toggle={toggle} users={users} refresh={refresh} />
      </div>
    );
  }
  return <></>
}

export default App;

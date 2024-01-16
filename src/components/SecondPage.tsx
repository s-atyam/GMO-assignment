import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DataTable from './DataTable';
import DepartmentList from './DepartmentList';

const SecondPage: React.FC = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    // Retrieving user data from local storage
    const storedUserData = localStorage.getItem('userData');
    if(storedUserData){
      setUserData(JSON.parse(storedUserData));
    }else{

      // Redirecting back to the first page if data is not available
      alert('Please enter your details on the first page before accessing this page.');
      navigate('/');
    }
  }, []);

  return (
    <div style={{width:'60vw'}}>
      <h1>Second Page</h1>
      {userData && (
        <div style={{display:'flex', justifyContent:'flex-start'}}>
          <p style={{marginRight:'2rem'}}>Name: {userData.name}</p>
          <p style={{marginRight:'2rem'}}>Phone Number: {userData.phoneNumber}</p>
          <p style={{marginRight:'2rem'}}>Email: {userData.email}</p>
        </div>
      )}
      <h2>Data Table</h2>
      <DataTable />

      <h2>Department List</h2>
      <DepartmentList />
    </div>
  );
};

export default SecondPage;

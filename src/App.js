import React, { useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import { Container } from 'react-bootstrap';
import TopNavbar from './layout/TopNavbar';
import SearchUsers from './components/SearchUsers';
import UsersList from './components/UsersList';
import RepositoriesList from './components/RepositoriesList';
import './styles/index.scss';
import { GET_USERS, GET_REPOSITORIES } from './utils/queries';

const App = () => {
  const [userForSearch, setUserForSearch] = useState("");
  const [repoOwner, setRepoOwner] = useState("");
  const [getUsers, { calledData, loadingData, data }] = useLazyQuery(GET_USERS,  { variables: { user: userForSearch } });
  const [getRepositories, { calledRepo, loadingRepo, repos }] = useLazyQuery(GET_REPOSITORIES,  { variables: { owner: repoOwner } });
  
  const handlerSearchUser = (user) => {
    setUserForSearch(user);   
    getUsers(); 
  };

  const handlerSearchRepo = (owner) => {
    setRepoOwner(owner);   
    getRepositories();     
  };

  return (
    <>
      <TopNavbar />
      <Container className="mt-5">
        <SearchUsers handler={handlerSearchUser} /> 
        {loadingData && <p>Loading...</p>}             
        {data &&  (
          <section className="users-section section">
            <h3 className="mb-3">Users</h3>
            <UsersList users={data.search.edges} handler={handlerSearchRepo} />
          </section>
        )}  
        
        {loadingRepo && <p>Loading...</p>}
        
        {repos &&  (
          <section className="repo-section section">
            <h3 className="mb-3">Repositories</h3>
            {/* <RepositoriesList repos={} /> */}
          </section>
        )}      
      </Container> 
    </>
  );
}

export default App;
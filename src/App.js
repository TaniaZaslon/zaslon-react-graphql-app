import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Container } from "react-bootstrap";
import TopNavbar from "./layout/TopNavbar";
import Footer from "./layout/Footer";
import SearchUsers from "./components/SearchUsers";
import UsersList from "./components/UsersList";
import RepositoriesList from "./components/RepositoriesList";
import AOS from "../node_modules/aos/dist/aos";
import "./styles/index.scss";
import { GET_USERS, GET_REPOSITORIES } from "./utils/queries";

const App = () => {
  const [userForSearch, setUserForSearch] = useState("");
  const [repoOwner, setRepoOwner] = useState("");
  const [getUsers, { data: users }] = useLazyQuery(GET_USERS, { variables: { user: userForSearch } });
  let [getRepositories,{ data: repos }] = useLazyQuery(GET_REPOSITORIES, { variables: { owner: repoOwner } });
  // let [getIssues,{ data: issues }] = useLazyQuery(GET_ISSUES, { variables: { owner: repo } });

  AOS.init();

  const handlerSearchUser = (user) => {
    repos = null;
    setRepoOwner("");
    setUserForSearch(user);
    getUsers();
  };

  const handlerSearchRepo = (owner) => {
    setRepoOwner(owner);
    getRepositories();
  };

  const handlerSearchIssue = (repo) => {
    // setRepoOwner(owner);
    // getRepositories();
  };

  return (
    <>
      <TopNavbar />
      <Container className="mt-5">
        <SearchUsers handler={handlerSearchUser} />
      
        {users && (
          <section className="users-section section" data-aos="fade-up">
            <h2 className="mb-3">Users</h2>
            <UsersList users={users.search.edges} handler={handlerSearchRepo} />
          </section>
        )}
        
        {repos && (
          <section className="repo-section">
            <h2 className="mb-3">Repositories</h2>
            <RepositoriesList repos={repos.user.repositories.edges} owner={repoOwner} />
          </section>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default App;
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Container } from "react-bootstrap";
import TopNavbar from "./layout/TopNavbar";
import Footer from "./layout/Footer";
import SearchUsers from "./components/SearchUsers";
import UsersList from "./components/UsersList";
import RepositoriesList from "./components/RepositoriesList";
import IssuesList from "./components/IssuesList";
import AOS from "../node_modules/aos/dist/aos";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLongArrowAltLeft } from '@fortawesome/free-solid-svg-icons'
import "./styles/index.scss";
import { GET_USERS, GET_REPOSITORIES, GET_ISSUES } from "./utils/queries";

const App = () => {
  const [userForSearch, setUserForSearch] = useState("");
  const [repoOwner, setRepoOwner] = useState("");
  const [repoName, setRepoName] = useState("");
  const [showRepo, setShowRepo] = useState(false);
  const [showIssues, setShowIssues] = useState(false);

  const [getUsers, { data: users }] = useLazyQuery(GET_USERS, { variables: { user: userForSearch } });
  let [getRepositories, { data: repos }] = useLazyQuery(GET_REPOSITORIES, { variables: { owner: repoOwner } });
  const [getIssues, { data: issues }] = useLazyQuery(GET_ISSUES, { variables: { owner: repoOwner, repoName: repoName } });

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
    setShowRepo(true);
  };

  const handlerSearchIssue = (repoName) => {
    setRepoName(repoName);
    getIssues();
    setShowRepo(false);
    setShowIssues(true);
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
        
        {(repos && showRepo) && (
          <section className="repo-section">
            <h2 className="mb-3">Repositories</h2>
            <RepositoriesList repos={repos.user.repositories.edges} owner={repoOwner} handler={handlerSearchIssue} />
          </section>
        )}

        {(issues && showIssues) && (          
          <section className="issues-section" data-aos="zoom-in">{console.log(issues)}
            <a href=" " className="backToRepo" onClick={(e) => {e.preventDefault(); setShowIssues(false); setShowRepo(true)}}>
            <FontAwesomeIcon icon={faLongArrowAltLeft} />{' '}
            To Repositories</a>
            <h2 className="mb-5 mt-4">{repoName}</h2>
            <h2 className="mb-3">Open Issues</h2>
            <IssuesList issues={issues.user.repository.issues.edges} owner={repoOwner} repoName={repoName} />
          </section>
        )}
      </Container>
      <Footer />
    </>
  );
};

export default App;
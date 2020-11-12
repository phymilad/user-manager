import React, { useState } from 'react';
import styled from 'styled-components';
import SearchPanel from './SearchPanel';
import UserList from './UserList';
import { getUsers, deleteUser } from '../server'

const Header = styled.h1`
`
const Button = styled.button`
`
export default function UserManagerInHooks({ onEdit, onAdd }) {
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleKeywordChange = e => {
    setKeyword(e.target.value);
  }

  const handleSearch = async () => {
    setLoading(true);
    const users = await getUsers(keyword);
    setUsers(users);
    setLoading(false);
  }

  const handleDelete = async (id) => {
    await deleteUser(id);
    handleSearch();
  }

  const handleEdit = id => {
    onEdit(id);
  }

  return (
    <>
      <Header>Users!</Header>
      <SearchPanel
        keyword={keyword}
        onSearch={handleSearch}
        onKeywordChange={handleKeywordChange}
      />
      {!loading && <UserList
        onDelete={handleDelete}
        onEdit={handleEdit}
        users={users}
      />}
      {loading && <div>Loading ....</div>}
      <Button onClick={onAdd}>Add</Button>
    </>
  )
}

class UserManager extends React.Component {

  constructor() {
    super();

    this.state = {
      users: [],
      keyword: ''
    }
  }

  handleKeywordChange = e => {
    this.setState({ keyword: e.target.value });
  }

  handleSearch = async () => {
    const users = await getUsers(this.state.keyword);
    this.setState({ users })
  }

  handleDelete = async (id) => {
    await deleteUser(id);
    this.handleSearch();
  }

  handleEdit = id => {
    this.props.onEdit(id);
  }

  render() {
    return (
      <>
        <Header>Users!</Header>
        <SearchPanel
          keyword={this.state.keyword}
          onSearch={this.handleSearch}
          onKeywordChange={this.handleKeywordChange}
        />
        <UserList
          onDelete={this.handleDelete}
          onEdit={this.handleEdit}
          users={this.state.users}
        />
        <Button onClick={this.props.onAdd}>Add</Button>
      </>
    )
  }
}
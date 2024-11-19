
import React, { Component } from 'react';
import { TailSpin } from 'react-loader-spinner';

import UserItem from '../UserItem';
import UserForm from '../UserForm';
import "./index.css";

const apiStatus = {
    initial: 'initial',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress: 'IN_PROGRESS'
};

const columnHeaders = ['ID', 'First Name', 'Last Name', 'Email', 'Department', 'Actions'];

class UserList extends Component {
    state = {
        Users: [],
        status: apiStatus.initial,
        isFormVisible: false,
        formData: {
            firstName: "",
            lastName: "",
            email: "",
            department: "",
        },
        isEditing: false,
        editedUserId: null
    };

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers = async () => {
        this.setState({ status: apiStatus.inProgress });
        const Api_url = 'https://jsonplaceholder.typicode.com/users';
        try {
            const response = await fetch(Api_url);
            if (response.ok) {
                const data = await response.json();
                this.setState({ Users: data, status: apiStatus.success });
            } else {
                throw new Error('Failed to fetch');
            }
        } catch {
            this.setState({ status: apiStatus.failure });
        }
    };

    onClickAdd = () => {
        this.setState({ 
            isFormVisible: true, 
            isEditing: false, 
            formData: { firstName: "", lastName: "", email: "", department: "" } 
        });
    };

    onEdit = (user) => {
        const [firstName, lastName] = user.name.split(' ');
        this.setState({
            isFormVisible: true,
            isEditing: true,
            editedUserId: user.id,
            formData: {
                firstName,
                lastName,
                email: user.email,
                department: user.company.bs,
            },
        });
    };

    handleDeleteUser = async (id) => {
        const Api_url = `https://jsonplaceholder.typicode.com/users/${id}`;
        try {
            const response = await fetch(Api_url, { method: 'DELETE' });
            if (response.ok) {
                this.setState((prevState) => {
                    const updatedUsers = prevState.Users.filter(user => user.id !== id);
                    return { Users: updatedUsers };
                });
                alert("User deleted successfully!");
            } else {
                alert('Failed to delete user');
            }
        } catch {
            alert('Error deleting user');
        }
    };

    handleInputChange = (id, value) => {
        this.setState((prevState) => ({
            formData: {
                ...prevState.formData,
                [id]: value
            }
        }));
    };

    getNextUserId = () => {
        const { Users } = this.state;
        if (Users.length === 0) return 1;
        const maxNum = Math.max(...Users.map(user => user.id));
        return maxNum + 1;
    };

    handleFormSubmit = async () => {
        const { formData, isEditing, editedUserId, Users } = this.state;

        if (isEditing) {
            const updatedUsers = Users.map(user =>
                user.id === editedUserId ? { ...user, ...formData, name: `${formData.firstName} ${formData.lastName}` } : user
            );
            this.setState({ Users: updatedUsers, isFormVisible: false });
        } else {
            const newUser = {
                id: this.getNextUserId(),
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                company: { bs: formData.department },
            };
            this.setState(prevState => ({
                Users: [...prevState.Users, newUser],
                isFormVisible: false
            }));
        }
    };

    renderLoader = () => (
        <TailSpin type="TailSpin" color="#00BFFF" height={50} width={50} />
    );

    onClickRetry = () => {
        this.fetchUsers();
    };

    renderFailureView = () => (
        <div>
            <button type='button' className='retry-button' onClick={this.onClickRetry}>Retry</button>
        </div>
    );

    renderBasedOnStatus = () => {
        const { status } = this.state;
        switch (status) {
            case apiStatus.success:
                return this.renderUserList();
            case apiStatus.inProgress:
                return this.renderLoader();
            case apiStatus.failure:
                return this.renderFailureView();
            default:
                return null;
        }
    };

    renderUserList = () => {
        const { Users } = this.state;
        return (
            <>
                <h1 className='user-list-title'>Users</h1>
                <button className="user-add-button" onClick={this.onClickAdd}>Add User</button>
                <ul className='user-list'>
                    <li className='column-headers'>
                        {columnHeaders.map((header, index) => (
                            <span key={index} className="column-header">{header}</span>
                        ))}
                    </li>
                </ul>
                <ul className='user-list'>
                    {Users.map(eachUser => (
                        <UserItem userItem={eachUser} key={eachUser.id} onEdit={this.onEdit} onDelete={this.handleDeleteUser} />
                    ))}
                </ul>
                
            </>
        );
    };

    render() {
        const { isFormVisible, formData, isEditing } = this.state;
        return (
            <div className='home-container'>
                {isFormVisible ? (
                    <UserForm
                        formData={formData}
                        isEditing={isEditing}
                        onInputChange={this.handleInputChange}
                        onFormSubmit={this.handleFormSubmit}
                    />
                ) : (
                    this.renderBasedOnStatus()
                )}
            </div>
        );
    }
}

export default UserList

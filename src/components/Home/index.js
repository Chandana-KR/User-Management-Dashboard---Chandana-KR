import {Component} from 'react'
import { TailSpin } from 'react-loader-spinner'



import UserList from '../UserList'
import "./index.css"

const apiStatus = {
    initial : 'initial',
    success: 'SUCCESS',
    failure: 'FAILURE',
    inProgress : 'IN_PROGRESS'
}

const columnHeaders = ['ID', 'First Name', 'Last Name', 'Email', 'Department', 'Actions']

class Home extends Component {
    state = {
        Users : [],
        status : apiStatus.initial,
        isFormVisible: false,
        formData : {
            firstName:"",
            lastName:"",
            email:"",
            department:"",
        },
        isEditing: false,
        editedUser: null
        

    }

    componentDidMount() {
        this.fetchUsers()
    }

    fetchUsers = async () => {
        this.setState({status: apiStatus.inProgress})
        const Api_url = 'https://jsonplaceholder.typicode.com/users';
        const response = await fetch(Api_url);
        try {
            if (response.ok === true) {
                const data = await response.json();
                console.log(data)
                this.setState({Users: data , status: apiStatus.success})
            }
        } catch {
            this.setState({status: apiStatus.failure})
        }

    }

    onClickAdd = () => {
        this.setState({ isFormVisible: true, isEditing: false, formData: { firstName: "", lastName: "", email: "", department: "" } });
    };

    onEdit = (user) => {
       
        const [firstName, lastName] = user.name.split(' ');
        this.setState({
          isFormVisible: true,
          isEditing: true,
          editedUser: user.id,
          formData: {
            firstName,
            lastName,
            email: user.email,
            department: user.company.bs,
          },
        });
      };

    handleDeleteUser = async (id) => {
        // Send DELETE request to the API
        const Api_url = `https://jsonplaceholder.typicode.com/users/${id}`;
        
        try {
            const response = await fetch(Api_url, {
                method: 'DELETE',
            });

            if (response.ok) {
                // If successful, filter the user out of the list
                this.setState((prevState) => {
                    const updatedUsers = prevState.Users.filter(user => user.id !== id);
                    return { Users: updatedUsers };
                });
            } else {
                // Handle failed delete request if necessary (show an error)
                alert('Failed to delete user');
            }
        } catch (error) {
            // Handle network or other errors
            console.error('Error deleting user:', error);
            alert('Error deleting user');
        }
    }

    handleInputChange = event => {
        const {id, value} = event.target 
        this.setState((prevState => ({
            formData : {
                ...prevState.formData,
                [id]: value
            }
        })))
    }

     getNextUserId = () => {
        const {Users} = this.state 
        if(Users.length === 0) return 1 

        const maxNum = Math.max(...Users.map(user => user.id))
        return maxNum
     }

    handleFormSubmit = async event => {
        event.preventDefault()
        const { formData, isEditing, editedUser, Users } = this.state;

        if (isEditing) {
            // Update existing user
            const updatedUser = {
                id: editedUser,
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
                company: { ...Users.find(user => user.id === editedUser).company, bs: formData.department },
            };
    
            const Api_url = `https://jsonplaceholder.typicode.com/users/${editedUser}`;
    
            const options = {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedUser),
            };
    
            try {
                const response = await fetch(Api_url, options);
    
                if (response.ok) {
                    this.setState((prevState) => {
                        const updatedUsers = prevState.Users.map((user) =>
                            user.id === editedUser ? updatedUser : user
                        );
                        return {
                            Users: updatedUsers,
                            isFormVisible: false,
                            isEditing: false,
                            editedUser: null,
                            formData: { firstName: "", lastName: "", email: "", department: "" },
                        };
                    });
                } else {
                    alert("Failed to update user");
                }
            } catch (error) {
                console.error('Error updating user:', error);
                alert('Error updating user');
            }
        } else {


        const nextUserId = this.getNextUserId()

        const newUser= {
            id : nextUserId +1,
            name: `${formData.firstName} ${formData.lastName}`,
            email: formData.email,
            company : {
                bs: formData.department
            },
        }

        const Api_url = 'https://jsonplaceholder.typicode.com/users';
        const options = {
            method: "POST",
            headers: {
                'content-type' : "application/json"
            },
            body : JSON.stringify(newUser)
        }
 

        const response = await fetch(Api_url, options) 
        try {
            if(response.ok === true) {
                this.setState(prevState => ({
                 Users:   [...prevState.Users, newUser],
                 isFormVisible: false,
                 formData : {
                    firstName : "",
                    lastName : "",
                    email : "",
                    department : "",
                 }
                }))
            }
        } catch {

        }
    }
    }

    renderLoader = () => (
         <TailSpin type="TailSpin" color="#00BFFF" height={50} width={50} />
    )

    onClickRetry = () => {
      this.fetchUsers()  
    }

    renderFailureView = () => (
        <div>
            <button type='button' className='retry-button' onClick={this.onClickRetry} >Retry</button>
        </div>
    )

    renderBasedOnStatus = () => {
        const {status} = this.state 
        switch(status) {
            case apiStatus.success:
                return this.renderUserList()
            case apiStatus.inProgress:
                return this.renderLoader()
            case apiStatus.failure:
                return this.renderFailureView()
            default:
                return null
        }
    }

    renderUserList = () => {
        const { Users} = this.state
        return (
            <ul className='user-list'>
                <li className='column-headers'>
                    {columnHeaders.map((header, index) => (
                        <span key={index} className="column-header">{header}</span>
                    ))}
                </li>

                {Users.map(eachUser => (
                    <UserList userItem={eachUser} key={eachUser.id} onEdit={this.onEdit} onDelete={this.handleDeleteUser}  />
                ))}
            </ul>
        )
    }

    render() {
        const {formData, isFormVisible} = this.state
        return (
            <div className='home-container'>
                <h1 className='user-list-title'>Users</h1>

                {
                isFormVisible 
                ? 
                 (<form className='user-form' onSubmit={this.handleFormSubmit}>
                    <div className="user-form-field">
                        <label htmlFor='firstName' className='user-form-label'>First Name</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            className='user-form-input' 
                            value={formData.firstName} 
                            onChange={this.handleInputChange} 
                        />
                    </div>
                    <div className="user-form-field">
                        <label htmlFor='lastName' className='user-form-label'>Last Name</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            className='user-form-input' 
                            value={formData.lastName} 
                            onChange={this.handleInputChange} 
                        />
                    </div>
                    <div className="user-form-field">
                        <label htmlFor='email' className='user-form-label'>E-mail</label>
                        <input 
                            type="text" 
                            id="email" 
                            className='user-form-input' 
                            value={formData.email} 
                            onChange={this.handleInputChange} 
                        />
                    </div>
                    <div className="user-form-field">
                        <label htmlFor='department' className='user-form-label'>Department</label>
                        <input 
                            type="text" 
                            id="department" 
                            className='user-form-input' 
                            value={formData.department} 
                            onChange={this.handleInputChange} 
                        />
                    </div>
                    <button type="submit" className='user-form-save-button' >Save</button>
                </form>)
                :
                (<button type="button" className='user-add-button' onClick={this.onClickAdd}>Add</button>) 
                
                }
                

                

                <div className='user-list-container'>  
                    {this.renderBasedOnStatus() }
                </div>
            </div>
        )
    }
}

export default Home
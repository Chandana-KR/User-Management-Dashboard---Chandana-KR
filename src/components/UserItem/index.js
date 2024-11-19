
import './index.css'

const UserItem = (props) => {
    const { userItem, onEdit, onDelete } = props;  
    const { name, email, id, company } = userItem;
    const [firstName, lastName] = name.split(' ');
    console.log(lastName)

    const onClickEdit = () => {
            onEdit(userItem)
    }

    const onClickDelete = () => {
        onDelete(userItem.id)
    }

    return (
        <li className='user-list-item'>
        <span className='user-item-column'>{id}</span>
        <span className='user-item-column'>{firstName}</span>
        <span className='user-item-column'>{lastName}</span>
        <span className='user-item-column'>{email}</span>
        <span className='user-item-column'>{company.bs}</span>
        <span className='action-buttons'>
            <button className='edit-button' onClick={onClickEdit}> Edit</button>
            <button className='delete-button' onClick={onClickDelete}>Delete</button>
        </span>
        </li>
    );
};

export default UserItem;

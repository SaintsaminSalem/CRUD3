export default function UserTable({
users,
onDelete,
onEdit
}){


return(

<table>


<thead>

<tr>

<th>Name</th>

<th>Email</th>

<th>Address</th>

<th>Action</th>

</tr>

</thead>



<tbody>


{
users.map(user=>(

<tr key={user._id}>


<td>{user.name}</td>

<td>{user.email}</td>

<td>{user.address}</td>



<td>
  <div className="action-buttons">
    <button onClick={() => onEdit(user)}>
      Edit
    </button>

    <button onClick={() => onDelete(user._id)}>
      Delete
    </button>
  </div>
</td>



</tr>

))
}



</tbody>


</table>


)

}
import {useEffect,useState} from "react";

import {
getUsers,
createUser,
updateUser,
deleteUser

} from "../api/userApi";



export default function useUsers(){


const [users,setUsers]=useState([]);

const [loading,setLoading]=useState(false);

const [error,setError]=useState("");




const fetchUsers=async()=>{

try{

setLoading(true);

const data=await getUsers();

setUsers(data);


}

catch(err){

setError(err.message);

}

finally{

setLoading(false);

}

};



useEffect(() => {

    const loadUsers = async () => {
        await fetchUsers();
    };

    loadUsers();

}, []);





const addUser=async(user)=>{


const newUser=await createUser(user);


setUsers([
...users,
newUser
]);


};





const editUser=async(id,user)=>{


const updatedUser =
await updateUser(id,user);



setUsers(

users.map(
(item)=>

item._id===id
?
updatedUser
:
item

)

);


};






const removeUser=async(id)=>{


await deleteUser(id);



setUsers(

users.filter(
user=>user._id!==id
)

);


};




return{

users,

loading,

error,

addUser,

editUser,

removeUser

};


}

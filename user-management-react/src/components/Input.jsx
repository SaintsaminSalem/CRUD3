export default function Input({
name,
value,
onChange,
placeholder
}){


return(

<input

name={name}

value={value}

onChange={onChange}

placeholder={placeholder}

/>

)

}
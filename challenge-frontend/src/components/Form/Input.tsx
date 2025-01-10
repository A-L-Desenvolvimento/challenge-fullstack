
const Input = (

        name,
        type,
        ...props

) => {

    return (
        <div>
            <label>{name}</label>
            <input name={name} id={name} className={"flex w-full h-12"} />
        </div>
    )
}

export default Input;
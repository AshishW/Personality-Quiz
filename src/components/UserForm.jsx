import {useState, useContext} from 'react'
import { UserContext} from "./UserContext.jsx";

export default function UserForm(){
    const [inputName, setInputName] = useState('');
    const { setName } = useContext(UserContext);

    function handleSubmit(e){
        e.preventDefault();
        setName(inputName);
        window.history.pushState({}, '', '/quiz')
        const navEvent = new PopStateEvent('popstate');
        window.dispatchEvent(navEvent);
    }

    function handleInputChange(e){
        setInputName(e.target.value);
    }

    return (
        <form>
            <label>Name:</label>
            <input type = 'text' value = {inputName} onChange={handleInputChange}/>
            <button type='submit' onClick={handleSubmit}>Start Quiz</button>
        </form>
    );
}
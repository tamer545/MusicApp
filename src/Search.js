import {Form, InputGroup} from "react-bootstrap";
import {useState} from "react";

export default function Search({onSearchTrigger}) {
    const [searchValue, setSearchValue] = useState('')

    function doSomething(event) {
        event.preventDefault()

        onSearchTrigger(searchValue)
        setSearchValue(searchValue)

    }

    return (
        <>
            <Form onSubmit={doSomething}>
                <InputGroup style={{width: '100%'}}>
                    <Form.Control
                        type={"search"}
                        placeholder={"band name..."}
                        id={"search-form"}
                        value={searchValue}
                        onChange={e => setSearchValue(e.target.value)}
                    />
                    <Form.Label htmlFor={"search-form"} className={"visually-hidden"}>Search</Form.Label>
                    <InputGroup.Text aria-hidden={"true"} id={"search-addon"}>🔍</InputGroup.Text>
                </InputGroup>
            </Form>
        </>
    )
}
import React from 'react'
import { InputGroup, FormControl, Button } from 'react-bootstrap';
import BugsTable from '../bugsTable/bugsTable'
import './searchBugs.css';

class SearchBugs extends React.Component {

    constructor(props) {
        super(props);

        // firstVaild - for not show the "Tester name isn't valid" at first
        this.state = { value: '', valid: false, firstValid: true, loading: false }

        // Create ref to bugsTable for invoking events
        this.bugsTable = React.createRef();

        // Bound functions
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.onClick = this.onClick.bind(this)
    }

    // Text is changing...
    handleChange(event) {
        let text = event.target.value
        let isValid = this.textValid(text)
        this.setState({ value: text, valid: isValid, firstValid: isValid });
    }

    // input - text (testerName)
    // output - true if the text is valid otherwise false
    textValid(text) {
        return text.length >= 2 && text.length <= 12
    }

    // Enter clicked
    handleKeyUp(event) {
        if (event.key === "Enter")
            if (this.state.valid) this.onClick()
    }

    // Call the child function(BugsTable)
    async onClick() {
        this.setState({loading:true})
        await this.bugsTable.current.fetchBugs(this.state.value);
        this.setState({loading:false})
    }

    render() {
        return (
            <div className="wrapper">
                {!this.state.firstValid ? <h6 className="noValidError">Tester name isn't valid</h6> : <div className="saveSpace"></div>}
                <InputGroup className="mb-3">
                    <FormControl id="testerNameInput"
                        value={this.state.value}
                        onChange={this.handleChange}
                        onKeyUp={this.handleKeyUp}
                        placeholder="Enter the tester name... (2-12 characters)"
                    />
                    <InputGroup.Append>
                        <Button id="fetchButton"
                            variant="outline-secondary"
                            onClick={this.onClick}
                            disabled={!this.state.valid}>Fetch</Button>
                    </InputGroup.Append>
                </InputGroup>
                {this.state.loading ? <div class="loader"></div>: <div className="saveLoaderSpace"></div>}
                <BugsTable ref={this.bugsTable} />
            </div>
        )
    }
}

export default SearchBugs;
import React from 'react'
import ReactTable from 'react-table'
import axios from 'axios'
import './bugsTable.css';

class BugsTable extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            error: false,
            data: [],
            columns: [{
                Header: 'First name',
                accessor: 'firstName',
                width: 200
            }, {
                Header: 'Last name',
                accessor: 'lastName',
                width: 200
            }, {
                Header: 'Country',
                accessor: 'country',
                width: 200
            },
            {
                Header: 'Bugs',
                accessor: 'bugs'
            }],
            pageSize: 8
        }

        // Bound functions
        this.requestError = this.requestError.bind(this)
        this.fetchBugs = this.fetchBugs.bind(this)
    }

    // input - TesterName (String)
    // action - Http Get by TesterName to fill the table
    async fetchBugs(testerName) {
        let url = `https://test-api.techsee.me/api/ex/${testerName}`

        // Build request
        await axios.get(url)
            .then((response) => this.fillTable(response))
            .catch((error) => this.requestError(error))
    }

    // Input - response data
    // Output - filling the table according the data
    fillTable(response) {
        let newData = []
        if (Array.isArray(response.data)) {
            response.data.length === 0 ? newData = [] : newData = this.parseData(response.data)
        } else {
            if (response.data !== "")
                newData.push(this.parseTester(response.data))
        }
        this.setState({ data: newData })
    }

    // Input - data (Service Format)
    // Output - data (Table Format)
    parseData(data) {
        return data.map((item) => this.parseTester(item))
    }

    // Show error if needed
    requestError() {
        this.setState({ error: true })
    }

    // Input -  One tester (Service Format)
    // Output - One tester (Table Format)
    parseTester(tester) {
        tester.bugs = tester.bugs.reduce((prev, curr) => {
            if (prev !== "")
                prev = prev + ", "
            return prev + curr.title

        }, "")
        return tester
    }

    render() {

        return <div>
            {this.state.error ? <h6 className="error">Temporary error occurred, please try again later</h6> : <div className="saveSpace"> </div>}
            <ReactTable
                data={this.state.data}
                columns={this.state.columns}
                defaultSorted={[{
                    id: "firstName"
                }]}
                defaultPageSize={this.state.pageSize}
                showPageSizeOptions={false}
            />
        </div>
    }
}

export default BugsTable;
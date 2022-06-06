import React from "react"
import {} from 'naruse-share'


const pageCache = {

};


const withPage = (Component) => {
    return class extends React.Component {
        render () {
            return <Component {...this.props} currentPage={getPageInstant()} />
        }
    }
}


const getPageInstant = () => {
    return {

    }
}
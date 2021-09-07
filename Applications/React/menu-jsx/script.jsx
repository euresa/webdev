class MenuThingy extends React.Component {
    render(){
        return (
            <div>
            <h1> This is the menu:</h1>
            <UL/>
            </div>
        )
    }
}

class UL extends React.Component {
    render(){                     
        const Style = {color: 'red', fontSize: 12}
        let menus = ['Home', 'About', 'Services', 'Portfolio', 'Contact Us']
        const liStyle = { marginLeft: 10, display: "inline-block" }
        return (
            <ul style={Style}>
                {menus.map(
                    (v, i) => { return <li style={liStyle} key={i}>  <Link label={v} /> </li>})
                }
            </ul>
        )
    }
}

class Link extends React.Component{
    render(){
        const url = '/' + this.props.label.toLowerCase().trim().replace(' ', '-')
        const linkStyle = {color: 'green'}
        return (
        <div>
            <a href={url} style={linkStyle}>
                {this.props.label}
            </a>
            <br/>
        </div>
        )
    }
}

ReactDOM.render(<MenuThingy/>, document.getElementById('menu'))
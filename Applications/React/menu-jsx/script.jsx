class Menu extends React.Component {
    render(){
        let menus = ['Home', 'About', 'Services', 'Portfolio', 'Contact Us']
        return (
            <div>
                {menus.map((v,i) => {
                    return <div key={i}> <Link label={v}/> </div>
                })}
            </div>
        )
    }
}

class Link extends React.Component{
    render(){
        return (
        <div>
            <a href={url}>
                {this.props.label}
            </a>
            <br/>
        </div>
        )
    }
}

ReactDOM.render(<Menu/>, document.getElementById('menu'))
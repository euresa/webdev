class Tooltip extends React.Component{
    constructor(props){
        super(props)
        this.state = {opacity: false}
        this.toggle = this.toggle.bind(this)
    }
    toggle(){
        const tooltipNode = ReactDOM.findDOMNode(this)
        this.setState({
            opacity: !this.state.opacity,
            top: tooltipNode.offsetTop,
            left: tooltipNode.offsetLeft,
        })
    }
    render(){
        const style = {
            zIndex: (this.state.opacity) ? 1000 : -1000,
            opacity: +this.state.opacity,
            top: (this.state.top || 0) - 30,
            left: (this.state.left || 0) - 30
        }
        return (
            <div style={{ display: 'inline'}}>
                <span style = {{color: 'cornflowerblue'}} 
                    onMouseEnter= {this.toggle}
                    onMouseOut = {this.toggle}>
                    {this.props.children}
                </span>
                <div className="tooltip top"
                    style={style}
                    role="tooltip">
                    <div className="tooltip-arrow"></div>
                    <div className="tooltip-inner">
                        {this.props.text}
                    </div>
                </div>
            </div>
        )
    }
}

var tooltipMessage = "The book you're reading now"
var tooltipDiv = <div><Tooltip text = {tooltipMessage} >React Quickly</Tooltip> was published in 2017. It's awesome!</div>
ReactDOM.render(tooltipDiv, document.getElementById("tooltip"))
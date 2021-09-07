class MenuThingy extends React.Component {
    render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                null,
                ' This is the menu:'
            ),
            React.createElement(UL, null)
        );
    }
}

class UL extends React.Component {
    render() {
        const Style = { color: 'red', fontSize: 12 };
        let menus = ['Home', 'About', 'Services', 'Portfolio', 'Contact Us'];
        const liStyle = { marginLeft: 10, display: "inline-block" };
        return React.createElement(
            'ul',
            { style: Style },
            menus.map((v, i) => {
                return React.createElement(
                    'li',
                    { style: liStyle, key: i },
                    '  ',
                    React.createElement(Link, { label: v }),
                    ' '
                );
            })
        );
    }
}

class Link extends React.Component {
    render() {
        const url = '/' + this.props.label.toLowerCase().trim().replace(' ', '-');
        const linkStyle = { color: 'green' };
        return React.createElement(
            'div',
            null,
            React.createElement(
                'a',
                { href: url, style: linkStyle },
                this.props.label
            ),
            React.createElement('br', null)
        );
    }
}

ReactDOM.render(React.createElement(MenuThingy, null), document.getElementById('menu'));

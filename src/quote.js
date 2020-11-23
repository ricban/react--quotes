import React from 'react';
import './quote.css';

export default class Quote extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quotes: [],
            quote: {},
            tweet: ""
        }

        this.getRandomQuote = this.getRandomQuote.bind(this);
    }

    getRandomQuote = () => this.setState(prevState => {

        const quote = prevState.quotes[Math.floor(Math.random() * prevState.quotes.length)];
        const tweet = 'https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=' + encodeURIComponent('"' + quote.quote + '"\n–' + quote.author);

        return { quote, tweet }
        
    });

    async componentDidMount() {

        const response = await fetch("https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json");
        const result = await response.json();

        this.setState({quotes: result.quotes});
        this.getRandomQuote();

        // uncomment code below to run freeCodeCamp test script
        
        // const script = document.createElement("script");
        // script.src = "https://cdn.freecodecamp.org/testable-projects-fcc/v1/bundle.js";
        // script.async = true;
        // document.body.appendChild(script);
    }

    render () {
        return (
            <div id="quote-box">
                <blockquote>
                    <p id="text">{this.state.quote.quote}</p>
                    <footer id="author">{this.state.quote.author}</footer>
                </blockquote>
                <div className="wrapper">
                    <span id="new-quote" className="btn" onClick={this.getRandomQuote}>New Quote</span>
                    <a id="tweet-quote" className="btn" target="_blank" rel="noopener noreferrer" href={this.state.tweet}>Tweet Quote</a>
                </div>
            </div>
        )
    }
}
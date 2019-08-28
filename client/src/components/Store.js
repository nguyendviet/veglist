import React from 'react';
import Autosuggest from 'react-autosuggest';
import '../css/Store.css';

const stores = [
    {name: 'Giant'},
    {name: 'Whole Foods'}
];
  
function escapeRegexCharacters(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
  
function getSuggestions(value) {
    const escapedValue = escapeRegexCharacters(value.trim());

    if (escapedValue === '') {
        return [];
    }

    const regex = new RegExp('^' + escapedValue, 'i');

    return stores.filter(language => regex.test(language.name));
}

function getSuggestionValue(suggestion) {
    return suggestion.name;
}

function renderSuggestion(suggestion) {
    return (
        <span>{suggestion.name}</span>
    );
}
  
export default class Store extends React.Component {
    constructor() {
        super();
    
        this.state = {
            value: '',
            suggestions: []
        };    
    }
  
    onChange = (event, { newValue, method }) => {
        this.setState({
            value: newValue
        });
    };
    
    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: getSuggestions(value)
        });
    };
  
    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };
  
    render() {
        const { value, suggestions } = this.state;
        const storeInput = {
            placeholder: "Type store name",
            value,
            onChange: this.onChange
        };
        const unitInput = {
            placeholder: "Type unit name",
            value,
            onChange: this.onChange
        }
    
        return (
            <div>
                <Autosuggest 
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={unitInput} />
    
                <Autosuggest 
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                inputProps={storeInput} />
            </div>
        );
    }
}
  
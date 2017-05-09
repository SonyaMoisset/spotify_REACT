import React, {Component} from 'react';
import {Gallery, Profile} from '../components/Index';
import {FormGroup, FormControl, InputGroup, Glyphicon} from 'react-bootstrap';
import './SpotifyContainer.css';

export default class SpotifyContainer extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            query: '',
            artist: null,
            tracks: []
        }
    }

    search() {
       const BASE_URL = 'https://api.spotify.com/v1/search?';
       const PROFILE_URL = `${BASE_URL}q=${this.state.query}&type=artist&limit=1`;
       const ALBUM_URL = 'https://api.spotify.com/v1/artists/';

       fetch(PROFILE_URL, {
           method: 'GET'
       })
       .then(response => response.json())
       .then(json => {
           const artist = json.artists.items[0];
           this.setState({artist});

           const GALLERY_URL = `${ALBUM_URL}${artist.id}/top-tracks?country=US&`
           fetch(GALLERY_URL, {
               method: 'GET'
           })
           .then(response => response.json())
           .then(json => {
                const {tracks} = json;
                this.setState({tracks});
           })
       });
    }

    handleClick = () => {
        this.search(); 
    }

    handleChange = (event) => { 
        this.setState({ 
            query: event.target.value 
        })
    }

    handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            this.search()
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div className="main-title">Spotify</div>
                <FormGroup>
                    <InputGroup>
                        <FormControl
                            type="text"
                            placeholder="Search for an Artist"
                            value={this.state.query}
                            onChange={this.handleChange}
                            onKeyPress={this.handleKeyPress}
                        />
                        <InputGroup.Addon onClick={this.handleClick} >
                            <Glyphicon glyph="search"></Glyphicon>
                        </InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
               {
                this.state.artist !== null ?
                <div>
                    <Profile 
                        artist={this.state.artist}
                    />
                    <Gallery 
                        tracks={this.state.tracks}
                    />
                </div>
                : <div></div>
               }
            </div>
        );
    }
}
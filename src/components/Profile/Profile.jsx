import React, {Component} from 'react';
import './Profile.css';

export default class Profile extends Component {
    render() {
        let artist = {
            name: '', 
            followers: {
                total: ''
            },
            images: [
                {
                    url: ''
                }
            ],
            genres: []
        };

        artist = this.props.artist !== null ? this.props.artist : artist;

        return (
            <div className="profile">
                <img 
                    alt="Profile"
                    className="profile-img"
                    src={artist.images[0].url}
                /> 
                <div className="profile-info">
                    <div className="profile-name">{artist.name}</div>
                    <div className="profile-followers">
                        {artist.followers.total} followers
                    </div>
                    <div className="profile-genres">
                        {
                            artist.genres.map((genre, index) => {
                                genre = genre !== artist.genres[artist.genres.length - 1] 
                                              ? ` ${genre},` 
                                              : ` & ${genre}`;
                                return (
                                    <span key={index}>{genre}</span>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        );
    }
}
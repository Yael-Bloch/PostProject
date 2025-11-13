import React, { useEffect, useState } from 'react';
import '../StyleSheet/Albums.css';
import Home from '../Components/Home.jsx';
import Filters from '../Components/Filters.jsx';
import Album from '../Components/Album.jsx';

const Albums = () => {
    const [allAlbums, setAllAlbums] = useState([]);
    const [error, setError] = useState('');
    const [albumTitle, setAlbumTitle] = useState('');
    const [albumsToShow, setAlbumsToShow] = useState([]);
    const [currentUser, setCurrentUser] = useState('');
    const [isLoading, setIsLoading] = useState(true); // מצב לטעינה

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('CurrentUser'));
        setCurrentUser(user);

        fetch(`http://localhost:3000/albums?userId=${user.id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    console.log('Albums found:', data);
                    setAllAlbums(data);
                    setAlbumsToShow(data);
                    localStorage.setItem('AllAlbumsOfCurrentUser', JSON.stringify(data));
                    localStorage.setItem('AlbumsToShowOfCurrentUser', JSON.stringify(data));
                } else {
                    setError('No albums to show');
                }
            })
            .catch(error => {
                console.error('Error fetching albums:', error);
                setError('Error fetching albums');
            })
            .finally(() => {
                setIsLoading(false); // סיום מצב הטעינה
            });
    }, []);

    const handleAddAlbum = () => {
        let nextAlbumId;
        let lastAlbumId;
        fetch(`http://localhost:3000/albums`)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    lastAlbumId = Number(data[data.length - 1].id);
                    nextAlbumId = lastAlbumId + 1;
                } else {
                    nextAlbumId = 1;
                }
            })
            .then(() =>
                fetch('http://localhost:3000/albums', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        userId: Number(currentUser.id),
                        id: `${nextAlbumId}`,
                        title: albumTitle,
                    }),
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log(`Album ${albumTitle} added:`, data);
                        setAlbumsToShow(prev=>[...prev,data]);
                        setAllAlbums(prev=>[...prev,data]);
                    })
                    .catch(error => {
                        console.error('Error adding album:', error);
                        setError('Error adding album to the system.');
                    })
            )
            .catch(error => console.error('Error fetching API:', error));
        setAlbumTitle('');
    };

    return (
        <div className="albums-page-container">
            <Home />
            <div className="albums-container">
                <h1 className="albums-title">Your Albums</h1>
                {isLoading ? ( // אם הטעינה לא הושלמה
                    <div>Loading albums...</div>
                ) : (
                    <Filters albumsToShow={albumsToShow} setAlbumsToShow={setAlbumsToShow} />
                )}
                <div className="albumAddition">
                    <input
                        placeholder="Enter your album name and click add"
                        type="text"
                        onChange={(e) => setAlbumTitle(e.target.value)}
                        value={albumTitle}
                    />
                    <button type="submit" onClick={handleAddAlbum}>
                        Add an Album
                    </button>
                </div>
                <div className="albums-list">
                    {albumsToShow && albumsToShow.length > 0 ? (
                        albumsToShow.map(album => (
                            <Album key={album.id} id={album.id} title={album.title} />
                        ))
                    ) : (
                        <div className="error-message">{error}</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Albums;

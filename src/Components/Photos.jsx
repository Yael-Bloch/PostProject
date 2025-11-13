import React, { useEffect, useState } from 'react';
import '../StyleSheet/Photos.css';
import { useLocation } from 'react-router-dom';
import Home from './Home';

const Photos = () => {
    const location = useLocation();
    const { title, id } = location.state || {};
    const [allPhotos, setAllPhotos] = useState([]);
    const [error, setError] = useState('');
    const [deleteError, setDeleteError] = useState('');
    const [visiblePhotos, setVisiblePhotos] = useState(10);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showUpdateModal, setShowUpdateModal] = useState(false); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [newPhoto, setNewPhoto] = useState({
        id: null,
        albumId: Number(id) || '',
        title: '',
        url: '',
        thumbnailUrl: '',
    });
    const [updatePhoto, setUpdatePhoto] = useState({
        id: '',
        title: '',
        url: '',
        thumbnailUrl: '',
    });
    const [deleteOption, setDeleteOption] = useState('id');
    const [deleteValue, setDeleteValue] = useState('');

    useEffect(() => {
        if (!id) return;

        fetch(`http://localhost:3000/photos?albumId=${id}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.length > 0) {
                    setAllPhotos(data);
                } else {
                    setError('No photos found for this album.');
                }
            })
            .catch(() => setError('Error fetching photos.'));
    }, [id]);

    const loadMorePhotos = () => setVisiblePhotos((prev) => prev + 10);

    const handleAddPhoto = () => {
        // const nextId = allPhotos.length > 0 ? String(Number(allPhotos[allPhotos.length - 1].id) + 1) : '1';
        // const newPhotoToAdd = {
        //     ...newPhoto,
        //     id: nextId,
        //     albumId: Number(id),
        // };
        fetch('http://localhost:3000/photos')
        .then((response) => response.json())
        .then((data) => {
            const nextId = data.length > 0 ? String(Number(data[data.length - 1].id) + 1) : '1';
            const newPhotoToAdd = {
                ...newPhoto,
                id: nextId,
                albumId: Number(id),
            };
        // עדכון מיידי של התמונות במסך
        setAllPhotos((prev) => [...prev, newPhotoToAdd]);
        setShowAddModal(false);
    
        // שליחת הבקשה לשרת
        fetch('http://localhost:3000/photos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPhotoToAdd),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to add photo');
                }
                setError('')
                return response.json();
                
            })
            .catch((error) => {
                console.error('Error adding photo:', error);
                // מחיקת התמונה במידה והוספה לשרת נכשלה
                setAllPhotos((prev) => prev.filter((photo) => photo.id !== nextId));
            });
            setNewPhoto({
                id: null,
                albumId: Number(id) || '',
                title: '',
                url: '',
                thumbnailUrl: '',
            });
        })
        .catch(() => console.error('Error fetching photos.'));
    };
    


    
    const handleUpdatePhoto = () => {
        const photoIndex = allPhotos.findIndex((photo) => photo.id === updatePhoto.id);
        if (photoIndex === -1) {
            setError('Photo not found for update.');
            return;
        }

        const originalPhoto = allPhotos[photoIndex];

    // עדכון הערכים הקיימים רק עם הערכים החדשים
    const updatedPhoto = {
        id:originalPhoto.id,
        albumId:originalPhoto.albumId,
        title:updatePhoto.title||originalPhoto.title,
        url:updatePhoto.url||originalPhoto.url,
        thumbnailUrl:updatePhoto.thumbnailUrl||originalPhoto.thumbnailUrl
    };

    // עדכון המערך המקומי
    const updatedPhotos = [...allPhotos];
    updatedPhotos[photoIndex] = updatedPhoto;
    setAllPhotos(updatedPhotos);

    // עדכון השרת
    setShowUpdateModal(false);

        fetch(`http://localhost:3000/photos/${updatePhoto.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPhoto),
        }).then(()=>
            console.log("succsses")
        ).catch(() => {
            setError('Failed to update photo on server.');
        });
    };


    const handleDeletePhoto = () => {
        if (!deleteValue) {
            setDeleteError('Please provide a value to delete.');
            return;
        }
    
        const queryValue = deleteOption === 'url' ? encodeURIComponent(deleteValue) : deleteValue;
        const photoToDelete = allPhotos.find((photo) => String(photo[deleteOption]) === deleteValue);
    
        if (!photoToDelete) {
            setDeleteError(`No photo found with the provided ${deleteOption}.`);
            return;
        }
    
        // עדכון מיידי של התמונות במסך
        setAllPhotos((prev) => prev.filter((photo) => photo[deleteOption] !== deleteValue));
        setShowDeleteModal(false);
    
        // שליחת הבקשה לשרת
        fetch(`http://localhost:3000/photos/${photoToDelete.id}`, { method: 'DELETE' })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to delete photo');
                }
                if(allPhotos.length<1)
                {
                    setError('No photos found for this album.')
                }
            })
            .catch((error) => {
                console.error('Error deleting photo:', error);
                // הוספת התמונה חזרה במידה והמחיקה נכשלה
                setAllPhotos((prev) => [...prev, photoToDelete]);
            });
            setDeleteOption('id');
            setDeleteValue('');
    };
    return (
        <div className="photos-page-container">
            <Home />
            <div className="photos-container">
                <h2 className="photoHeader">
                    The photos of the Album: <em className="title-text">{title}</em>
                </h2>
                <div className="AlbumChanges">
                    <button onClick={() => setShowAddModal(true)}>Add a photo</button>
                    <button onClick={() => setShowUpdateModal(true)}>Update a photo</button>
                    <button onClick={() => setShowDeleteModal(true)}>Delete a photo</button>
                </div>
                <div className="photos-grid">
                    {allPhotos.slice(0, visiblePhotos).map((photo) => (
                        <div className="photo-item" key={photo.id}>
                            <img
                                src={photo.thumbnailUrl}
                                alt={photo.title}
                                className="photo-thumbnail"
                            />
                        </div>
                    ))}
                </div>
                {visiblePhotos < allPhotos.length && (
                    <button onClick={loadMorePhotos} className="load-more-button">
                        Load More
                    </button>
                )}
                {error && <div className="error-message">{error}</div>}
            </div>

            {showAddModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Add Photo</h3>
                        <label>
                            Title:
                            <input
                            
                                type="text"
                                value={newPhoto.title}
                                onChange={(e) =>
                                    setNewPhoto((prev) => ({ ...prev, title: e.target.value }))
                                }
                            />
                        </label>
                        <label>
                            URL:
                            <input
                                type="text"
                                value={newPhoto.url}
                                onChange={(e) =>
                                    setNewPhoto((prev) => ({ ...prev, url: e.target.value }))
                                }
                            />
                        </label>
                        <label>
                            Thumbnail URL:
                            <input
                                type="text"
                                value={newPhoto.thumbnailUrl}
                                onChange={(e) =>
                                    setNewPhoto((prev) => ({
                                        ...prev,
                                        thumbnailUrl: e.target.value,
                                    }))
                                }
                            />
                        </label>
                        <p>{error}</p>
                        <button onClick={handleAddPhoto}>Add</button>
                        <button onClick={() => {setShowAddModal(false);
                            setNewPhoto({
                                id: null,
                                albumId: Number(id) || '',
                                title: '',
                                url: '',
                                thumbnailUrl: '',
                            });
                            }}>Cancel</button>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Delete Photo</h3>
                        <label>
                            Delete By:
                            <select
                                value={deleteOption}
                                onChange={(e) => setDeleteOption(e.target.value)}
                            >
                                <option value="id">ID</option>
                                <option value="title">Title</option>
                                <option value="url">URL</option>
                            </select>
                        </label>
                        <label>
                            Value:
                            <input
                                type="text"
                                value={deleteValue}
                                onChange={(e) => setDeleteValue(e.target.value)}
                            />
                        </label>

                        {deleteError && <p className="error-message">{deleteError}</p>}

                        <button onClick={handleDeletePhoto}>Delete</button>
                        <button onClick={() => {setShowDeleteModal(false); setDeleteOption('id');setDeleteValue('');}}>Cancel</button>
                    </div>
                </div>
            )}
            {showUpdateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Update Photo</h3>
                        <label>
                            ID:
                            <input
                                placeholder='Enter the id of the item to update'
                                type="text"
                                value={updatePhoto.id}
                                onChange={(e) => setUpdatePhoto((prev) => ({ ...prev, id: e.target.value }))}
                            />
                        </label>
                        <label>
                            Title:
                            <input
                                type="text"
                                value={updatePhoto.title}
                                onChange={(e) => setUpdatePhoto((prev) => ({ ...prev, title: e.target.value }))}
                            />
                        </label>
                        <label>
                            URL:
                            <input
                                type="text"
                                value={updatePhoto.url}
                                onChange={(e) => setUpdatePhoto((prev) => ({ ...prev, url: e.target.value }))}
                            />
                        </label>
                        <label>
                            Thumbnail URL:
                            <input
                                type="text"
                                value={updatePhoto.thumbnailUrl}
                                onChange={(e) =>
                                    setUpdatePhoto((prev) => ({ ...prev, thumbnailUrl: e.target.value }))
                                }
                            />
                        </label>
                        <button onClick={handleUpdatePhoto}>Update</button>
                        <button onClick={() => setShowUpdateModal(false)}>Cancel</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Photos;

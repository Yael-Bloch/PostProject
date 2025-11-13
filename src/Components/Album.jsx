import React, { useEffect, useState } from 'react';
import '../StyleSheet/Albums.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';  // ייבוא של Link ליצירת קישורים

const Album = ({id,title}) => {
    const navigate=useNavigate();
    const handlePhotosPage=()=>{
        navigate(`/albums/${id}/photos`,{state: {title,id}});
    }

    return (
        <div key={id} className="album-card">
            <p className="album-id">Album number {id}</p>
            <p onClick={handlePhotosPage} style={{cursor:"pointer"}} className="album-title">{title}</p>
        </div>

    );

}

export default Album;
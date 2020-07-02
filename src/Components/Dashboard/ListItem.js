import React from 'react';

function ListItem(props) {
    return (
        <div className="media">
            <div className="media-left">
                <figure className="image is-48x48">
                    <img src={props.imageUrl} alt=""/>
                </figure>
            </div>
            <div className="media-content">
                <p className="subtitle">{props.title}</p>
                {
                    props.authors.map((author,index)=>(
                        <p>{author}</p>
                    ))
                }  
            </div>
        </div>
    );
}

export default ListItem;
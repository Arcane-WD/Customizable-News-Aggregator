import React from "react";
import userPhoto from "../../assests/images/blob.jpg"
export default function Header() {
    return(
        <header className="header">
            <a href="">Home</a>
            <a href="">News</a>
            <a href="">Trending</a>
            <div className="profile"style={{}}>
                <a href="">Profile<button className="userphoto"><img src={userPhoto} alt="user image" /></button></a>
            </div>
        </header>
    )
}
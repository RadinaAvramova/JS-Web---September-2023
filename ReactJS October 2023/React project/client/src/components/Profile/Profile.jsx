import { useContext, useEffect, useState } from "react"
import AuthContext from "../../contexts/authContext";
import SofaCard from "../Search/SofaCard/SofaCard";

import styles from '../Search/Search.module.css';
import stylesProfile from './Profile.module.css';
import * as sofaService from '../../services/sofaService';
export default function Profile() {

    const [myPost, setMyPost] = useState([]);
    const { userId, username, email } = useContext(AuthContext)

    useEffect(() => {
        sofaService.getMyPost(userId)
            .then(result => setMyPost(result))
            .catch(error => console.log(error))
    }, []);
    
    return (
        <>
 <h2><img className={stylesProfile.avatar}src="/Images/avatar.png" />
 <span></span>{username}'s profile<p>email: {email}</p></h2>
 
            <div className={stylesProfile.profile}>
               {myPost.length> 0 && 
               (myPost.length == 1 ?<h2>Have {myPost.length} post! </h2>: <h2>Have {myPost.length} posts!</h2> )}
                {myPost.length > 0 
                ? <div >
                    <ul className={styles["sofa-wrapper"]}>
                        {myPost.map(sofa => <sofaCard key={sofa._id} {...sofa} />)}

                    </ul>
                </div>
             : <h2>No post yet...</h2>}

            </div>
        </>



    )
}
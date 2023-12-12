import styles from './Details.module.css';
import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import Comments from './Comments/Comments';

import * as sofaService from '../../services/sofaService';
import * as commentService from '../../services/commentService';
import * as likeService from '../../services/likeService';
import AuthContext from '../../contexts/authContext';
import { OneComment } from './Comments/OneComment';
import Delete from '../Delete/Delete';


export default function Details() {
    const navigate = useNavigate();

    const { username, userId } = useContext(AuthContext);
    const { sofaId } = useParams();
    const [sofas, setSofas] = useState({});
    const [isCommentAreaDisabled, setCommentAreaDisabled] = useState(true);
    const [comments, setComments] = useState([]);
    const [showDelete, setShowDelete] = useState(false);
    const [likes, setLikes] = useState(0);
    const [likeId, setLikeId] = useState("");

    useEffect(() => {
        const fetchData = async () => {

            try {
                const sofaDetails = await sofaService.getOne(sofaId);
                setSofas(sofaDetails);

                const commentsResult = await commentService.getAllComment(sofaId);
                setComments(commentsResult);

                const initialLikes = await likeService.getAllLikes(sofaId);

                setLikes(initialLikes.length);

                let foundLike = initialLikes.find(el => el.userId === userId);

                if (foundLike) {
                    setLikeId(foundLike._id);
                }

            } catch (error) {
                console.error('Error fetching details:', error);
            }
        }
        fetchData();
    }, [sofaId]);


    const filterColors = (sofas) => {
        if (!sofas || !sofas.colors) {
            return 'No colors available';
        }

        const filteredColors = Object.keys(sofas.colors).filter(color => sofas.colors[color] === true);
        return filteredColors.join(', ');
    }

    const hideShowCommentHandler = (e) => {
        e.preventDefault();
        setCommentAreaDisabled(oldState => !oldState);
    };

    const addCommentHandler = async (data) => {

        try {
            const newComment = await commentService.createComment(
                sofaId,
                data.comment, data.username)

            setComments(state => [...state, newComment]);
            setCommentAreaDisabled(true);

        } catch (error) {
            console.log(error);
        }
    };

    const isOwner = userId === sofas._ownerId;

    const deleteClickHandler = () => setShowDelete(true);

    const onDelete = async () => {
        try {
            await sofaService.remove(sofaId);
            navigate('/catalog');

        } catch (error) {
            console.log(error);
        }
    }


    const likeClickHandler = async () => {
        try {

            if (!likeId) {
                const result = await likeService.addLike({ sofaId, userId });

                setLikes((prevLikes) => prevLikes + 1);
                setLikeId(result._id);

            } else {
                await likeService.unLike(likeId);
                setLikes((prevLikes) => prevLikes - 1);
                setLikeId('');

                console.log('You have already liked this sofa.');
            }
        } catch (error) {
            console.error('Error liking sofa:', error);
        }
    };

    return (
        <section className={styles.details}>

            <h2>{sofas.name}</h2>
            <div className={styles["image-div"]}>
                <img src={sofas.imageUrl} alt={sofas.name} />
            </div>
            <div className={styles["details-product"]}>
                <article className={styles["span-style"]}>
                    <p><span>Category: </span>{sofas.category}</p>
                    <p><span>Info: </span> {sofas.description}</p>
                    <p> <span>Material: </span>{sofas.material}  <span>  Product Number: </span> {sofas.productNumber}</p>
                    <p><span>Price: </span> {sofas.price} lv.</p>
                    <p> <span>Colors: </span> {filterColors(sofas)}</p>
                </article>

                {likes > 0 ? <p>Likes ♥ {likes}</p> : ''}

                {isOwner && (
                    <>
                        <Link to={`/details/${sofaId}/edit`} ><button type="submit" >Edit</button></Link>
                        <button type="submit" onClick={deleteClickHandler}>Delete</button>

                        {showDelete && <Delete
                            onDelete={onDelete}
                            showDelete={showDelete}
                            onClose={() => setShowDelete(false)}
                            sofaId
                            sofaName={sofas.name}
                        />}
                    </>)}

                {!isOwner && (
                    <>
                        <button type="submit" onClick={likeClickHandler}{...likes}>{likeId ? `Unlike` : `Like`}   </button>
                        <button type="submit" onClick={hideShowCommentHandler}>Comment</button>
                    </>
                )}

                <Link to={`/catalog`} ><button type="submit">Back</button></Link>

                <Comments
                    addComment={addCommentHandler}
                    comments={comments}
                    isCommentAreaDisabled={isCommentAreaDisabled}
                />
            </div>

            <div className={styles.comments}>
                <h3>Comments: </h3>
                <ul>
                    {comments.length > 0 ? comments.map(comment => <OneComment key={comment._id} {...comment} />)
                        : (<h4 > No comments yet...</h4>)}
                </ul>
            </div>
        </section >
    )
}
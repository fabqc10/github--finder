import React, { useContext,useEffect,Fragment } from 'react';
import Spinner from '../layout/Spinner';
import { Link } from 'react-router-dom';
import  Repos  from '../repos/Repos';
import GithubContext from '../context/github/githubContext';



const User = ({match})=> {
    const githubContext = useContext(GithubContext);

    const{getUser,user,loading,repos,getUserRepos} = githubContext;

    useEffect(()=>{
        getUser(match.params.login);
        getUserRepos(match.params.login);
        // eslint-disable-next-line
    },[])



        const {
            name,
            avatar_url,
            location,
            bio,
            company,
            blog,
            login,
            html_url,
            followers,
            following,
            public_repos,
            public_gists,
            hireable
        } = user;

        

        if(loading){
            return <Spinner/>
        }
        return (
            <Fragment>
                <Link className='btn btn-light' to='/'>Back to Search</Link>
                Hireable:{''}
                {hireable ? (<i className='fas fa-check text-success'/>):
                (<i className='fas fa-times-circle text-danger'/>)}
                <div className='card grid-2'>
                    <div className='all-center'>
                        <img
                            src={avatar_url}
                            className={'round-img'}
                            alt=''
                            style={{width:'150px'}}
                        />
                        <h1>{name}</h1>
                        <p>Location: {location}</p>
                        <a href={html_url} className='btn btn-dark my-1'>Visit Github</a>
                    </div>
                    <div>
                        {bio && 
                        <Fragment>
                            <h1>BIO</h1>
                            <p>{bio}</p>
                        </Fragment>}
                            <ul>
                                <li>
                                    {login && <Fragment>
                                        <strong>Username:</strong> {login}
                                    </Fragment>}
                                </li>
                                <li>
                                    {company && <Fragment>
                                        <strong>Company:</strong> {company}
                                    </Fragment>}
                                </li>
                                <li>
                                    {blog && <Fragment>
                                        <strong>Website:</strong> {blog}
                                    </Fragment>}
                                </li>
                            </ul>
                    </div>
                </div>
                
                <div className='card text-center'>
                    <div className='badge badge-primary'>Followers: {followers}</div>
                    <div className='badge badge-success'>Following: {following}</div>
                    <div className='badge badge-light'>Public Repos: {public_repos}</div>
                    <div className='badge badge-dark'>Public Gists: {public_gists}</div>
                </div>

                <Repos repos={repos}/>

                
            </Fragment>
            
        )
    
}



export default User

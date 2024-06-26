import React, { useEffect, useState } from 'react';
import axiosClient from '../../services/axios';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';

export default function Index(props) {
    const [familyTrees, setFamilyTrees] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [familyTreeName, setFamilyTreeName] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.loadingStart());
        let mounted = true;
        axiosClient.get('entry/initial_payload')
        .then(res => {
            if (mounted) {
                setIsAuthenticated(res.data.logged_in);
                getFamilyTrees();
            }
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
        dispatch(actions.loadingFinish());
        return () => {
            mounted = false;
        }
    }, []);

    const postFamilyTree = (e) => {
        e.preventDefault();
        let body = {
            family_tree: {
                "name": familyTreeName
            }
        }
        axiosClient.post(`family_trees/create`, body)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    const getFamilyTrees = () => {
        axiosClient.get('family_trees')
        .then(res => {
            if (res.data) {
                console.log(res.data)
                setFamilyTrees(res.data)
            }
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    return (
        <React.Fragment>
            <div className="reactPageAppContainer">
                <input placeholder='family name' 
                    onChange={e => setFamilyTreeName(e.target.value)}
                />
                <button onClick={postFamilyTree}>Create Tree</button>
                    {familyTrees ? (
                        <ul>
                        {familyTrees.map((tree, i) => (
                            <Link key={i} to={`/family-trees/${tree.name}`}>{tree.name}</Link>
                        ))}
                    </ul>
                    ) : <></>
                }
            </div>
        </React.Fragment>
    )
}
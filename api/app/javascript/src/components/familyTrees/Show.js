import React, { useEffect, useState, useCallback } from 'react';
import axiosClient from '../../services/axios';
import { useDispatch } from 'react-redux';
import * as actions from '../../store/actions/index';
import ReactFlow, { Background, Controls, applyEdgeChanges, applyNodeChanges, addEdge } from 'reactflow';
import 'reactflow/dist/style.css';

const initialNodes = [
    {
      id: '1',
      data: { label: 'Hello' },
      position: { x: 0, y: 0 },
      type: 'input',
    },
    {
      id: '2',
      data: { label: 'World' },
      position: { x: 100, y: 100 },
    },
    {
        id: '3',
        data: { label: 'Beep' },
        position: { x: 200, y: 200 },
    },
  ];
  
  const initialEdges = [
    { id: '1-2', source: '1', target: '2', label: 'to the', type: 'step' },
  ];

export default function Index(props) {
    const [family, setFamily] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [members, setMembers] = useState(family.family_members);
    const [newMember, setNewMember] = useState({ name: '', relationship: '', parent_id: null });
    const [nodes, setNodes] = useState(initialNodes);
    const [edges, setEdges] = useState(initialEdges);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.loadingStart());
        let mounted = true;
        axiosClient.get('entry/initial_payload')
        .then(res => {
            if (mounted) {
                setIsAuthenticated(res.data.logged_in);
                getFamily();
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

    const postFamilyMember = (e) => {
        e.preventDefault();
        let body = {
            family_member: {
                "name": newMember.name,
                "relationship": newMember.relationship,
                "family_tree_id": props.match.params.id,
                "parent_id": null
            }
        }
        axiosClient.post(`family_members/create`, body)
        .then(res => {
            setFamily(res.data)
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    const getFamily = () => {
        axiosClient.get(`family_trees/${props.match.params.id}`)
        .then(res => {
            setMembers(res.data.family_members)
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    const onNodesChange = useCallback(
        (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
        [],
    );

    const onEdgesChange = useCallback(
        (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
       [],
    );

    const onConnect = useCallback(
        (params) => setEdges((eds) => addEdge(params, eds)),
        [],
    );

    return (
        <div className="reactPageAppContainer">
            <div style={{ width: 1000, height: 800 }}>
                <ReactFlow
                    nodes={nodes}
                    onNodesChange={onNodesChange}
                    edges={edges}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    fitView
                >
                    <Background />
                    <Controls />
                </ReactFlow>
            </div>
        </div>
    );
}
          {/* <input 
            value={newMember.name} 
            onChange={e => setNewMember({ ...newMember, name: e.target.value })} 
            placeholder="Member Name" 
          />
          <select 
            value={newMember.relationship} 
            onChange={e => setNewMember({ ...newMember, relationship: e.target.value })}
          >
            <option value="">Select Relationship</option>
            <option value="father">Father</option>
            <option value="mother">Mother</option>
            <option value="brother">Brother</option>
            <option value="sister">Sister</option>
            <option value="son">Son</option>
            <option value="daughter">Daughter</option>
          </select>
          <button onClick={postFamilyMember}>Add Member</button>
          <ul>
                {members ? (
                    <ul>
                        {members.map((member, i) => (
                            <li key={member.id}>{member.name} ({member.relationship})</li>
                        ))}
                    </ul>
                    ) : <></>
                }
          </ul> */}
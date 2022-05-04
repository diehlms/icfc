import React, { useEffect, useState } from 'react'
import { Form, Button } from 'semantic-ui-react';
import { useDispatch } from 'react-redux'
import * as actions from '../../store/actions/index';
import axiosClient from '../../services/axios';

export default function FormUpload(props) {
    const [file, setFile] = useState(null);
    const [documentName, setDocumentName] = useState('');
    const dispatch = useDispatch();

    const fileUpload = (e) => {
        setFile(e.target.files[0]);
    }   

    const postDocument = (e) => {
        e.preventDefault();
        let body = new FormData();
        body.append('document', file);
        body.append('document_title', documentName);
        body.append('document_folder', props.folderName);
        axiosClient.post(`documents/create`, body)
        .then(res => {
        })
        .catch(err => {
            dispatch(actions.setErrors(err.response.data.errors));
        });
    }

    useEffect(() => {
    }, []);

    return (
        <React.Fragment>
              <Form>
                    <Form.Field>
                        <label>Document Title</label>
                        <input placeholder='title' 
                            onChange={e => setDocumentName(e.target.value)}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Document Folder</label>
                        <input 
                            placeholder={props.folderName} 
                            disabled
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>File</label>
                        <input 
                            onChange={e => fileUpload(e)}
                            type="file"
                        />
                    </Form.Field>
                <Button type='submit' onClick={e => postDocument(e)}>Submit</Button>
            </Form>
        </React.Fragment>

    );
}
import Axios from 'axios';
import { Component } from 'react';

export interface IDataService {
    getData(categoryId: string),
    deleteData(),
    postData(categoryId: string, payload, id?: string),
    updateData(categoryId: string, payload, id: string)
}

export interface Payload {
    data?: any[];
    errorMessage?: string;
}

export default class DataService extends Component {
    async getData(categoryId: string, useOldApi: boolean) {
        let payload: Payload = {};
        let url = !!useOldApi ? `/${categoryId}.json` : `/api/v1/${categoryId}`
        return Axios.get(url)
            .then(
                res => {
                    payload.data = res.data;
                    return payload;
                }
            ).catch(
                res => {
                    payload.errorMessage = 'Could not fetch data'
                    return payload;
                }
            );
    }

    deleteData() {

    }

    postData(categoryId: string, payload, id?: string) {

    }

    updateData(categoryId: string, payload, id: string) {

    }
}
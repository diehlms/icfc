import axios from 'axios';

const tokenEl: HTMLElement | null = document.querySelector('meta[name="csrf-token"]');

let token;

if (tokenEl instanceof HTMLMetaElement) {
    token = tokenEl.content;
}

const defaultAxiosClient = axios.create({
    baseURL: '/api/v1/',
    headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json"
    }
});

export default defaultAxiosClient;
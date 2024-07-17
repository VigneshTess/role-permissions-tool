import Toast from '../Services/ToastService';

/* import AuthService from '../Services/AuthService'; */
let API_ENDPOINT = import.meta.env.VITE_API_URL;  // Import the API endpoint from the environment variables   

import { loader } from "../Stores/loader.store" // Import the loader store


export class RESTClient {

    constructor(slug = null) {
        this.slug = API_ENDPOINT + slug;
    }

    async get(url, showLoader = true) {

        if (showLoader) loader.set(true); // Show the loader

        let result = await fetch(this.slug + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                
            }
        });
        return this.processResponse(result);
    }

    async post(url, data, showLoader = true) {
        if (showLoader) loader.set(true); // Show the loader
        let result = await fetch(this.slug + url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return this.processResponse(result);
    }

    async put(url, data, showLoader = true) {
        if (showLoader) loader.set(true); // Show the loader
        let result = await fetch(this.slug + url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return this.processResponse(result);
    }
    async patch(url, data, showLoader = true) {

        // patch the values 


        if (showLoader) loader.set(true); // Show the loader
        let result = await fetch(this.slug + url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        return this.processResponse(result);
    }


    async delete(url, showLoader = true) {
        if (showLoader) loader.set(true); // Show the loader
        let result = await fetch(this.slug + url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return this.processResponse(result);
    }

    /* auth() {
        const tokens = AuthService.getTokens();
        return tokens && tokens.access ? {
            'Authorization': 'Bearer ' + tokens.access.token
        } : {};
    } */

    async processResponse(result) {
        // Hide the loader regardless of the outcome
        loader.set(false);

        try {
            // First, check if the response is okay (status code 200-299)
            if (!result.ok) {
                const data = await result.json();
                if (data.message) {
                    Toast.error(data.message);
                    return data;
                } else {
                    throw new Error(`HTTP error! status: ${result.status}`);
                }

            }

            // Check if the content type is JSON
            const contentType = result.headers.get('content-type');
            if (contentType && contentType.indexOf('application/json') === 0) {
                const data = await result.json();
                // Handle JSON errors specifically
                if (data.error) {
                    // Assuming 'data.error' is a boolean and 'data.message' contains error details
                    data.message.forEach(msg => {
                        msg.messages.forEach(m => {
                            Toast.error(m.message);
                        });
                    });
                    // Optionally, throw an error to stop the execution if necessary
                    //throw new Error('Errors occurred during the processing of your request.');
                }
                return data;
            } else {
                // Handling non-JSON responses
                const textData = await result.text();
                return textData;
            }
        } catch (error) {
            // General error handling, such as network issues or parsing errors
            console.error('Error processing response:', error.message);
            Toast.error(`An unexpected error occurred: ${error.message}`);
            // Optionally, rethrow the error if you want calling functions to handle it as well
            throw error;
        }
    }


    // Example CRUD and utility methods that use the RESTClient methods
    async find(query, fields, limit, skip) {
        // your implementation...
    }

    async create(data) {
        return this.post(this.slug, data);
    }

    async update(id, data) {
        return this.put(`${this.slug}/${id}`, data);
    }

    async findOne(query, fields) {
        // your implementation...
    }

    async count(query) {
        // your implementation...
    }

    async findById(id) {
        return this.get(`${this.slug}/${id}`);
    }

    async search(q) {
        return this.get(`${this.slug}?_q=${q}`);
    }

    async updateById(id, data) {
        return this.put(`${this.slug}/${id}`, data);
    }
}
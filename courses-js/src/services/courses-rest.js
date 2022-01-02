export default class CoursesRest {

    #url;
    constructor(url) {
        if (!url) {
            throw "URL is not provided";
        }
        this.#url = url;
    }

    async add(course) {
        try {
            const response = await fetch(this.#url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(course)
            });
            return await response.json();
        } catch {
            this.#showErrMessage();
        }
    }
    
    async remove(id) {
        try {
            const response = await fetch(this.#getUrlId(id), {
                method: "DELETE"
            });
            return await response.json();
        } catch {
            this.#showErrMessage();
        }
    }

    async get(id) {
        try {
            const url = id != undefined ? this.#getUrlId(id) : this.#url;
            const response = await fetch(url);
            return await response.json();
        } catch {
            this.#showErrMessage();
        }
    }

    #getUrlId(id) {
        return `${this.#url}/${encodeURIComponent(id)}`;
    }

    async update(id, newCourse) {
        try {
            const response = await fetch(this.#getUrlId(id), {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newCourse)
            });
            return await response.json();
        } catch {
            this.#showErrMessage();
        }
    }

    async exists(id) {
        try{
            const response = await fetch(this.#getUrlId(id));
            return response.ok;
        } catch {
            this.#showErrMessage();
        }
    }
    #showErrMessage() {
        throw "Server is unavailable"
    }
}
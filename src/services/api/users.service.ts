import api from "@/helpers/api"

export class UsersService {
    public static create(username: string, email: string, password: string) {
        return api.post('/users', {
            username: username,
            email: email,
            password: password
        })
    }

    public static findMe() {
        return api.get('/users/me').then(response => response.data)
    }
}
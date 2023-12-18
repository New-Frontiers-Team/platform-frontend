import api from "@/helpers/api"

type LoginResponse = {
    accessToken: string
}

export class AuthService {
    public static login(email: string, password: string): Promise<LoginResponse> {
        return api.post('http://localhost:3001/auth/login', {
            email: email,
            password: password
        }).then(response => response.data)
    }

    public static register(username: string, email: string, password: string) {
        return api.post('http://localhost:3001/auth/register', {
            username: username,
            email: email,
            password: password
        })
    }
}
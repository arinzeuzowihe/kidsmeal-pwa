import BaseService  from "./base.service"

class AuthService extends BaseService {
    
    static instance: AuthService;

    private constructor() {
        super();
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService();
        }

        return AuthService.instance;
    }

    /**
     * Performs a login request
     * @param request 
     * @returns 
     */
    async loginAsync(request: LoginRequest): Promise<LoginResponse> {
        
        if (!request?.username || !request?.password) {
            console.error("Unable to attempt login");
        }

        var userID = 0;
        var wasSuccessful = false;

        try {
            
            const data = { username: request.username, password: request.password };    
            const response = await this.postAsync('/login', data, false);
            if (response.userID && response.accessToken && response.refreshToken) {
                userID = response.userID;
                wasSuccessful = true;
    
                //string access token & refresh token in local storage
                localStorage.setItem('user_info', JSON.stringify({userID , username: request.username}));
                localStorage.setItem('access_token', response.accessToken);
                localStorage.setItem('refresh_token', response.refreshToken);
                localStorage.setItem('kids', JSON.stringify(response.kids));
            }            
        } catch (error) {
            console.error(`Error: ${error}`);
        }
        
        return { userID, wasSuccessful, kids: [] };
    }

    /**
     * Performs a logout request
     */
    async logoutAsync() {
        
        try {
            const response = await this.getAsync(`/logout/${this.currentUserID}`)
            
            if (response)
            {
                //remove access token and refresh token from local storage
                localStorage.removeItem('user_info');
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token'); 
                localStorage.removeItem('kids');
            }    

        } catch (error) {
            console.error(`Error: ${error}`);
        }
    }
}

export default AuthService;

type Kid = {
    kidID: number,
    name: string
}

type LoginRequest = {
    username: string,
    password: string
}

type LoginResponse = {
    userID: number,
    wasSuccessful: boolean,
    kids: Kid[]
}
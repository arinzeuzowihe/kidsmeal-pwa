import { LoginRequest } from "../interfaces/api/requests";
import { BaseUser, LoginResponse } from "../interfaces/api/responses";
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
    public async loginAsync(request: LoginRequest): Promise<LoginResponse> {
        
        if (!request?.username || !request?.password) {
            console.error("Unable to attempt login");
        }

        var userID = 0;
        var username = '';
        var wasSuccessful = false;
        var errorMessage = ''; 

        try {
            
            const data = { username: request.username, password: request.password };    
            const response = await this.postAsync('/login', data, false);

            //reponse can be a http response or json (i.e. for successful requests)
            if (response?.status) {
                if (response.status === 400) {
                    errorMessage = "Invalid email/password combination. Please try again.";
                    return { userID, username, wasSuccessful, kids: [], errorMessage};
                }
                
                throw new Error(response);
            }

            if (response.userID && response.accessToken && response.refreshToken) {
                userID = response.userID;
                username = response.userName;
                wasSuccessful = true;
    
                //string access token & refresh token in local storage
                localStorage.setItem('user_info', JSON.stringify({userID , username }));
                localStorage.setItem('access_token', response.accessToken);
                localStorage.setItem('refresh_token', response.refreshToken);
                localStorage.setItem('kids', JSON.stringify(response.kids));
            }
        } catch (errorResponse:any) {
            errorMessage = "Uh oh....We are experiencing some issues. Please try again later.";
            console.error(errorResponse);
        }
        
        return { userID, username, wasSuccessful, kids: [], errorMessage};
    }


    /**
     * Performs a logout request
     */
    public async logoutAsync() {
        
        try {
                
            await this.getAsync(`/logout/${this.currentUserID}`)
    
        } catch (error) {
            console.error(`Error: ${error}`);
        }
        finally {
            //remove access token and refresh token from local storage
            localStorage.removeItem('user_info');
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('kids');
        }
    }

    public getCurrentLoggedInUser(): BaseUser | undefined {
        return this.loggedInUserInfo;
    }
}

export default AuthService;
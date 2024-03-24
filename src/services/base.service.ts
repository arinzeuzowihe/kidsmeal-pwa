import { BaseKid, BaseUser } from "../interfaces/api/responses";
import { ToastContainer, toast } from "react-toastify";

const apiBaseUrl = "https://localhost:7136"

class BaseService {

    protected get accessToken() {
        return localStorage.getItem('access_token') ?? '';
    }

    protected set accessToken(value: string) {
        if (value) {
            localStorage.setItem('access_token', value);
        }
    }

    protected get refreshToken() {
        return localStorage.getItem('refresh_token') ?? '';
    }

    protected set refreshToken(value: string) {
        if (value) {
            localStorage.setItem('refresh_token', value);
        }
    }

    protected get currentUserID(): number {
        const userinfo = localStorage.getItem('user_info');
        if (!userinfo)
            return 0;  // throw new Error('Unable to retrieve user info.');

        const parsedUserInfo = JSON.parse(userinfo);
        return parsedUserInfo?.userID ?? 0;
    }

    protected get currentKids(): BaseKid[] {
        const kids = localStorage.getItem('kids');
        if (!kids)
            return []; //throw new Error('Unable to retrieve any kid details.');
        
        const parsedKids: BaseKid[] = JSON.parse(kids);
        return parsedKids;
    }

    protected get loggedInUserInfo(): BaseUser | undefined {
        const userinfo = localStorage.getItem('user_info');
        if (!userinfo)
            return undefined;

        const parsedUserInfo = JSON.parse(userinfo);
        return (!parsedUserInfo) ? undefined : { id: parsedUserInfo.userID, username: parsedUserInfo.username };
    }

    protected async getAsync(urlFragment: string, requiresAuthorization: boolean = true) {
        return await this.fetchAsync(urlFragment, "GET", requiresAuthorization);
    }

    protected async postAsync(urlFragment: string, data: any, requiresAuthorization: boolean = true) {
        return await this.fetchAsync(urlFragment, "POST", requiresAuthorization, data);
    }

    protected async deleteAsync(urlFragment: string, data?: any, requiresAuthorization: boolean = true) {
        return await this.fetchAsync(urlFragment, "DELETE", requiresAuthorization, data);
    }

    protected async putAsync(urlFragment: string, data: any, requiresAuthorization: boolean = true) {
        return await this.fetchAsync(urlFragment, "PUT", requiresAuthorization, data);
    }

    private getAuthorizationHeader(): string {
        if (!this.accessToken) {
            throw new Error("No access token present");
        }

        return `Bearer ${this.accessToken}`
    }
    
    private async fetchAsync(urlFragment: string, method: string, requiresAuthorization: boolean, data?: any, isRetry: boolean = false): Promise<any> {
        
        try {

            let headers = new Headers();
            headers.append('Content-Type', 'application/json');
            if (requiresAuthorization) {
                headers.append('Authorization', this.getAuthorizationHeader());
            }
            
            var response = await fetch(`${apiBaseUrl}${urlFragment}`, {
                method,
                mode: 'cors',
                headers,
                body: JSON.stringify(data)
            });

            //retry based on assumed expired access token
            if (response.status === 401) {

                if (isRetry) {
                    //Our api call retry attempt get an unauthorized response
                    throw new Error("Unauthorized access detected");
                }

                //get updated access token using  refresh token
                headers = new Headers();
                headers.append('Content-Type', 'application/json');
                const tokens = { accessToken: this.accessToken, refreshToken: this.refreshToken };
                const tokenRefreshResponse = await fetch(`${apiBaseUrl}/token/refresh`, {
                    method: "POST",
                    mode: 'cors',
                    headers,
                    body: JSON.stringify(tokens)
                });

                if (tokenRefreshResponse.status === 200) {

                    var jsonTokenRefreshResponse = await tokenRefreshResponse.json();
    
                    this.accessToken = jsonTokenRefreshResponse?.accessToken;
                    this.refreshToken = jsonTokenRefreshResponse?.refreshToken;
    
                    //retry the calling method
                    return await this.fetchAsync(urlFragment, method, requiresAuthorization, data, true);

                } else {
                    //throw new Error("Unable to refresh token.");
                    //remove access token and refresh token from local storage
                    localStorage.removeItem('user_info');
                    localStorage.removeItem('access_token');
                    localStorage.removeItem('refresh_token');
                    localStorage.removeItem('kids');
                    
                    toast.warn('Session has timed out. Please log in again.');

                    window.location.href = "/";
                }

            }

            if (response.status === 204) {
                return undefined;
            }

            if (response.status === 200) {
                return response.json();
            }
            
            return response;

        } catch (error) {
            console.error(error);
        }
    }
}

export default BaseService;

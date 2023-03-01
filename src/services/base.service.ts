import { BaseKid } from "../interfaces/api/responses";

const apiBaseUrl = "https://localhost:7136"

class BaseService{

    private get accessToken() {
        return localStorage.getItem('access_token') ?? '';
    }

    private set accessToken(value: string) {
        if (value) {
            localStorage.setItem('access_token', value);   
        }        
    }

    private get refreshToken() {
        return localStorage.getItem('refresh_token') ?? '';
    }

    private set refreshToken(value: string) {
        if (value) {
            localStorage.setItem('refresh_token', value);   
        }
    }

    protected get currentUserID(): number {
        const userinfo = localStorage.getItem('user_info');
        if (!userinfo)
            throw new Error('Unable to retrieve user info.');

        const parsedUserInfo = JSON.parse(userinfo);
        return parsedUserInfo?.userID;
    }

    protected get currentKidIDs(): number[] {
        const kids = localStorage.getItem('kids');
        if (!kids)
            throw new Error('Unable to retrieve any kid details.');

        const parsedKids = JSON.parse(kids);
        return parsedKids.map((kid:BaseKid) => { return kid.id})
    }

    async getAsync(urlFragment: string, requiresAuthorization: boolean = true) {
        return await this.fetchAsync(urlFragment, "GET", requiresAuthorization);
    }

    async postAsync(urlFragment: string, data: any, requiresAuthorization: boolean = true) {
        return await this.fetchAsync(urlFragment, "POST", requiresAuthorization, data);
    }

    async deleteAsync(urlFragment: string, requiresAuthorization: boolean = true) {
        return await this.fetchAsync(urlFragment, "DELETE", requiresAuthorization);
    }

    async putAsync(urlFragment: string, data: any, requiresAuthorization: boolean = true) {
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

            const response = await fetch(`${apiBaseUrl}${urlFragment}`, {
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
                const data = { accessToken: JSON.stringify(this.accessToken) , refreshToken: JSON.stringify(this.refreshToken) };
                const tokenRefreshResponse = await this.postAsync('/token/refresh', data, false);
                this.accessToken = tokenRefreshResponse.accessToken;
                this.refreshToken = tokenRefreshResponse.refreshToken;

                //retry the calling method
                return await this.fetchAsync(urlFragment, method, requiresAuthorization, data, true);
            }
    
            return response.json(); 
            
        } catch (error) {
            console.error(error);
        }
    }
}

export default BaseService;

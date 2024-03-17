import { BaseKid } from "../interfaces/api/responses";
import BaseService from "./base.service";

class UserService extends BaseService{
    static instance: UserService;

    private constructor() {
        super();
    }

    public static getInstance(): UserService {
        if (!UserService.instance) {
            UserService.instance = new UserService();
        }

        return UserService.instance;
    }

    public getUserID(): number {
        return this.currentUserID;
    }

    public getKids(): BaseKid[] {
        return this.currentKids;
    }

    public getKid(kidId: number): BaseKid | undefined {
        return this.currentKids.find(k => k.id === kidId);
    }
}

export default UserService;
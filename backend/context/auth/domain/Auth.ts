import { AuthEmail } from "./AuthEmail";
import { AuthId } from "./AuthId";
import { AuthRole } from "./AuthRole";

export class Auth{

    constructor(
        private readonly id: AuthId,
        private readonly email: AuthEmail,
        private readonly role: AuthRole
    ){}

    static createAdmin(email:AuthEmail): Auth {
        const id = AuthId.create();
        
        const role = new AuthRole("admin");
        return new Auth(id, email, role);
    }

    static createProfessor(email:AuthEmail): Auth {
        const id = AuthId.create();
        const role = new AuthRole("professor");
        return new Auth(id, email, role);
    }


    getId(): AuthId {
        return this.id;
    }

    getEmail(): AuthEmail {
        return this.email;
    }

    getRole(): AuthRole {
        return this.role;
    }

    isAdmin(): boolean {
        return this.role.is("admin");
    }

    isProfessor(): boolean {
        return this.role.is("professor");
    }
   
}
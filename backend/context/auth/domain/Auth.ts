import { AuthEmail } from "./AuthEmail";
import { AuthId } from "./AuthId";
import { AuthRole } from "./AuthRole";

export class Auth{

    constructor(
        private readonly id: AuthId,
        private readonly email: AuthEmail,
        private readonly role: AuthRole
    ){}

    static createAdmin(email:string): Auth {
        const id = AuthId.create();
        const role = new AuthRole("admin");
        const emailObj = new AuthEmail(email);
        return new Auth(id, emailObj, role);
    }

    static createProfessor(email:string): Auth {
        const id = AuthId.create();
        const role = new AuthRole("professor");
        const emailObj = new AuthEmail(email);
        return new Auth(id, emailObj, role);
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

    toPrimitives() {
        return {
            id: this.id.getValue(),
            email: this.email.getValue(),
            role: this.role.getValue()
        }
    }
   
}
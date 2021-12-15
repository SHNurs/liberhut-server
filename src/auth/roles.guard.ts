import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {ROLES_KEY} from "./roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private jwtService: JwtService,
                private reflector: Reflector) {}
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest()
        try {
            const requiredRoles = this.reflector.getAllAndOverride(ROLES_KEY, [
                context.getHandler(),
                context.getClass()
            ])

            if(!requiredRoles){
                return true
            }

            const header = req.headers.authorization
            const bearer = header.split(' ')[0]
            const token = header.split(' ')[1]

            if(bearer !== 'Bearer' || !token){
                throw new UnauthorizedException({message: 'Unauthorized user'})
            }

            const user = this.jwtService.verify(token)
            req.user = user
            return user.roles.some(role => requiredRoles.includes(role.name))
        }catch {
            throw new HttpException('Permission denied', HttpStatus.FORBIDDEN)
        }
    }
}
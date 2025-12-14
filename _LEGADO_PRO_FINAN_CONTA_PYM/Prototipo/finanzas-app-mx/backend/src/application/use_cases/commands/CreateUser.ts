import { Result } from "../../../shared/core/Result";
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateUserDTO } from "../../dto/CreateUserDTO";

export class CreateUserUseCase {
  constructor(private userRepo: UserRepository) {}

  async execute(dto: CreateUserDTO): Promise<Result<void>> {
    // 1. Construir entidad (aquí ocurren las validaciones de dominio)
    const userOrError = User.create(crypto.randomUUID(), dto.email, dto.role);

    if (userOrError.isFailure) {
      return Result.fail<void>(userOrError.error);
    }

    const user = userOrError.getValue();

    // 2. Verificar existencia (regla de negocio)
    const exists = await this.userRepo.findById(user.id); // O findByEmail
    if (exists) {
      return Result.fail<void>("El usuario ya existe");
    }

    // 3. Persistir
    await this.userRepo.save(user);

    return Result.ok<void>();
  }
}

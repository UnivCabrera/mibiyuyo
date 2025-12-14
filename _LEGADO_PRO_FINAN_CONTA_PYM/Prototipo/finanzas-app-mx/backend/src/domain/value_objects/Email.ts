import { ValueObject } from "../../shared/core/ValueObject";
import { Result } from "../../shared/core/Result";

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  private constructor(props: EmailProps) {
    super(props);
  }

  public static create(email: string): Result<Email> {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return Result.fail<Email>("Email inválido");
    }
    return Result.ok<Email>(new Email({ value: email }));
  }

  get value(): string {
    return this.props.value;
  }
}

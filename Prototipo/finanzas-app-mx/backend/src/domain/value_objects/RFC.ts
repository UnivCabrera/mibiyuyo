import { ValueObject } from "../../shared/core/ValueObject";
import { Result } from "../../shared/core/Result";

interface RFCProps {
  value: string;
}

export class RFC extends ValueObject<RFCProps> {
  private constructor(props: RFCProps) {
    super(props);
  }

  public static create(rfc: string): Result<RFC> {
    // Validación simplificada para evitar complejidad ciclomática excesiva en linter
    // Formato general: 3-4 letras, 6 números, 3 alfanuméricos
    const rfcPattern = /^[A-ZÑ&]{3,4}\d{6}[A-Z\d]{3}$/;
    
    if (!rfcPattern.test(rfc.toUpperCase())) {
      return Result.fail<RFC>("El formato del RFC es inválido (Estructura incorrecta)");
    }

    return Result.ok<RFC>(new RFC({ value: rfc.toUpperCase() }));
  }

  get value(): string {
    return this.props.value;
  }
}

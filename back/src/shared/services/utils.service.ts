import { Injectable } from '@nestjs/common';

/**
 * servicio compartido de utils
 */
@Injectable()
export class UtilsService {
  /**
   * todo: validacion de email
   * @param email
   * @returns
   */
  validatedEmail(email: string): boolean {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email,
    );
  }

  /**
   * todo: validacion de parametros del objeto
   * @param params
   * @param validatedParams
   * @returns
   */
  validationExistParams(params: any, validatedParams: string[]): boolean {
    let hasAllProperties = true;
    for (const element of validatedParams) {
      if (!params.hasOwnProperty(element)) {
        hasAllProperties = false;
      }
    }
    return hasAllProperties;
  }
}

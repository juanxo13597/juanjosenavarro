import { Injectable } from '@nestjs/common';

@Injectable()
export class UtilsService {
  validatedEmail(email: string): boolean {
    return /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(
      email,
    );
  }

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

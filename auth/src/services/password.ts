import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);

export class Password {
  static async toHash(password: string) {
    const salt = randomBytes(8).toString("hex");
    const buffer = (await scryptAsync(password, salt, 64)) as Buffer;
    const hashedPassword = buffer.toString("hex");

    return hashedPassword + "." + salt;
  }

  static compare(storedPassword: string, suppliedPassword: string) {
    return storedPassword === suppliedPassword;
  }
}

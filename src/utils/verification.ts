import { v4 as uuidv4 } from "uuid"

export const generate4DigitVerificationCode = () => {
  return String(Math.floor(1000 + Math.random() * 9000))
}

export const generatePasswordResetCode = () => {
  return uuidv4()
}

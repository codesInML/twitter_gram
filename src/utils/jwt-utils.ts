import jwt from 'jsonwebtoken'

const {privateKey} = JSON.parse(process.env.JWT_PRIVATE_KEY as string)
const {publicKey} = JSON.parse(process.env.JWT_PUBLIC_KEY as string)

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
    return jwt.sign(object, {key: privateKey, passphrase: process.env.PASSPHRASE as string}, {
        ...(options && options),
        algorithm: 'RS256',
    })
}

export function verifyJWT(token: string) {
    try {
        const decoded = jwt.verify(token, publicKey)

        return {
            valid: true,
            expired: false,
            decoded
        }
    } catch (err: any) {
        return {
            valid: false,
            expired: err.message == "jwt expired",
            decoded: null
        }
    }
}
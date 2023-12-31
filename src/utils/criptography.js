import { hashSync, compareSync, genSaltSync } from "bcrypt"

export function hashPass(phrase){
    return hashSync(phrase, genSaltSync(10))
}

export function sameHashedPass(plainPass,hashedPass){
    return compareSync(plainPass,hashedPass)
}

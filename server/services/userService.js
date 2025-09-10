import { getUsers, updateUser, deleteUser, registerUser, loginUser } from "../db/dbUtils.js"

export async function getUserService() {
    return await getUsers()
}
// export async function createUserService({ name, role, email, phone, password }) {
//     if (!name || !phone || !email || !role) throw new Error("Data missing");

//     return await createUser({ name, role, email, phone, password })
// }
export async function updateUserService(id, { name, role, email, phone }) {

    return await updateUser(id, { name, role, email, phone })
}
export async function deleteUserService({ id }) {
    return await deleteUser({ id })
}
export async function registerUserService({ name, role, email, phone, password }) {
    if (!name || !phone || !email || !role || !password) throw new Error("Data missing");
    return await registerUser({ name, role, email, phone, password });
}

export async function loginUserService({ email, password }) {

    if (!email || !password) throw new Error("Please enter email and password");

    return await loginUser({ email, password });
}
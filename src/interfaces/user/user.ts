export default interface IUser {
    id: number
    username: string
    activision_id: string
    phone: string
    role: 'user' | 'admin'
};
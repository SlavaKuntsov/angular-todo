export interface IAuthUserCreate {
	email: string,
	password: string
}
export interface IAuthUserLogin {
	email: string,
	password: string,
	token: string
}

export interface IUser {
	id: number,
	email: string,
	token: JSON
}
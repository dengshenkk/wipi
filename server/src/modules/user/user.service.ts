import * as crypto from 'crypto'
import * as moment from 'moment'
import { getRepository, Repository } from 'typeorm'
import * as jwt from 'jsonwebtoken'
import config from '../../config'
import { UserEntity } from './user.entity'
import { IUser, Roles } from './user.interface'

const getRepo = (): Repository<UserEntity> => {
  return getRepository(UserEntity)
}

const now = () => {
  return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
}

export const createToken = async (user: IUser) => {
  await updateUser(
    {
      ...user,
      lastLoginAt: now(),
    },
    true,
  )
  const token = jwt.sign(
    {
      id: user.id,
      username: user.name,
      role: user.role,
      lastLoginAt: user.lastLoginAt,
    },
    config.token.secret,
    { expiresIn: config.token.expires },
  )
  return token
}

export const isAdmin = async (user: IUser): Promise<Boolean> => {
  return user.role === Roles.admin
}

const encrypt = (password: string): string => {
  const md5 = crypto.createHash('md5')
  const saltPassword = password + ':' + 'plarum_2019'
  const encryptedPasswd = md5.update(saltPassword).digest('hex')
  return encryptedPasswd
}

export const createUser = async (user: object & IUser) => {
  const repo = getRepo()
  const password = encrypt(user.password)
  const data = repo.create({
    ...user,
    password,
    createAt: now(),
    updateAt: now(),
    lastLoginAt: now(),
  })
  await repo.save(data)
  return data
}

export const getUsers = async () => {
  const repo = getRepo()
  const users = await repo.find()
  return users
}

export const getUser = async (user: IUser) => {
  const repo = getRepo()
  const ret = await repo.findOne({
    name: user.name,
    password: encrypt(user.password),
  })
  return ret
}

export const getUserById = async (id: string) => {
  const repo = getRepo()
  const user = await repo.findOne(id)
  return user
}

export const updateUser = async (
  user: IUser,
  isCreateToken: boolean = false,
) => {
  const repo = getRepo()
  const oldUser = await getUserById(user.id)

  if (user.password && !isCreateToken) {
    user.password = encrypt(user.password)
  }

  const newUser = await repo.merge(oldUser, user, {
    updateAt: now(),
  })
  await repo.save(newUser)
}

export const deleteUserById = async (id: string) => {
  const repo = getRepo()
  const user = await getUserById(id)
  await repo.remove(user)
}

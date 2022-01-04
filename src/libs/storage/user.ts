import { User } from '../../atoms/user'
import storage from './index'

const KEY = 'user'

function UserStorage () {
  const get = () => storage.getItem<User>(KEY)
  const set = (value: User | null) => storage.setItem<User | null>(KEY, value)

  return {
    get, set
  }
}

export const userStorage = UserStorage()

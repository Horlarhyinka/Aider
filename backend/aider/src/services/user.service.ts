import {UserModel as User} from '../models/user.model'

class UserService{
    getUsers(){
        return User.find().select('-password')
    }

    queryUsers(q: object){
        return User.find(q).select('-password')
    }

    getById(id: string){
        return User.findById(id).select('-password')
    }

    getOne(q: object){
        return User.findOne(q).select('-password')
    }

    getActiveUsers(){
        return User.find({isActive: true}).select('-password')
    }

    updateUser(id: string, obj: object){
        return User.findByIdAndUpdate(id, {...obj}, {new: true})
    }
}

export default Object.freeze(new UserService())
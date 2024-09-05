import { api } from "@/api";
import { User } from "@/entities/user";
import { AuthResponse } from "@/infrastructure/auth.responses";
import AsyncStorage from "@react-native-async-storage/async-storage";


const returnUserToken = (data: AuthResponse) => {
    
    const user: User = {
    id: data.user.id,
    name: data.user.name,     
    email: data.user.email
    }
    return {
        user: user,
        token: data.token,
    }

}

export const authLogin = async (email: string, password: string) => {
    try {
        const { data } = await api.post<AuthResponse>('login', {
            email,
            password
        })
        
        await AsyncStorage.setItem('token', data.token);
        
        return returnUserToken(data);

    } catch (error) {
        console.log(error);
        return null;
    }
}
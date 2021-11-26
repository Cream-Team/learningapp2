import AsyncStorage from '@react-native-async-storage/async-storage';

const saveToken = async (token) => {
    try {
        await AsyncStorage.setItem('@token', token);
        return 'THANH_CONG';
    } catch (e) {
        return e;
    }
};

export default saveToken;
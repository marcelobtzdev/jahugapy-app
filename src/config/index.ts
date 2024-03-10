import { Platform } from "react-native";

export default {
    baseUrl: Platform.OS === 'web' ? 'http://api.jahugaparaguay.com/api' : process.env.EXPO_PUBLIC_BASE_URL,
}
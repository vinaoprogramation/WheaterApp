import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'auth_token';

export const authStorage = {
  async saveToken(token) {
    if (!token) return;
    await SecureStore.setItemAsync(TOKEN_KEY, token);
  },

  async getToken() {
    try {
      return await SecureStore.getItemAsync(TOKEN_KEY);
    } catch (error) {
      console.warn('Erro ao recuperar token:', error);
      return null;
    }
  },

  async removeToken() {
    await SecureStore.deleteItemAsync(TOKEN_KEY);
  }
};

import { create } from 'zustand';

import api from '../Api';
import { authStorage } from '../ArmazenamentoToken/AuthStorage';

const useAuthStore = create((set, get) => ({
  token: null,
  estaAutenticado: false,
  erro: null,

  fazRegistro: async (nome_usuario, email_usuario, senha_usuario) => {
    if (!nome_usuario || !email_usuario || !senha_usuario) {
      set({ erro: 'Nome, email e senha são necessários.' });
      return false;
    }

    try {
      await api.post('/usuarios', {
        nome_usuario,
        email_usuario,
        senha_usuario
      });

      const loginOk = await get().fazLogin(email_usuario, senha_usuario);
      if (!loginOk) {
        set({ erro: 'Cadastro realizado, mas o login não foi concluído.' });
        return false;
      }

      set({ erro: null });
      return true;
    } catch (err) {
      const mensagem = err?.response?.data?.Mensagem || 'Erro ao registrar usuário.';
      set({ erro: mensagem, token: null, estaAutenticado: false });
      console.warn('Erro ao registrar:', err);
      return false;
    }
  },

  fazLogin: async (email_usuario, senha_usuario) => {
    if (!email_usuario || !senha_usuario) {
      set({ erro: 'Email e senha são necessários.' });
      return;
    }

    try {
      const response = await api.post('/auth/usuarios', {
        email_usuario,
        senha_usuario
      });

      const tokenRecebido = response?.data?.token;
      if (tokenRecebido) {
        await authStorage.saveToken(tokenRecebido);
        set({ token: tokenRecebido, estaAutenticado: true, erro: null });
        return true;
      }

      set({ erro: 'Não foi possível concluir o login.' });
      return false;
    } catch (err) {
      const mensagem = err?.response?.data?.Mensagem || 'Erro ao fazer login.';
      set({ erro: mensagem, estaAutenticado: false, token: null });
      console.warn('Erro ao fazer Login:', err);
      return false;
    }
  },

  carregarTokenSalvo: async () => {
    const token = await authStorage.getToken();
    if (token) {
      set({ token, estaAutenticado: true, erro: null });
    }
  },

  fazLogout: async () => {
    await authStorage.removeToken();
    set({ token: null, estaAutenticado: false, erro: null });
  }
}));

export default useAuthStore;

import { create } from 'zustand';

import api from '../Api';

import { authStorage } from '../ArmazenamentoToken/AuthStorage';


const useAuthStore = create((set) => ({
    token: null,
    estaAutenticado: false,


    fazRegistro: async (nome_usuario, email_usuario, senha_usuario) => {
        if (!nome_usuario || !email_usuario || !senha_usuario) {
            return res.status(400).json({
                Mensagem: "Email e senha são necessários"
            })
        }

        try {
            const response = await api.post(`/usuarios`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify ({
                        nome_usuario,
                        email_usuario,
                        senha_usuario,
                    })
                }

            );

            await get().fazLogin(email_usuario, senha_usuario);

                        
            

        } catch (err) {
            console.warn('Erro ao registrar:', err);
        }
    },




    fazLogin: async (email_usuario, senha_usuario) => {
        if (!email_usuario || !senha_usuario) {
            return;
        }

        try {
            const response = await api.post(`/auth/usuarios`,
                {
                    email_usuario,
                    senha_usuario
                }

            );


            const tokenRecebido = response.data.token;

            if(tokenRecebido){
                await authStorage.saveToken(tokenRecebido);
                set({ token: tokenRecebido, estaAutenticado: true })
            }
            
            

        } catch (err) {
            console.warn('Erro ao fazer Login:', err);
        }
    },

    carregarTokenSalvo: async () => {
        const token = await authStorage.getToken();
        if(token){
            set({token, estaAutenticado: true});
        }
    },

    fazLogout: async () => {
        await authStorage.removeToken();
        set({ token: null, estaAutenticado: false })
    }



}
)
)

export default useAuthStore;

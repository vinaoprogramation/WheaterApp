import { create } from 'zustand';

import BASE_URL from '../UrlBase';

const RegistroLogin = create((set) => ({

    logado: false,
    token: null,

    fazRegistro: async (nome_usuario, email_usuario, senha_usuario) => {
        if (!nome_usuario || !email_usuario || !senha_usuario) {
            return res.status(400).json({
                Mensagem: "Email e senha são necessários"
            })
        }

        try {
            const response = await fetch(`${BASE_URL}/usuarios`,
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

            () => {
                get().login(email_usuario, senha_usuario)
            }
                        
            

        } catch (err) {
            console.warn('Erro ao registrar:', err);
        }
    },




    fazLogin: async (email_usuario, senha_usuario) => {
        if (!email_usuario || !senha_usuario) {
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/auth/usuarios`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify ({
                        email_usuario,
                        senha_usuario,
                    })
                }

            );

            const answer = await response.json();
            set({ token: answer.token});

        } catch (err) {
            console.warn('Erro ao fazer Login:', err);
        }
    },

}
)
)

export default RegistroLogin

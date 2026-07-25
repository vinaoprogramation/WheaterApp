import * as Notifications from 'expo-notifications';

import { create } from 'zustand';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const useNotification = create((set) => ({
  pedirPermissaoNotificacao: async() => {
  const { status: statusNotificacao } = await Notifications.requestPermissionsAsync();

  if (statusNotificacao !== 'granted') {
    console.log('Permissão de notificação negada.');
  }

  return true;
},

enviarNotificacaoTeste: async() => {
  const { status } = await Notifications.requestPermissionsAsync();

  if (status !== 'granted') {
    console.log('Permissão de notificação negada.');
    return;
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Mensagem do Universo',
      body: 'Notificação teste.',
      sound: 'default',
    },
    trigger: null,
  });
},

}
)
)

export default useNotification;

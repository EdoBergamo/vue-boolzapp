const { createApp } = Vue

createApp({
  data() {
    return {
      contacts: [
        {
          name: 'Michele',
          avatar: './assets/img/avatar_1.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Hai portato a spasso il cane?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Ricordati di stendere i panni',
              status: 'sent'
            },
            {
              date: '10/01/2020 16:15:22',
              message: 'Tutto fatto!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Fabio',
          avatar: './assets/img/avatar_2.jpg',
          visible: true,
          messages: [
            {
              date: '20/03/2020 16:30:00',
              message: 'Ciao come stai?',
              status: 'sent'
            },
            {
              date: '20/03/2020 16:30:55',
              message: 'Bene grazie! Stasera ci vediamo?',
              status: 'received'
            },
            {
              date: '20/03/2020 16:35:00',
              message: 'Mi piacerebbe ma devo andare a fare la spesa.',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Samuele',
          avatar: './assets/img/avatar_3.jpg',
          visible: true,
          messages: [
            {
              date: '28/03/2020 10:10:40',
              message: 'La Marianna va in campagna',
              status: 'received'
            },
            {
              date: '28/03/2020 10:20:10',
              message: 'Sicuro di non aver sbagliato chat?',
              status: 'sent'
            },
            {
              date: '28/03/2020 16:15:22',
              message: 'Ah scusa!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro B.',
          avatar: './assets/img/avatar_4.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Lo sai che ha aperto una nuova pizzeria?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Si, ma preferirei andare al cinema',
              status: 'received'
            }
          ],
        },
        {
          name: 'Alessandro L.',
          avatar: './assets/img/avatar_5.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ricordati di chiamare la nonna',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Va bene, stasera la sento',
              status: 'received'
            }
          ],
        },
        {
          name: 'Claudia',
          avatar: './assets/img/avatar_6.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao Claudia, hai novità?',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Non ancora',
              status: 'received'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'Nessuna nuova, buona nuova',
              status: 'sent'
            }
          ],
        },
        {
          name: 'Federico',
          avatar: './assets/img/avatar_7.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Fai gli auguri a Martina che è il suo compleanno!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'Grazie per avermelo ricordato, le scrivo subito!',
              status: 'received'
            }
          ],
        },
        {
          name: 'Davide',
          avatar: './assets/img/avatar_8.jpg',
          visible: true,
          messages: [
            {
              date: '10/01/2020 15:30:55',
              message: 'Ciao, andiamo a mangiare la pizza stasera?',
              status: 'received'
            },
            {
              date: '10/01/2020 15:50:00',
              message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
              status: 'sent'
            },
            {
              date: '10/01/2020 15:51:00',
              message: 'OK!!',
              status: 'received'
            }
          ],
        }
      ],
      activeContact: null,
      newMessageText: '',
      search: '',
    };
  },

  methods: {
    sendMessage() {
      if (this.newMessageText.trim() !== '') {
        const DateTime = luxon.DateTime;
        const userMessage = this.newMessageText.toLowerCase();

        const greetings = ['ciao', 'salve', 'buongiorno', 'buonasera', 'buonanotte', 'hello', 'hi', 'hey'];
        const replyGreetings = ['Ciao!', 'Buongiorno!', 'Salve!', 'Hello!', 'Hi!', 'Hey!'];

        const isGreeting = this.isMessageAGreeting(userMessage, greetings);

        const newMessage = {
          date: DateTime.now().toFormat('dd/MM/yyyy HH:mm'),
          message: this.newMessageText,
          status: 'sent',
        };

        this.activeContact.messages.push(newMessage);

        this.newMessageText = '';

        setTimeout(() => {
          if (isGreeting) {
            const randomReplyIndex = Math.floor(Math.random() * replyGreetings.length);
            const replyMessage = {
              date: DateTime.now().toFormat('dd/MM/yyyy HH:mm'),
              message: replyGreetings[randomReplyIndex],
              status: 'received',
            };
            this.activeContact.messages.push(replyMessage);
          } else {
            const defaultReply = {
              date: DateTime.now().toFormat('dd/MM/yyyy HH:mm'),
              message: 'OK',
              status: 'received',
            };
            this.activeContact.messages.push(defaultReply);
          }

          this.scrollMessageContainerToBottom();
        }, 1000);
      }
    },
    scrollMessageContainerToBottom() {
      const container = document.getElementById('message-container');
      if (container) {
        container.scrollTop = container.scrollHeight - container.clientHeight;
        setTimeout(() => {
          container.scrollTop = container.scrollHeight - container.clientHeight;
        }, 50);
      }
    },    
    isMessageAGreeting(message, greetings) {
      return greetings.some(greeting => message.includes(greeting));
    },
    setActiveContact(contact) {
      this.activeContact = contact;
    },
    toggleModal(message) {
      message.showOptions = !message.showOptions;
    },
    searchContact() {
      this.contacts.forEach(contact => {
        if (contact.name.toLowerCase().includes(this.search.toLowerCase()))
          contact.visible = true
        else
          contact.visible = false
      })
    },
    showMessageOptions(message, index) {
      this.activeContact.messages.forEach(msg => {
        msg.showOptions = false;
      });

      message.showOptions = !message.showOptions;
    },
    deleteMessage(index) {
      this.activeContact.messages.splice(index, 1);
    },
    deleteMessagePerm(index) {
      const deletedMessage = this.activeContact.messages[index];

      if (deletedMessage.status === 'sent' || deletedMessage.status === 'sent-delete') {
        this.activeContact.messages.splice(index, 1, {
          date: deletedMessage.date,
          message: 'Hai eliminato questo messaggio',
          status: 'sent-delete',
        });
      } else {
        this.activeContact.messages.splice(index, 1);
      }
    },
    showMessageInfo(message) {
      console.log(`Informazioni sul messaggio '${message.message}':\nInviato il: ${message.date}\nStato: ${message.status}`)
    },
  },
}).mount('#app');
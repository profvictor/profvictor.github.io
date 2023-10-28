let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
  // Previne o comportamento padrão do evento
  e.preventDefault();

  // Armazena o evento para que possa ser usado posteriormente
  deferredPrompt = e;

  // Exibe um botão para o usuário adicionar o aplicativo à tela inicial
  // Aqui, você pode personalizar o prompt e adicionar um botão que chame a função "addAppToHomeScreen"
  // que definiremos na próxima etapa
  // Exemplo de prompt personalizado:
  
  const customPrompt = document.createElement('div');
  customPrompt.innerHTML = `
    <p>Gostaria de adicionar este aplicativo à tela inicial?</p>
    <button id="addToHomeScreen">Adicionar</button>
    <button id="notNow">Agora não</button>
  `;
  customPrompt.querySelector('#addToHomeScreen').addEventListener('click', addAppToHomeScreen);
  customPrompt.querySelector('#notNow').addEventListener('click', () => {
    customPrompt.style.display = 'none';
  });
  document.body.appendChild(customPrompt);
  
  // Para exibir o prompt padrão, use o código abaixo:
  deferredPrompt.prompt();
});

function addAppToHomeScreen() {
  // Oculta o prompt personalizado
  customPrompt.style.display = 'none';

  // Mostra o prompt padrão para adicionar o aplicativo à tela inicial
  deferredPrompt.prompt();

  // Aguarda a resposta do usuário
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('O usuário aceitou adicionar o aplicativo à tela inicial');
    } else {
      console.log('O usuário não aceitou adicionar o aplicativo à tela inicial');
    }

    // Limpa o evento armazenado
    deferredPrompt = null;
  });
}

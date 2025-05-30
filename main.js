import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // Elementos del DOM
  const elements = {
    inputNumero: document.getElementById('numero'),
    botonAdivinar: document.getElementById('adivinar'),
    mensaje: document.getElementById('mensaje'),
    intentos: document.getElementById('intentos'),
    historial: document.getElementById('historial'),
    botonReiniciar: document.getElementById('reiniciar')
  };

  // Estado del juego
  let gameState = {
    numeroSecreto: Math.floor(Math.random() * 100) + 1,
    intentosRealizados: 0,
    numerosIntentados: []
  };

  // Funciones del juego
  function checkGuess() {
    const numeroJugador = parseInt(elements.inputNumero.value);
    
    // Validación (CORRECCIÓN: paréntesis cerrado)
    if (isNaN(numeroJugador)) {
      elements.mensaje.textContent = 'Por favor, ingresa un número válido.';
      return;
    }
    
    if (numeroJugador < 1 || numeroJugador > 100) {
      elements.mensaje.textContent = 'El número debe estar entre 1 y 100.';
      return;
    }
    
    // Lógica del juego
    gameState.intentosRealizados++;
    gameState.numerosIntentados.push(numeroJugador);
    
    updateUI(numeroJugador);
  }

  function updateUI(numeroJugador) {
    // Actualizar mensaje
    if (numeroJugador === gameState.numeroSecreto) {
      elements.mensaje.textContent = `¡Felicidades! ¡Adivinaste el número en ${gameState.intentosRealizados} intentos!`;
      elements.botonReiniciar.style.display = 'block';
      elements.botonAdivinar.disabled = true;
    } else if (numeroJugador < gameState.numeroSecreto) {
      elements.mensaje.textContent = 'El número es más alto.';
    } else {
      elements.mensaje.textContent = 'El número es más bajo.';
    }
    
    // Actualizar contador de intentos
    elements.intentos.textContent = `Intentos: ${gameState.intentosRealizados}`;
    
    // Actualizar historial
    elements.historial.innerHTML = `<p>Números intentados:</p><ul>${
      gameState.numerosIntentados.map(num => 
        `<li class="${num === gameState.numeroSecreto ? 'correct' : ''}">${num}</li>`
      ).join('')
    }</ul>`;
    
    // Limpiar input
    elements.inputNumero.value = '';
    elements.inputNumero.focus();
  }

  function resetGame() {
    gameState = {
      numeroSecreto: Math.floor(Math.random() * 100) + 1,
      intentosRealizados: 0,
      numerosIntentados: []
    };
    
    elements.mensaje.textContent = '';
    elements.intentos.textContent = '';
    elements.historial.innerHTML = '';
    elements.botonReiniciar.style.display = 'none';
    elements.botonAdivinar.disabled = false;
    elements.inputNumero.focus();
  }

  // Event listeners
  elements.botonAdivinar.addEventListener('click', checkGuess);
  elements.botonReiniciar.addEventListener('click', resetGame);
  elements.inputNumero.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') checkGuess();
  });
});
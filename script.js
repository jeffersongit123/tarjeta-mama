document.addEventListener('DOMContentLoaded', function() {
    // Gestión de pestañas
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Quitar clase activa de todos los botones y contenidos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Añadir clase activa al botón y contenido seleccionado
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Efecto para las tarjetas de memoria
    const memories = document.querySelectorAll('.memory');
    memories.forEach(memory => {
        memory.addEventListener('click', function() {
            // Crea confeti al hacer clic
            createConfetti(this);
        });
    });
    
    // Pizarra de mensajes
    const addMessageBtn = document.getElementById('addMessage');
    const newMessageInput = document.getElementById('newMessage');
    const chalkMessages = document.getElementById('chalkMessages');
    
    addMessageBtn.addEventListener('click', function() {
        addChalkMessage();
    });
    
    newMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addChalkMessage();
        }
    });
    
    function addChalkMessage() {
        const messageText = newMessageInput.value.trim();
        if (messageText) {
            const messageElement = document.createElement('div');
            messageElement.className = 'chalk-message';
            messageElement.textContent = messageText;
            messageElement.style.opacity = '0';
            
            // Posición aleatoria en la pizarra
            const randomAngle = Math.random() * 10 - 5; // -5 a 5 grados
            messageElement.style.transform = `rotate(${randomAngle}deg)`;
            
            chalkMessages.appendChild(messageElement);
            
            // Animar entrada
            setTimeout(() => {
                messageElement.style.transition = 'opacity 0.5s ease';
                messageElement.style.opacity = '0.9';
            }, 10);
            
            // Limpiar input
            newMessageInput.value = '';
            
            // Efecto de sonido de tiza (opcional)
            playChalkSound();
        }
    }
    
    // Libreta escolar
    const addMemoryBtn = document.getElementById('addMemory');
    const newMemoryInput = document.getElementById('newMemory');
    const notebook = document.querySelector('.notebook .page');
    
    addMemoryBtn.addEventListener('click', function() {
        addNotebookMemory();
    });
    
    newMemoryInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addNotebookMemory();
        }
    });
    
    function addNotebookMemory() {
        const memoryText = newMemoryInput.value.trim();
        if (memoryText) {
            // Crear fecha
            const today = new Date();
            const dateString = `${today.getDate()} ${getMonthName(today.getMonth())}`;
            
            const lineElement = document.createElement('div');
            lineElement.className = 'notebook-line';
            lineElement.innerHTML = `<span class="date">${dateString}:</span> ${memoryText}`;
            
            // Insertar antes del input
            notebook.insertBefore(lineElement, document.querySelector('.add-memory'));
            
            // Limpiar input
            newMemoryInput.value = '';
            
            // Efecto de escritura
            lineElement.style.opacity = '0';
            setTimeout(() => {
                lineElement.style.transition = 'opacity 0.5s ease';
                lineElement.style.opacity = '1';
            }, 10);
        }
    }
    
    function getMonthName(monthIndex) {
        const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 
                        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
        return months[monthIndex];
    }
    
    // Funciones para confeti
    function createConfetti(parent) {
        // Crear 30 piezas de confeti
        for (let i = 0; i < 30; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Colores aleatorios para escuela primaria
            const colors = ['#ff6b95', '#7e57c2', '#64b5f6', '#ffeb3b', '#4caf50', '#ff9800'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Tamaño aleatorio
            const size = 5 + Math.random() * 10;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Formas aleatorias
            const shapes = ['50%', '0%']; // círculo o cuadrado
            confetti.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
            
            // Posición inicial
            const rect = parent.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            
            // Añadir al body
            document.body.appendChild(confetti);
            
            // Animación
            const angle = Math.random() * Math.PI * 2;
            const velocity = 5 + Math.random() * 15;
            const tx = Math.cos(angle) * (50 + Math.random() * 200);
            const ty = Math.sin(angle) * (50 + Math.random() * 200);
            const rotate = Math.random() * 960; // 0-960deg rotation
            
            // Hacer visible con una pequeña demora
            setTimeout(() => {
                confetti.style.opacity = '1';
                confetti.style.transform = `translate(${tx}px, ${ty}px) rotate(${rotate}deg)`;
                confetti.style.transition = `transform 1s ease-out, opacity 1s ease-out`;
                
                // Desvanecer y eliminar
                setTimeout(() => {
                    confetti.style.opacity = '0';
                    setTimeout(() => {
                        if (confetti.parentNode) {
                            confetti.parentNode.removeChild(confetti);
                        }
                    }, 1000);
                }, 700);
            }, Math.random() * 300);
        }
    }
    
    // Simulación de sonido de tiza (función vacía por ahora)
    function playChalkSound() {
        // Aquí se podría implementar un sonido real si se desea
        console.log("Sonido de tiza");
    }
    
    // Decoraciones dinámicas
    createDynamicDecorations();
    
    function createDynamicDecorations() {
        const decorationContainer = document.querySelector('.decorations');
        const schoolItems = ['📏', '📐', '🖍️', '📝', '🔍', '🎯', '🧩', '🎨'];
        
        for (let i = 0; i < 8; i++) {
            const decoration = document.createElement('div');
            decoration.className = 'decoration';
            decoration.textContent = schoolItems[i % schoolItems.length];
            
            // Posición aleatoria
            const top = Math.random() * 100;
            const left = Math.random() * 100;
            decoration.style.top = `${top}%`;
            decoration.style.left = `${left}%`;
            
            // Animación aleatoria
            decoration.style.animationDuration = `${8 + Math.random() * 7}s`;
            decoration.style.animationDelay = `${Math.random() * 5}s`;
            decoration.style.fontSize = `${20 + Math.random() * 15}px`;
            
            decorationContainer.appendChild(decoration);
        }
    }
    
    // Efectos de inicio
    window.addEventListener('load', function() {
        // Mostrar mensaje de bienvenida con confeti
        setTimeout(() => {
            showWelcomeMessage();
        }, 1000);
    });
    
    function showWelcomeMessage() {
        // Crear ventana emergente
        const welcomePopup = document.createElement('div');
        welcomePopup.style.position = 'fixed';
        welcomePopup.style.top = '50%';
        welcomePopup.style.left = '50%';
        welcomePopup.style.transform = 'translate(-50%, -50%) scale(0.5)';
        welcomePopup.style.background = 'white';
        welcomePopup.style.padding = '30px';
        welcomePopup.style.borderRadius = '20px';
        welcomePopup.style.boxShadow = '0 10px 40px rgba(0,0,0,0.2)';
        welcomePopup.style.zIndex = '1000';
        welcomePopup.style.opacity = '0';
        welcomePopup.style.transition = 'all 0.5s ease';
        welcomePopup.style.textAlign = 'center';
        
        welcomePopup.innerHTML = `
            <h2 style="color: var(--primary-color); margin-bottom: 15px;">¡Feliz Día de las Madres!</h2>
            <p style="font-size: 1.2rem; margin-bottom: 20px;">Para la mejor maestra de primer año</p>
            <button id="startButton" style="background-color: var(--primary-color); color: white; border: none; padding: 12px 25px; border-radius: 30px; font-size: 1rem; cursor: pointer;">Ver Tarjeta</button>
        `;
        
        document.body.appendChild(welcomePopup);
        
        // Animar entrada
        setTimeout(() => {
            welcomePopup.style.opacity = '1';
            welcomePopup.style.transform = 'translate(-50%, -50%) scale(1)';
            
            // Confeti de bienvenida
            createPageConfetti();
        }, 100);
        
        // Botón para cerrar
        document.getElementById('startButton').addEventListener('click', function() {
            welcomePopup.style.opacity = '0';
            welcomePopup.style.transform = 'translate(-50%, -50%) scale(0.8)';
            
            setTimeout(() => {
                welcomePopup.remove();
            }, 500);
            
            // Más confeti al comenzar
            createPageConfetti();
        });
    }
    
    function createPageConfetti() {
        // Crear confeti por toda la página
        for (let i = 0; i < 100; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Colores alegres
            const colors = ['#ff6b95', '#7e57c2', '#64b5f6', '#ffeb3b', '#4caf50', '#ff9800', '#e74c3c', '#3498db'];
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            // Tamaño aleatorio
            const size = 5 + Math.random() * 10;
            confetti.style.width = `${size}px`;
            confetti.style.height = `${size}px`;
            
            // Formas aleatorias
            const shapes = ['50%', '0%']; 
            confetti.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];
            
            // Posición inicial aleatoria en la parte superior
            const x = Math.random() * window.innerWidth;
            const y = -20;
            
            confetti.style.left = `${x}px`;
            confetti.style.top = `${y}px`;
            confetti.style.opacity = '0';
            
            // Añadir al body
            document.body.appendChild(confetti);
            
            // Caída con física realista
            const speedX = Math.random() * 5 - 2.5;
            const speedY = 3 + Math.random() * 5;
            const rotation = Math.random() * 360;
            
            setTimeout(() => {
                confetti.style.opacity = '1';
                confetti.style.transform = `translate(${speedX * 50}px, ${window.innerHeight + 50}px) rotate(${rotation}deg)`;
                confetti.style.transition = `transform ${3 + Math.random() * 2}s ease-in, opacity 1s ease-in ${2 + Math.random()}s`;
                
                // Eliminar después de la animación
                setTimeout(() => {
                    if (confetti.parentNode) {
                        confetti.parentNode.removeChild(confetti);
                    }
                }, 5000);
            }, Math.random() * 500);
        }
    }
});
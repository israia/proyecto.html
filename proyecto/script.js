// Firebase (importar módulos)
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-database.js";

// Configuración del proyecto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyChIB0CY3QUO3AR-2otwJzv_2jP7mOiEZY",
  authDomain: "proyecto-83571.firebaseapp.com",
  projectId: "proyecto-83571",
  storageBucket: "proyecto-83571.appspot.com",
  messagingSenderId: "959700650847",
  appId: "1:959700650847:web:edc0fde0eaa6efbc96c4ea"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const mensajesRef = ref(db, "comentarios");

// Referencias DOM
const form = document.getElementById("message-form");
const input = document.getElementById("message-input");
const mensajes = document.getElementById("messages");

// Enviar comentario
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const texto = input.value.trim();
  if (texto) {
    push(mensajesRef, {
      mensaje: texto,
      fecha: Date.now()
    });
    input.value = "";
  }
});

// Mostrar mensajes
onChildAdded(mensajesRef, (snapshot) => {
  const data = snapshot.val();
  const div = document.createElement("div");
  div.textContent = data.mensaje;
  mensajes.appendChild(div);
});

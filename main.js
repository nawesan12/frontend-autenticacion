import './style.css'

const formularioDeRegistro = document.getElementById("form-register")
const usernameInput = document.getElementById("username-input")
const passwordInput = document.getElementById("password-input")
const avatarInput = document.getElementById("avatar-input")
const fullnameInput = document.getElementById("fullname-input")
const emailInput = document.getElementById("email-input")

const formularioDeLogin = document.getElementById("form-login")
const loginIdentifier = document.getElementById("login-identifier-input")
const loginPassword = document.getElementById("login-password-input")

async function subirDatosADB(usuario) {
  const res = await fetch("http://localhost:3000/registrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  })
  const datos = await res.json()

  return datos
}

async function iniciarSesion(identifier, password) {
  const res = await fetch("http://localhost:3000/iniciar-sesion", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ identifier, password})
  })

  const datos = await res.json()

  return datos
}

formularioDeRegistro.addEventListener("submit", async (evento) => {
  evento.preventDefault()

  const usuario = {
    username: usernameInput.value,
    password: passwordInput.value,
    avatar: avatarInput.value,
    fullname: fullnameInput.value,
    email: emailInput.value
  }

  console.log(usuario)

  console.log(JSON.stringify(usuario))

  const usuarioSubido = await subirDatosADB(usuario)

  if(usuarioSubido) {
    console.log(usuarioSubido)
  }
})

formularioDeLogin.addEventListener("submit", async (evento) => {
  evento.preventDefault()

  const usuarioEsValido = await iniciarSesion(loginIdentifier.value, loginPassword.value)

  if(usuarioEsValido.messsage) {
    alert(usuarioEsValido.messsage)
  }

  if(usuarioEsValido.username) {
    alert("Sesion iniciada!")
    localStorage.setItem("datos-de-usuario", JSON.stringify(usuarioEsValido))
  }
})
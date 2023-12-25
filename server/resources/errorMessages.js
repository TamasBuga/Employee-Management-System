


const authenticationErrorMessage = {
    userNotFound: "Nincs ilyen felhasználó!",
    incorrectInput: "Helytelen jelszó vagy felhasználónév!",
    userExists: "Ez a felhasználónév már foglalt!"
}

const resourceErrorMessage = {

}

const serverErrorMessage = {
    createError: "Szerver hiba!",
    updateError: "Szerver hiba!",
    requestError: "Szerver hiba!",
    responseError: "Szerver hiba!"
}


module.exports = {
    authenticationErrorMessage,
    resourceErrorMessage,
    serverErrorMessage
}
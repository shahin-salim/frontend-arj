import jwtDecode from "jwt-decode"

// find the user is logged in or not 
export const isUserIsAuthorized = (setUser) => {
    const token = localStorage.getItem("token")

    if (!token) return setUser(false)

    console.log("=++++++++++++++++++++++++++++++++++++++===");

    const decoded = jwtDecode(token)
    delete decoded["exp"]
    setUser(decoded)
}
import { jwtDecode } from "jwt-decode";

// Function to check if token is expired or invalid
export const isTokenValid = (token) => {
    if (!token) return false;

    try {
        const decodedToken = jwtDecode(token);
        const currentTime = Date.now() / 1000; // Convert to seconds

        // Check if the token has expired
        if (decodedToken.exp < currentTime) {
            return false;
        }

        return true;
    } catch (error) {
        // If decoding fails, token is invalid
        console.error("Invalid token:", error);
        return false;
    }
};

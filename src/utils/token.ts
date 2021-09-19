async function getAuthToken(): Promise<string> {
  try {
    const tokenFound = localStorage.getItem("auth-token");
    return tokenFound || "";
  } catch (error) {
    return "";
  }
}

async function removeAuthToken(): Promise<boolean> {
  try {
    await localStorage.removeItem("auth-token");
    return true;
  } catch (error) {
    return false;
  }
}

async function setAuthToken(token: string): Promise<boolean> {
  try {
    await localStorage.setItem("auth-token", token);
    return true;
  } catch (error) {
    return false;
  }
}

export { getAuthToken, removeAuthToken, setAuthToken };

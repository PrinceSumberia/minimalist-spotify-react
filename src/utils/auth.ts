const localStorageKey = '__spotify_auth_token__';

function getUserToken(): string | null {
  let token = null;
  try {
    token = window.localStorage.getItem(localStorageKey);
  } catch (error) {
    console.error(error);
  }
  return token;
}

function logout(): void {
  window.localStorage.removeItem(localStorageKey);
}

function register(token: string): Promise<string | void> {
  window.localStorage.setItem(localStorageKey, token);
  return new Promise((resolve, reject) => {
    if (token) {
      resolve(token);
    } else {
      reject();
    }
  });
}

export { getUserToken, register, logout };

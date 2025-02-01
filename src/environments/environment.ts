export const environment = {
  production: true,
  firebaseConfig: (JSON.parse(process.env['FIREBASE_CONFIG'] as string))
};

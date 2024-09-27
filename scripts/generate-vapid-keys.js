// eslint-disable-next-line @typescript-eslint/no-require-imports
const webpush = require('web-push');
const vapidKeys = webpush.generateVAPIDKeys()

console.log('Paste the following keys in your .env.local file:')
console.log('-------------------')
console.log('NEXT_PUBLIC_VAPID_PUBLIC_KEY=', vapidKeys.publicKey)
console.log('VAPID_PRIVATE_KEY=', vapidKeys.privateKey)
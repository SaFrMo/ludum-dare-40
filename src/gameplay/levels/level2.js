import Request from '../Request'
import store from '@/store'

const authPages = [
    'vault/money.html',
    'vault/gold.html'
]

export default {
    files: [
        'posts/my-first-post.html'
    ],
    requests: [
        { req: new Request(
            'POST',
            '/posts/my-first-post.html',
            [{
                label: 'POST-Tutorial',
                value: `GET is great, but it doesn't cover everything a user can do online. Let's learn about a new HTTP method!`,
                stagingValue: `POST does just what it sounds like - it posts new content. The new content is contained in the Request Body below.<br/><br/>Find the requested file just like you've been doing, but this time, click the "Post Data" button instead of "Add to Response." Then click "Submit" when you're done.<br/><br/>Note that you don't need to include a full file in a POST response - just a heads-up that the POST worked successfully!`,
                outputValue: ``
            }],
            'The Post Dangerous Game<br/><br/>It was a dark and stormy night...'
        )},
        { req: new Request(
            'POST',
            '/posts/second-post.html',
            [{
                label: 'POST-Tutorial',
                value: `Great! Let's try one more with a new file.`,
                stagingValue: `Remember to check the filename on the right side of the banner!`,
                outputValue: ``
            }],
            'Menu: Avocado Post with Bottomless Mimpostas'
        ),
            callback: () => {
                store.commit('ADD_FILE', 'posts/second-post.html')
            }

        },
        { req: new Request(
            'POST',
            '/posts/my-deepest-darkest-secret.html',
            [{
                label: 'POST-Tutorial',
                value: `Just like GET requests, POST requests can also ask for a page that doesn't exist.`,
                stagingValue: `You know what to do when a file's missing on the server - send back that 404!`,
                outputValue: ``
            }],
            ''
        ),
            callback: () => {
                store.commit('ADD_FILE', 'posts/second-post.html')
            }

        },
        { req: new Request(
            'POST',
            '/vault/money.html',
            [{
                label: 'AUTH-Tutorial',
                value: `Not just anyone can POST anywhere, though. Some files require special authorization.`,
                stagingValue: `The Authorization below contains two fields: first, the authorization type (in this case, Basic), then the credentials (usually a password or cookie), which come after a space.<br/><br/>If any request doesn't match the desired file's password, we'll need to return a new response: 403 Forbidden. Click on the new "403 Forbidden" button, then click Submit.`,
                outputValue: ``
            }, {
                label: 'Authorization',
                value: 'Basic password123'
            }],
            `send all money to rob-banks-the-bank-robber@criminal.io please. thank you`
        ),
            callback: () => {
                authPages.map(page => store.commit('ADD_FILE', { name: page, auth: 'Basic 5up3r5tr0ngp4ssw0rd' }))
            }

        },
        { req: new Request(
            'POST',
            '/vault/money.html',
            [{
                label: 'AUTH-Tutorial',
                value: `Great! Let's see this request's authentication.`,
                stagingValue: `Remember that the request body is a red herring when it comes to authorization! Pay attention to the password instead. If it matches the file's password, go ahead and finish the response - otherwise, send back a 403.`,
                outputValue: ``
            }, {
                label: 'Authorization',
                value: 'Basic 5up3r5tr0ngp4ssw0rd'
            }],
            `{ "transaction": "send-money", "amount": 4000, "to": "recipient@bank-customer.com" }`
        )},
        { req: new Request(
            'POST',
            '/posts/my-first-post.html',
            [{
                label: 'Tutorial',
                value: `You've got the hang of it! From here on out, you're on your own. See how many requests you can correctly respond to in one minute.`,
                stagingValue: `Good luck, have fun, and happy Ludum Dare 40!`,
                outputValue: ``
            }, {
                label: 'Authorization',
                value: 'Basic 5up3r5tr0ngp4ssw0rd'
            }],
            `{ "ludumDareIsTheBest": true }`
        )}
    ]
}

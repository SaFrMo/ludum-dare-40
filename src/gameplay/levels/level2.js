import Request from '../Request'
import store from '@/store'

export default {
    files: [
        // 'level2.html',
        'posts/my-first-post.html'
        // 'posts/more-things-to-say.html'
        // 'nnedi/who-fears-death.html',
        // 'nnedi/binti.html',
        // 'nnedi/the-book-of-phoenix.html',
        // 'nkjemisin/the-fifth-season.html',
        // 'nkjemisin/the-obelisk-gate.html',
        // 'nkjemisin/the-stone-sky.html'
    ],
    requests: [
        { req: new Request(
            'POST',
            '/posts/my-first-post.html',
            [{
                label: 'POST-Tutorial',
                value: `GET is great, but it doesn't cover everything a user can do online. Let's learn about a new HTTP method!`,
                stagingValue: `POST does just what it sounds like - it posts new content to the given address. The new content is contained in the Request Body below.<br/><br/>Find the requested file just like you've been doing, but this time, click the "Post Data" button instead of "Add to Response." Then click "Submit" when you're done.<br/><br/>Note that you don't need to include a full file in a POST response - just a heads-up that the POST worked successfully!`,
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

        }
    ]
}

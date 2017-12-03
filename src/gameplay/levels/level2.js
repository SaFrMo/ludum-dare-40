import Request from '../Request'
// import store from '@/store'
export default {
    files: [
        'level2.html',
        'posts/my-first-post.html',
        'posts/more-things-to-say.html'
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
                stagingValue: `POST does just what it sounds like - it posts new content to the given address. The new content is contained in the POST's body.<br/><br/>Find the requested file just like you've been doing, but this time, click the "Post Data" button instead of "Add to Response." Then click "Submit" when you're done.<br/><br/>Note that you don't need to include a full file in a POST response - just a heads-up that the request worked successfully!`,
                outputValue: ``
            }]
        )}
    ]
}

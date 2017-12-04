import Request from '../Request'
import allLevelOneFiles from '@/gameplay/levels/allLevelOneFiles'
import store from '@/store'

export default {
    files: ['hello-world.html', 'index.html'],
    requests: [
        { req: new Request(
            'GET',
            '/hello-world.html',
            [{
                label: 'Tutorial',
                value: `Hello, little HTTP server! I'm a "request" - a message from a computer asking you to do something. When you're ready, click me to start working on your response.`,
                stagingValue: `Take a look at the banner above this text. See the "GET" on the left side? That means I'm asking you to "GET" a file for me - in this case, "hello-world.html" (shown on the right side of the banner).<br/><br/>Find "hello-world.html" on your hard drive and click "Add to Response." Then, when you're ready, click "Submit."`,
                outputValue: ``
            }]
        )},
        { req: new Request(
            'GET',
            '/index.html',
            [{
                label: 'Tutorial',
                value: `Excellent! You'll see a green thumbs-up if your response was correct, and a red thumbs-down if not. I'm another GET request for a different file on the server. Click me to start your response.`,
                stagingValue: `I'm looking for "index.html" (check the right side of the banner for the file name!). Attach that file and click "Submit" to continue.`,
                outputValue: ``
            }]
        ) },
        { req: new Request(
            'GET',
            '/indxe.html',
            [{
                label: 'Tutorial',
                value: `Look at all those happy users! Sometimes, though, you'll have to be the bearer of bad news. Click me to start your next response.`,
                stagingValue: `My client asked for a file called "indxe.html", but that doesn't exist on your hard drive! You need to take what I ask for literally - no room for misspellings here. Click the "404" button, then Submit.`,
                outputValue: ``
            }]
        ) },
        {
            req: new Request(
                'GET',
                '/images/every-hilarious-cat.png',
                [{
                    label: 'Tutorial',
                    value: `That's where the famous "404" error comes from - a server not being able to find a requested file! Click me for one more training round.`,
                    stagingValue: `You've loaded up a few more files now that you're all warmed up, so see how quickly you can get five correct responses, starting with this one. The milliseconds are ticking by - good luck!`
                }]
            ),
            callback: () => {
                allLevelOneFiles.map(file => {
                    store.commit('ADD_FILE', file)
                })
                store.commit('START_TIMER')
            }
        }
    ]
}

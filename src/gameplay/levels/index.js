import Request from '../Request'

export default [
    [
        // {
        //     req: new Request('GET', 'http://ludum-dare-40.com/hello-world.html'),
        //     tooltip: `When a user wants some information, they'll send a REQUEST, which shows up here.`
        // },
        { req: new Request(
            'GET',
            '/hello-world.html',
            [{
                label: 'Tutorial',
                value: `Hello, little HTTP server! I'm a "request" - a message from a computer asking you to do something. When you're ready, click me to start working on your response.`,
                stagingValue: `See the "GET" in the upper left corner? That means I want you to "GET" a file for me - in this case, "hello-world.html".<br/><br/>Find that file on your hard drive and add it to the response below, then click "Submit."`
            }]
        )}
    ]
]

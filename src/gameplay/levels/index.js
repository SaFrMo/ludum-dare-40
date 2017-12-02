import Request from '../Request'

export default [
    [
        {
            req: new Request('GET', 'http://ludum-dare-40.com/hello-world.html'),
            tooltip: `When a user wants some information, they'll send a REQUEST, which shows up here.`
        }
    ]
]

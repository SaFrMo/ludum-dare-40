export default class Request {
    constructor (command, path, headers, body) {
        this.command = command || 'GET'
        this.path = path || './'
        this.headers = headers || []
        this.body = body || ''
        this.id = Date.now()
    }
}

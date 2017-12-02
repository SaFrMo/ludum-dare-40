import store from '@/store'

export default class RequestResponse {
    constructor (command, path, headers, body, code, expectedFile) {
        this.command = command || 'GET'
        this.path = path || this.generateRandomPath()
        this.headers = headers || []
        this.body = body || ''
        this.id = Date.now()
        this.files = []

        // Response data
        this.code = code || '200 OK'
        this.expectedFile = expectedFile || this.path.match(/[^/]*$/)[0]
        // this.expectedResponse = new Response(code || 200, this.expectedFile)

        // -1: not validated, 0: fail, 1: success
        this.validated = -1
    }

    validate () {
        let output = false

        // Handle GET validation
        if (this.command === 'GET') {
            // if the file exists...
            if (store.state.files.find(file => `/${file}` === this.path)) {
                // ... we should have requested files attached
                output = `/${this.files[0]}` === this.path
            } else {
                // otherwise, there should be a 404
                output = this.code.includes('404')
            }
        }

        this.validated = output ? 1 : 0
        return output
    }

    generateRandomPath () {
        // Coin flip - will we be an existing file?
        let existing = true
        if (Math.random() > 0.5) {
            existing = false
        }

        // Pick a random value from our current files
        let output = this.randomFromArray(store.state.files)
        if (!existing) {
            const chars = output.split('')
            const index1 = Math.floor(Math.random() * chars.length)
            const index2 = Math.floor(Math.random() * chars.length)
            let holder = chars[index1]
            chars[index1] = chars[index2]
            chars[index2] = holder
            output = chars.join('')
        }

        return '/' + output
    }

    randomFromArray (arr) {
        return arr[Math.floor(Math.random() * arr.length)]
    }
}

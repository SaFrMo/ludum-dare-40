import Request from '../Request'
// import store from '@/store'
export default {
    files: ['level2.html'],
    requests: [
        { req: new Request(
            'GET',
            'index.html'
        )}
    ]
}

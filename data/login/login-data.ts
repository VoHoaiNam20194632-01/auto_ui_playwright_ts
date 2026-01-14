export const invalidLogin = [
    {
        testCaseName: 'Verify email empty',
        input: {
            'Email': '',
            'Password': '12345678'
        },
        expect: {
            'Email': 'Email is required'
        }
    },
    {
        testCaseName: 'Verify password empty',
        input: {
            'Email': 'test@with.me',
            'Password': ''
        },
        expect: {
            'Password': 'Password is required'
        }
    },
    {
        testCaseName: 'Verify email and password empty',
        input: {
            'Email': '',
            'Password': ''
        },
        expect: {
            'Email': 'Email is required',
            'Password': 'Password is required'
        }
    },
]

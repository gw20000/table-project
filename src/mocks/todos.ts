import Mock from 'mockjs';


// Mock for GET /api/users
Mock.mock(RegExp('/api/todos'), 'get', {
    'todos|0-10': [{
        'id|+1': 1,
        'title': '@cword(1, 70)',
        'status|1': ['complete', 'incomplete'],

    }]
});



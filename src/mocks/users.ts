import Mock from 'mockjs';


// Mock for GET /api/users
Mock.mock(RegExp('/api/users'), 'get', {
    'users|0-10': [{
        'id|+1': 1,
        'name': '@cname',
        'gender|1': [0, 1],// 0 male , 1 female 
        'age|18-60': 1,
        'hobbies': '@cword(1, 20)'
    }]
});



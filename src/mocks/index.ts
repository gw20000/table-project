import Mock from 'mockjs';
import './users.ts';
import './todos.ts';

// Enable Mock.js interception
Mock.setup({
    timeout: '1000-2000' // Response delay
});


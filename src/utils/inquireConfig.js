export default [
    {
        type: 'input',
        name: 'name',
        message: '项目名称：',
        default: '',
        filter(val) {
            return val.trim();
        },
        validate: function(val) {
            if (val.length > 0) {
                return true;
            }
            return '请输入项目名称';
        }
    },
    {
        type: 'list',
        name: 'type',
        message: '项目模板：',
        choices: [
            {
                name: '完整的一个模板',
                value: 'frontTemplate'
            },
            {
                name: '空的工程',
                value: 'baiLi'
            }
        ]
    }
];
